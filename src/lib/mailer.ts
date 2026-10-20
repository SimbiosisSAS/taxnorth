import { Resend } from 'resend'

const client = new Resend(process.env.RESEND_API_KEY)

type SendResult = { error?: { message?: string } | null }
const sender = client.emails as unknown as { send: (payload: unknown) => Promise<SendResult> }

// Resend (v6) does NOT throw when it rejects an email: it returns { error }. This wrapper turns both
// cases into a boolean and logs the reason, so a failed email is never mistaken for a delivered one.
export async function sendMail(label: string, payload: Record<string, unknown>): Promise<boolean> {
  try {
    const { error } = await sender.send(payload)
    if (error) {
      console.error(`Email "${label}" was rejected:`, error.message || error)
      return false
    }
    return true
  } catch (err) {
    console.error(`Email "${label}" failed:`, err instanceof Error ? err.message : String(err))
    return false
  }
}
