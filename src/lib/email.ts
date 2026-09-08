import { Resend } from "resend";

export interface FeedbackData {
  name?: string;
  email?: string;
  message: string;
}

export interface SendFeedbackResult {
  success: boolean;
  message: string;
  simulated?: boolean;
}

export async function sendFeedbackEmail(data: FeedbackData): Promise<SendFeedbackResult> {
  const { name, email, message } = data;
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.FEEDBACK_TO_EMAIL || "tu-correo@ejemplo.com";

  // Si no hay API key configurada todavía, simula el envío exitoso en modo desarrollo
  if (!apiKey || apiKey === "re_your_api_key_here") {
    console.log("--------------------------------------------------");
    console.log("📨 [FEEDBACK SIMULADO - Configura RESEND_API_KEY en .env.local]");
    console.log(`De: ${name || "Anónimo"} <${email || "Sin email"}>`);
    console.log(`Para: ${recipientEmail}`);
    console.log(`Mensaje:\n${message}`);
    console.log("--------------------------------------------------");

    return {
      success: true,
      simulated: true,
      message: "Mensaje recibido correctamente (simulado en desarrollo hasta configurar RESEND_API_KEY).",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const senderName = name?.trim() ? name.trim() : "Lector anónimo";

    const response = await resend.emails.send({
      from: "Blog Feedback <onboarding@resend.dev>",
      to: recipientEmail,
      replyTo: email?.trim() ? email.trim() : undefined,
      subject: `Nuevo feedback de ${senderName} en tu Blog`,
      text: `Has recibido un nuevo mensaje desde el formulario de tu blog personal:\n\nRemitente: ${senderName}\nEmail: ${email || "No especificado"}\n\nMensaje:\n${message}\n\n---\nEnviado desde tu blog personal`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; background-color: #ffffff; border-radius: 8px; border: 1px solid #e4e4e7;">
          <h2 style="margin-top: 0; font-size: 20px; color: #09090b; border-bottom: 1px solid #f4f4f5; padding-bottom: 12px;">Nuevo feedback desde tu Blog</h2>
          <div style="margin: 16px 0; padding: 16px; background-color: #f4f4f5; border-radius: 6px; font-size: 14px;">
            <p style="margin: 4px 0;"><strong>Nombre:</strong> ${senderName}</p>
            <p style="margin: 4px 0;"><strong>Email:</strong> ${email?.trim() ? `<a href="mailto:${email}">${email}</a>` : "No especificado"}</p>
          </div>
          <div style="margin-top: 20px;">
            <h3 style="font-size: 15px; color: #27272a; margin-bottom: 8px;">Mensaje:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6; color: #3f3f46; font-size: 15px; background: #fafafa; padding: 16px; border-radius: 6px; border-left: 3px solid #18181b;">${escapeHtml(message)}</p>
          </div>
          <footer style="margin-top: 32px; font-size: 12px; color: #a1a1aa; border-top: 1px solid #f4f4f5; padding-top: 12px;">
            Enviado de forma privada desde el formulario de feedback de tu blog.
          </footer>
        </div>
      `,
    });

    if (response.error) {
      console.error("Error de Resend al enviar email:", response.error);
      return {
        success: false,
        message: response.error.message || "Error al enviar el correo.",
      };
    }

    return {
      success: true,
      message: "¡Mensaje enviado con éxito! Llegó directo a mi bandeja.",
    };
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Excepción al enviar feedback:", err);
    return {
      success: false,
      message: err.message || "Ocurrió un error inesperado al enviar el mensaje.",
    };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
