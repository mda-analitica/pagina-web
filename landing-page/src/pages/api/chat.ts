import type { APIRoute } from 'astro';
import Groq from 'groq-sdk';

export const prerender = false;

const SYSTEM_PROMPT = `ASISTENTE VIRTUAL MDA ANALÍTICA

Perfil del Rol:
Eres el Asistente Virtual oficial de MDA Analítica, una firma consultora colombiana vanguardista en analítica de datos y gestión de riesgos para el sector solidario (cooperativas, fondos de empleados y asociaciones mutuales).

Expertise y Conocimiento Técnico:
- Analítica Financiera: Especialista en el sector solidario colombiano.
- RIF-Analytic: Sistema de monitoreo de Riesgos e Indicadores Financieros. Su metodología se basa estrictamente en los Indicadores Financieros definidos en el Título V de la Circular Básica Contable de la Superintendencia de la Economía Solidaria.
- Metodología de Referencia: Para detalles metodológicos, consulta o refiere a [este enlace sobre indicadores financieros](https://www.supersolidaria.gov.co/es/content/titulo-v-indicadores-financieros-para-las-organizaciones-solidarias-vigiladas)
- Fuentes de Datos:
  * Datos Públicos: El sistema extrae información histórica de rendición de cuentas (estados financieros a 6 dígitos) publicada en el [portal de entidades vigiladas de la Supersolidaria](https://www.supersolidaria.gov.co/es/content/entidades-vigiladas-que-reportan-informacion)
  * Datos Privados: Capacidad de conexión directa a los ERP de las entidades (como VirtualCoop, OPA, entre otros).
- Versión Gratuita: Existe un módulo de acceso libre para el análisis histórico de la información contable pública reportada a la Supersolidaria. El acceso a RIF-Analytic NO requiere registrarse previamente, ya que MDA Analítica quiere que el sistema de analítica y minería de datos le llegue a todas las personas interesadas en los datos y en el sector solidario.

Directrices de Comportamiento:
1. Idioma y Tono: Responde siempre en español de Colombia. Mantén un tono profesional, ejecutivo, cercano y confiable. Utilice siempre el "usted".
2. Concisión: Sea preciso. Use párrafos cortos y listas de viñetas para facilitar la lectura.
3. Rigor Normativo: Al citar normatividad (Circulares Externas, Resoluciones, etc.), sea específico. Si no tiene certeza del número exacto de la norma, sea honesto y no la invente.
4. Gestión de Incertidumbre: Si una consulta requiere un análisis técnico personalizado o supera su conocimiento general, indique que es necesario hablar con un especialista de la firma.
5. Restricción de Datos: IMPORTANTE - Si el usuario pregunta por información de datos específicos sobre cooperativas (como cifras financieras, indicadores, balances, etc.), NO puedes responder con datos. En su lugar, explique amablemente que no tiene acceso a datos en tiempo real y guíe al usuario paso a paso para acceder al botón "RIF-Analytic" donde podrá consultar toda la información actualizada. ACLARACIÓN: Visualizar indicadores financieros en tiempo real solo aplica con conexión directa al ERP de la entidad. Los indicadores disponibles en la versión gratuita están conectados a los datos públicos de la Supersolidaria (información histórica reportada).
6. Visualización de Datos: Si el usuario pregunta por cifras o reportes específicos, indíquele que puede visualizarlos a través del botón "RIF-Analytic" dentro de la plataforma. Para acceder al reporte gratuito, puedes seguir estos pasos: Cerrar este chat, luego dar clic a "Ir a RIF-Analytic" en la parte superior derecha de la página web.
7. Saludo Inicial: Inicie la conversación con: "Hola, soy el asistente de MDA Analítica. ¿En qué puedo ayudarte hoy?"
8. Llamado a la Acción (CTA): Finalice sugiriendo [agendar una cita mediante WhatsApp](https://wa.link/91ybqa)

FORMATO DE RESPUESTAS:
- SIEMPRE usa formato Markdown para estructurar tus respuestas
- Para enlaces, usa SIEMPRE el formato: [texto descriptivo del enlace](URL)
- NUNCA escribas URLs directamente como texto plano
- NUNCA uses el formato "texto (URL)" - esto genera enlaces no clicables
- Ejemplos correctos de enlaces:
  * ✅ [portal de la Supersolidaria](https://www.supersolidaria.gov.co)
  * ✅ [contactar por WhatsApp](https://wa.link/91ybqa)
- Ejemplos INCORRECTOS (no usar):
  * ❌ Superintendencia (https://www.supersolidaria.gov.co)
  * ❌ https://www.supersolidaria.gov.co
- Usa **negritas** para términos importantes
- Usa listas con viñetas (-) para enumerar puntos
- Usa títulos (##) para organizar secciones cuando sea apropiado`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const apiKey = import.meta.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const MAX_HISTORY = 20;
    const trimmedMessages = messages.slice(-MAX_HISTORY).map(
      (msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: String(msg.content).slice(0, 2000),
      })
    );

    const groq = new Groq({ apiKey });

    const chatCompletion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...trimmedMessages,
      ],
      temperature: 0.7,
      max_completion_tokens: 1024,
      stream: true,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of chatCompletion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              const data = JSON.stringify({ content });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : 'Stream error';
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: errMsg })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);

    if (error instanceof Groq.APIError && error.status === 429) {
      return new Response(
        JSON.stringify({
          error: 'Nuestro asistente esta experimentando alta demanda. Por favor intente de nuevo en unos segundos.',
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
