/**
 * Control de uso del Bot Financiero por navegador (sin backend): cuenta consultas resueltas en
 * localStorage y exige un registro simple (nombre + correo) al llegar al límite gratuito.
 */

const QUERY_COUNT_KEY = 'mda_bot_query_count';
const REGISTRATION_KEY = 'mda_bot_registration';

export const FREE_QUERY_LIMIT = 5;
export const REGISTERED_QUERY_LIMIT = 10;

export const WHATSAPP_CONTACT_URL =
  'https://api.whatsapp.com/send?phone=573012159933&text=Estoy%20interesado%20en%20generar%20anal%C3%ADtica%20a%20partir%20de%20la%20Inteligencia%20Artificial%20para%20el%20sector%20solidario';

export interface BotRegistration {
  nombre: string;
  correo: string;
  empresa: string;
}

export function getQueryCount(): number {
  if (typeof window === 'undefined') return 0;
  const raw = window.localStorage.getItem(QUERY_COUNT_KEY);
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function incrementQueryCount(): number {
  if (typeof window === 'undefined') return 0;
  const next = getQueryCount() + 1;
  window.localStorage.setItem(QUERY_COUNT_KEY, String(next));
  return next;
}

export function getRegistration(): BotRegistration | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(REGISTRATION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed.nombre === 'string' &&
      typeof parsed.correo === 'string' &&
      typeof parsed.empresa === 'string'
    ) {
      return parsed as BotRegistration;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveRegistration(registration: BotRegistration): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(REGISTRATION_KEY, JSON.stringify(registration));
}
