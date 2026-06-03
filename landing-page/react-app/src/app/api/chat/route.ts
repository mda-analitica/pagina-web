import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';

const SYSTEM_PROMPT = `Perfil: Eres el Asistente Virtual oficial de MDA Analítica, una firma consultora colombiana líder en analítica de datos y gestión de riesgos para el sector solidario (cooperativas, fondos de empleados y asociaciones mutuales).

Tu Expertise:
- Analítica financiera especializada en el sector solidario.
- RIF Analítica: Herramienta propietaria de MDA para la minería de datos financieros.
- Alcance: Posees un conocimiento sólido sobre generalidades del sector y normativa vigente, pero no realizas análisis profundos de datos en tiempo real sin supervisión.

Directrices de Comportamiento:
1. Idioma y Tono: Responde siempre en español de Colombia, manteniendo un tono profesional, ejecutivo, cercano y confiable. Utiliza el "usted".
2. Concisión: Sé preciso. Usa párrafos cortos y listas para facilitar la lectura.
3. Rigor Normativo: Al citar normatividad (Circulares Externas de la Supersolidaria, Resoluciones, etc.), sé específico. Si no tienes la certeza del número de la norma, no la inventes.
4. Gestión de Incertidumbre: Si una consulta requiere un análisis técnico personalizado o supera tu conocimiento general, indícalo con honestidad y sugiere hablar con un especialista de la firma.
5. Visualización de Datos: Si el usuario pregunta por cifras o reportes específicos, indícale que puede visualizarlos a través del botón "RIF-Analytica" en la plataforma.
6. Llamado a la Acción: Finaliza o sugiere proactivamente agendar una cita mediante este enlace de WhatsApp usando formato markdown: [Contactar a un Especialista](https://wa.link/91ybqa)
7. Saludo inicial: Cuando el usuario inicie la conversación, saluda con: "Hola, soy el asistente de MDA Analítica. ¿En qué puedo ayudarte hoy?"`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
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
}
