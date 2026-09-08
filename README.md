# Blog Personal Minimalista & Moderno

Un blog personal rápido, sobrio y enfocado en la lectura, construido con **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, soporte para **Modo Oscuro** y gestión de contenido basada en archivos **Markdown (.md)** locales.

Incluye un formulario de feedback privado para recibir comentarios de tus lectores directamente en tu correo mediante **Resend** (o endpoint compatible).

---

## 🌟 Características Principales

- 📖 **Experiencia de lectura limpia:** Tipografía editorial optimizada para textos largos (estilo Substack o Medium).
- ⚡ **Ultra rápido y ligero:** Generación de páginas estáticas (SSG) de alto rendimiento.
- 🎨 **Diseño minimalista y moderno:** Paleta neutra sobria (zinc/slate), espaciado armónico y soporte nativo de modo claro y oscuro (`next-themes`).
- ✍️ **Sin bases de datos pesadas:** Escribe y publica tus artículos directamente creando archivos `.md` dentro de `content/posts/`.
- ⏱️ **Cálculo automático de tiempo de lectura:** Estima los minutos de lectura según la extensión del artículo.
- 🔒 **Buzón de feedback privado:** Formulario para que tus lectores te escriban sin exponer públicamente sus comentarios.
- 📱 **Mobile-first:** Experiencia fluida y accesible en smartphones, tablets y pantallas de escritorio.
- 🔗 **Botones para compartir:** Comparte fácilmente en X (Twitter), LinkedIn, WhatsApp o copia el enlace con un clic.

---

## 📁 Estructura del Proyecto

```text
web_blog_personal/
├── content/
│   └── posts/                           # Tus artículos en formato Markdown (.md)
│       ├── el-arte-del-minimalismo-digital.md
│       ├── como-construir-habitos-solidos-en-tecnologia.md
│       └── escribir-para-pensar-con-claridad.md
├── src/
│   ├── app/
│   │   ├── layout.tsx                   # Layout global (Navbar, Footer, Tema)
│   │   ├── page.tsx                     # Página de inicio (Bio + Lista de posts)
│   │   ├── globals.css                  # Tailwind CSS v4 & Typography
│   │   ├── acerca-de/
│   │   │   └── page.tsx                 # Página "Acerca de mí"
│   │   ├── feedback/
│   │   │   └── page.tsx                 # Formulario de feedback privado
│   │   ├── blog/[slug]/
│   │   │   └── page.tsx                 # Vista individual de lectura de artículos
│   │   └── api/feedback/
│   │       └── route.ts                 # Endpoint API para procesar y enviar correos
│   ├── components/
│   │   ├── Navbar.tsx                   # Barra de navegación con selector de tema
│   │   ├── Footer.tsx                   # Pie de página y enlaces sociales
│   │   ├── PostCard.tsx                 # Tarjeta de vista previa de artículo
│   │   ├── FeedbackForm.tsx             # Formulario interactivo con feedback visual
│   │   ├── ReadingProgressBar.tsx       # Barra superior de progreso de lectura
│   │   ├── ShareButtons.tsx             # Botones para compartir en redes
│   │   ├── ThemeToggle.tsx              # Botón de modo claro / oscuro
│   │   ├── ThemeProvider.tsx            # Proveedor de next-themes
│   │   └── Icons.tsx                    # Iconos vectoriales SVG limpios
│   ├── lib/
│   │   ├── posts.ts                     # Parser de Markdown, lectura y ordenamiento
│   │   └── email.ts                     # Integración con Resend para envío de emails
│   └── types/
│       └── post.ts                      # Tipos e interfaces TypeScript
├── .env.example                         # Guía de variables de entorno
├── .env.local                           # Variables locales para desarrollo
└── package.json
```

---

## 🚀 Cómo Iniciar el Proyecto Localmente

### 1. Requisitos Previos
Tener instalado Node.js (v18.17+ o superior, recomendado v20 o v22).

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre tu navegador en `http://localhost:3000`.

---

## ✍️ Cómo Publicar un Nuevo Artículo

Para publicar un nuevo artículo, simplemente crea un archivo `.md` dentro de la carpeta `content/posts/`. El nombre del archivo se convertirá en la URL (slug).

Por ejemplo: `content/posts/mi-primer-post.md`:

```markdown
---
title: "Título de tu artículo aquí"
date: "2026-09-08"
summary: "Un resumen breve de 1 o 2 oraciones para mostrar en la lista principal."
tags: ["Tecnología", "Reflexión"]
author: "Lean"
---

Aquí comienza el contenido de tu artículo. Puedes usar **negritas**, *cursivas*, enlaces, listas, citas y código:

## Subtítulo importante

> "Una cita que inspire a tus lectores."

```javascript
console.log("¡Hola mundo!");
```
```

El blog detectará automáticamente el archivo, calculará el tiempo estimado de lectura y lo ordenará por fecha en la página principal.

---

## 📧 Configuración del Formulario de Feedback (Resend)

El formulario de feedback envía los mensajes recibidos directamente a tu correo electrónico personal.

1. Regístrate gratis en [Resend](https://resend.com) (permite hasta 3.000 emails/mes gratis).
2. Obtén una **API Key** desde el panel de Resend.
3. Configura tus variables en `.env.local` (o en las variables de entorno de tu hosting como Vercel):

```env
RESEND_API_KEY=re_tu_api_key_de_resend
FEEDBACK_TO_EMAIL=tu-correo-personal@gmail.com
```

> **Modo Simulación:** Si estás probando en tu computadora y aún no colocas tu API Key, el sistema no fallará: simula el envío e imprime el contenido del mensaje directamente en la consola del servidor.

---

## 🌐 Cómo Publicar tu Blog en Internet (Vercel)

El blog está 100% optimizado para desplegarse en **Vercel** en menos de 2 minutos:

1. Sube este proyecto a tu repositorio de **GitHub**.
2. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
3. Haz clic en **"Add New Project"** y selecciona el repositorio de tu blog.
4. En la sección **Environment Variables**, agrega:
   - `RESEND_API_KEY`: Tu API Key de Resend.
   - `FEEDBACK_TO_EMAIL`: Tu correo donde recibirás los comentarios.
5. Haz clic en **Deploy**. ¡Listo! Ya tendrás tu enlace público para compartirlo en tus redes sociales.
