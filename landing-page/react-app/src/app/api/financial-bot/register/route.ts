import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const url = process.env.LOVABLE_REGISTRATIONS_URL;
    if (!url) {
      return Response.json(
        { error: 'El registro no está configurado (falta LOVABLE_REGISTRATIONS_URL).' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { nombre, correo, empresa } = body;

    if (!nombre || !correo || !empresa) {
      return Response.json(
        { error: 'Nombre, correo y empresa son obligatorios.' },
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nombre, email: correo, company: empresa }),
    });

    if (!response.ok) {
      console.error('Lovable registration error:', response.status, await response.text().catch(() => ''));
      return Response.json(
        { error: 'No se pudo completar el registro. Intenta de nuevo.' },
        { status: response.status }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Financial bot register error:', error);
    return Response.json({ error: 'No se pudo completar el registro. Intenta de nuevo.' }, { status: 500 });
  }
}
