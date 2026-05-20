import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/resend'

// Smoke-test endpoint. POST /api/test-email
// Manda un email fijo al dueño de la cuenta Resend (única dirección permitida
// mientras `from` sea `onboarding@resend.dev`). Borrar o proteger con auth
// antes de exponer a producción de verdad.
export async function POST() {
  try {
    const data = await sendEmail(
      'salosarfa@hotmail.com',
      'Test desde Black Cesars OS',
      '<h1>Funciona</h1><p>Email de prueba enviado desde el helper <code>sendEmail()</code>.</p>',
    )
    return NextResponse.json({ ok: true, id: data?.id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
