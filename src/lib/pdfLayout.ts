// Reads CRA-style slips (T4, T4A, T5...) by POSITION on the page instead of by text order.
// In a flattened PDF the text layer lists labels first and values later, so the order says nothing about
// which value belongs to which box. The coordinates do: each value sits to the right of its box number.

export type TextItem = { str: string; x: number; y: number; w: number }

const BOX_RE = /^(?:\d{2,3}|\d{2}[A-Z])$/
const PROVINCE_RE = /^(?:AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT)$/
const AMOUNT_RE = /^-?\$?\d+(?:,\d{3})*\.\d{2}$/
const SIN_RE = /^(?:\*{2,}\d{2,4}|\d{3}[ -]?\d{3}[ -]?\d{3})$/
const CODE_RE = /^\d$/

function isValueToken(s: string): boolean {
  return AMOUNT_RE.test(s) || PROVINCE_RE.test(s) || SIN_RE.test(s) || CODE_RE.test(s)
}

// Returns { box_14: '570.00', box_10: 'AB', ... }. Boxes left empty on the slip are NOT included.
export function pairSlipBoxes(items: TextItem[]): Record<string, string> {
  const boxes = items.filter(i => BOX_RE.test(i.str))
  const values = items.filter(i => isValueToken(i.str) && !BOX_RE.test(i.str))

  // best value per physical box (a page can hold two copies of the same slip)
  const perBox = new Map<TextItem, { value: string; dx: number }>()

  for (const v of values) {
    let best: TextItem | null = null
    for (const b of boxes) {
      const dx = v.x - (b.x + b.w)       // value is to the right of the box number
      const dy = v.y - b.y               // and a little below it (same cell)
      if (dx < -2 || dx > 140 || dy < -2 || dy > 14) continue
      if (!best || b.x > best.x || (b.x === best.x && Math.abs(dy) < Math.abs(v.y - best.y))) best = b
    }
    if (!best) continue
    // a single digit is a code only in box 45 (dental benefits); elsewhere it is a symbol such as a check mark
    if (CODE_RE.test(v.str) && best.str !== '45') continue
    const dx = v.x - (best.x + best.w)
    const current = perBox.get(best)
    if (!current || dx < current.dx) perBox.set(best, { value: v.str, dx })
  }

  // if the same box number appears twice (two copies on the page), keep the top-most one
  const byNumber = new Map<string, { y: number; value: string }>()
  for (const [box, { value }] of perBox) {
    const existing = byNumber.get(box.str)
    if (!existing || box.y < existing.y) byNumber.set(box.str, { y: box.y, value })
  }

  const result: Record<string, string> = {}
  const ordered = [...byNumber.entries()].sort((a, b) => parseInt(a[0], 10) - parseInt(b[0], 10) || a[0].localeCompare(b[0]))
  for (const [number, { value }] of ordered) result[`box_${number}`] = value
  return result
}

// Text in reading order: items on the same row are joined left to right.
export function toLayoutText(pages: TextItem[][], maxChars = 12000): string {
  const out: string[] = []
  pages.forEach((items, index) => {
    const sorted = [...items].sort((a, b) => a.y - b.y || a.x - b.x)
    const lines: TextItem[][] = []
    for (const item of sorted) {
      const line = lines[lines.length - 1]
      if (line && Math.abs(line[0].y - item.y) <= 3) line.push(item)
      else lines.push([item])
    }
    out.push(`--- page ${index + 1} ---`)
    for (const line of lines) out.push(line.sort((a, b) => a.x - b.x).map(i => i.str).join('  '))
  })
  return out.join('\n').slice(0, maxChars)
}

export function guessSlipType(text: string): string | null {
  const t = text.replace(/\s+/g, ' ')
  if (/Statement of Remuneration Paid/i.test(t)) return 'T4'
  if (/Statement of Pension, Retirement, Annuity/i.test(t)) return 'T4A'
  if (/Statement of Investment Income/i.test(t)) return 'T5'
  if (/Statement of Contract Payments/i.test(t)) return 'T5018'
  if (/Tuition and Enrolment Certificate/i.test(t)) return 'T2202'
  return null
}

// Anti-invention check for text documents: a value the model returns must appear in the document text.
// Numbers are compared as WHOLE tokens ("10.00" is not supported by a stray "10", and "260.00" is not
// supported by the last digits of a masked SIN), so made-up amounts are removed.
export function dropUnsupportedValues(
  fields: Record<string, unknown>,
  source: string
): { kept: Record<string, unknown>; dropped: string[] } {
  const tokens = new Set<string>()
  for (const raw of source.split(/\s+/)) {
    const token = raw.replace(/[$,]/g, '').replace(/^[^\d-]+|[^\d]+$/g, '')
    if (/^-?\d+(?:\.\d+)?$/.test(token)) tokens.add(token)
  }
  const lower = source.toLowerCase()

  const kept: Record<string, unknown> = {}
  const dropped: string[] = []
  for (const [key, raw] of Object.entries(fields)) {
    const value = String(raw ?? '').trim()
    if (!value) { dropped.push(key); continue }
    const numeric = value.replace(/[$,\s]/g, '')
    const supported = /^-?\d+(?:\.\d+)?$/.test(numeric)
      ? tokens.has(numeric)
      : lower.includes(value.toLowerCase())
    if (supported) kept[key] = raw
    else dropped.push(key)
  }
  return { kept, dropped }
}
