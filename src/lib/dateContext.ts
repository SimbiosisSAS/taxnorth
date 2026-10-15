// Tells the agent what day it is and which tax year is which. Without this the model answers
// with the dates it saw in training (for example "tax year 2024, due February 28, 2025").

const TIME_ZONE = 'America/Edmonton'

export function buildDateContext(now: Date = new Date()): string {
  const longDate = new Intl.DateTimeFormat('en-CA', { dateStyle: 'long', timeZone: TIME_ZONE }).format(now)
  const year = Number(new Intl.DateTimeFormat('en-CA', { year: 'numeric', timeZone: TIME_ZONE }).format(now))
  const lastFebruaryDay = new Date(Date.UTC(year, 2, 0)).getUTCDate()
  const previous = year - 1

  return [
    `CURRENT DATE: today is ${longDate}. Use this date for every deadline and tax year you mention.`,
    `- The most recent completed tax year is ${previous}. Employers had to issue ${previous} T4 slips by February ${lastFebruaryDay}, ${year}. Most people had to file their ${previous} return by April 30, ${year} (or the next business day); self-employed people had until June 15, ${year}, but any balance owing was still due April 30.`,
    `- Tax year ${year} is still in progress. Its slips arrive by the end of February ${year + 1}, and its return is due around April 30, ${year + 1}.`,
    '- If a deadline has already passed, say that it has passed and that the person can still file late (late-filing penalties and interest may apply). Never describe a past deadline as upcoming.',
    '- Do not treat any date from your training data as today\'s date.',
  ].join('\n')
}
