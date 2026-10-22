// Photos have no text layer, so a single model reading cannot be verified. Two different models read the
// same photo; only the values on which both agree are kept.

export function normalizeValue(value: unknown): string | null {
  if (value === null || value === undefined) return null
  const text = String(value).trim()
  if (!text || text === '-' || text === '--') return null
  const numeric = text.replace(/[$,\s]/g, '')
  if (/^-?\d+(?:\.\d+)?$/.test(numeric)) return `n:${Number(numeric)}`
  return `s:${text.toLowerCase().replace(/\s+/g, ' ')}`
}

export type CrossCheck = {
  data: Record<string, unknown>
  agreed: number
  dropped: string[]
}

// a and b are the two parsed readings ({ document_type, tax_year, issuer_name, recipient_name, fields, ... }).
// Throws when the readings are not about the same kind of document.
export function crossCheckReadings(a: Record<string, unknown>, b: Record<string, unknown>): CrossCheck {
  const typeA = normalizeValue(a.document_type)
  const typeB = normalizeValue(b.document_type)
  if (!typeA || !typeB || typeA !== typeB) {
    throw new Error('the two readings disagree on the document type')
  }

  const fieldsOf = (r: Record<string, unknown>): Record<string, unknown> =>
    r.fields && typeof r.fields === 'object' && !Array.isArray(r.fields) ? (r.fields as Record<string, unknown>) : {}
  const fa = fieldsOf(a)
  const fb = fieldsOf(b)

  const kept: Record<string, unknown> = {}
  const dropped: string[] = []
  for (const key of new Set([...Object.keys(fa), ...Object.keys(fb)])) {
    const va = normalizeValue(fa[key])
    const vb = normalizeValue(fb[key])
    if (va === null && vb === null) continue          // blank in both: nothing to report
    if (va !== null && va === vb) kept[key] = fa[key]
    else dropped.push(key)                             // only one model saw it, or they differ
  }

  const sameYear = normalizeValue(a.tax_year) === normalizeValue(b.tax_year)
  return {
    data: {
      document_type: a.document_type,
      tax_year: sameYear ? a.tax_year ?? null : null,
      issuer_name: a.issuer_name ?? null,
      recipient_name: a.recipient_name ?? null,
      fields: kept,
    },
    agreed: Object.keys(kept).length,
    dropped,
  }
}

// Width and height of PNG, JPEG and WebP images (null when unknown, for example HEIC).
export function imageDimensions(buf: Buffer): { width: number; height: number } | null {
  try {
    if (buf.length > 24 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
    }
    if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
      let i = 2
      while (i + 9 < buf.length) {
        if (buf[i] !== 0xff) { i++; continue }
        const marker = buf[i + 1]
        if (marker === 0xff) { i++; continue }
        if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
          return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) }
        }
        if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue }
        i += 2 + buf.readUInt16BE(i + 2)
      }
      return null
    }
    if (buf.length > 30 && buf.subarray(0, 4).toString('latin1') === 'RIFF' && buf.subarray(8, 12).toString('latin1') === 'WEBP') {
      const kind = buf.subarray(12, 16).toString('latin1')
      if (kind === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff }
      if (kind === 'VP8L') {
        const b0 = buf[21], b1 = buf[22], b2 = buf[23], b3 = buf[24]
        return { width: 1 + (b0 | ((b1 & 0x3f) << 8)), height: 1 + (((b1 & 0xc0) >> 6) | (b2 << 2) | ((b3 & 0x0f) << 10)) }
      }
      if (kind === 'VP8X') return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) }
    }
  } catch {
    return null
  }
  return null
}

// A photo this small cannot be read reliably.
export function isTooSmall(dims: { width: number; height: number } | null): boolean {
  if (!dims) return false
  return Math.max(dims.width, dims.height) < 900 || Math.min(dims.width, dims.height) < 500
}
