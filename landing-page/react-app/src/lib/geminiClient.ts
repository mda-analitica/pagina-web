import { GoogleGenAI, ApiError } from '@google/genai';

const DEFAULT_MODEL = 'gemini-3.6-flash';

export function getGeminiModel(): string {
  return process.env.GEMINI_MODEL || DEFAULT_MODEL;
}

let cachedClient: GoogleGenAI | null = null;

/** Devuelve el cliente Gemini ya instanciado, o null si falta GEMINI_API_KEY. */
export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!cachedClient) cachedClient = new GoogleGenAI({ apiKey });
  return cachedClient;
}

export { ApiError as GeminiApiError };

/** true si el error es un ApiError de rate limit (HTTP 429). */
export function isGeminiRateLimitError(error: unknown): error is InstanceType<typeof ApiError> {
  return error instanceof ApiError && error.status === 429;
}
