/**
 * CTA-modus følger lead-sikkerhetsregelen (DESIGNPLAN §7b.1):
 * - Skjemalevering IKKE verifisert (ingen RESEND_API_KEY) → RING er primærhandling overalt,
 *   LeadCard rendres i ring-modus, responstidsløfter vises ikke.
 * - Verifisert levering → skjema-primær («Få tilbud»), responstidsløfte kan vises.
 */
export function leadEnabled(): boolean {
  return !!process.env.RESEND_API_KEY;
}
