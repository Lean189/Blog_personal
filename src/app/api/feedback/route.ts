import { NextRequest, NextResponse } from "next/server";
import { sendFeedbackEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validación del campo obligatorio 'message'
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "El mensaje es obligatorio y no puede estar vacío." },
        { status: 400 }
      );
    }

    // Validación simple de formato de email si fue suministrado
    if (email && typeof email === "string" && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json(
          { error: "El correo electrónico ingresado no tiene un formato válido." },
          { status: 400 }
        );
      }
    }

    // Limitar longitud para evitar abusos
    if (message.length > 5000) {
      return NextResponse.json(
        { error: "El mensaje supera el límite de 5000 caracteres." },
        { status: 400 }
      );
    }

    const result = await sendFeedbackEmail({
      name: typeof name === "string" ? name.trim() : undefined,
      email: typeof email === "string" ? email.trim() : undefined,
      message: message.trim(),
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.message || "No se pudo enviar el mensaje." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      simulated: result.simulated,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || "Ocurrió un error al procesar tu solicitud." },
      { status: 500 }
    );
  }
}
