import { Resend } from 'resend'

// FIXME: cambiar cuando verifiquemos un dominio propio en Resend.
// `onboarding@resend.dev` solo puede enviar al email del dueño de la cuenta Resend
// (límite del tier gratis sin verificar dominio).
const FROM = 'Black Cesars OS <onboarding@resend.dev>'

let cachedClient: Resend | null = null

// Lazy getter — no validamos env vars a nivel de módulo porque romperia
// `next build` (page-data collection importa cada route module).
function getResendClient(): Resend {
  if (cachedClient) return cachedClient
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('Missing env var RESEND_API_KEY')
  }
  cachedClient = new Resend(apiKey)
  return cachedClient
}

export async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
) {
  const { data, error } = await getResendClient().emails.send({
    from: FROM,
    to,
    subject,
    html,
  })
  if (error) {
    throw new Error(`Resend send failed: ${error.message}`)
  }
  return data
}
