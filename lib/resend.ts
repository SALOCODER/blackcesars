import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY

if (!RESEND_API_KEY) {
  throw new Error('Missing env var RESEND_API_KEY')
}

// Resend SDK es server-only — la API key nunca debe llegar al browser.
// Si necesitás mandar mails desde el cliente, hacelo via un API route.
export const resend = new Resend(RESEND_API_KEY)

// FIXME: cambiar cuando verifiquemos un dominio propio en Resend.
// `onboarding@resend.dev` solo puede enviar al email del dueño de la cuenta Resend
// (límite del tier gratis sin verificar dominio).
const FROM = 'Black Cesars OS <onboarding@resend.dev>'

export async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
) {
  const { data, error } = await resend.emails.send({
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
