# Arquitectura y despliegue — Frontend (`luksoft-frontend`)

## Cómo funciona

SPA de React (Vite) con dos partes:
- **Sitio público**: Home, detalle de curso, galería, blog — todo el contenido (cursos, textos, colores, imágenes) viene de la API, no está hardcodeado.
- **Panel admin** (`/admin`): bundle separado cargado con `React.lazy`, protegido por login.

No tiene backend propio ni accede a Supabase directamente — es 100% cliente, todo pasa por `luksoft-api`.

## Cómo se conecta con el resto del sistema

```
┌────────────────────┐   HTTPS  /api/*   ┌───────────────────┐   Supabase JS   ┌───────────────┐
│  luksoft-frontend   │ ─────────────────▶│    luksoft-api     │ ───────────────▶│   Supabase     │
│  (este repo)        │◀──────────────────│  (Node/Express)    │◀─────────────────│ (PostgreSQL +  │
└────────────────────┘   JSON + cookie    └───────────────────┘                  │   Storage)     │
                                                     │                            └───────────────┘
                                                     │ Meta Cloud API / Resend
                                                     ▼
                                          WhatsApp del usuario / admin, email

                                          (luksoft-bot es un proceso aparte que
                                           también lee/escribe en el mismo Supabase
                                           y contesta WhatsApp entrante — el frontend
                                           no interactúa con él en absoluto)
```

- Toda petición sale de `src/lib/apiClient.js` hacia `VITE_API_URL + /api/...`.
- **Autenticación admin**: al hacer login, la API devuelve un JWT de dos formas al mismo tiempo — como cookie `httpOnly` y en el cuerpo de la respuesta. El frontend guarda ese token en `sessionStorage` y lo manda como `Authorization: Bearer` en cada petición (además de la cookie, vía `credentials: 'include'`). Esto es importante para el despliegue: si el frontend y la API terminan en **dominios distintos** (lo normal al separarlos en repos), la cookie `SameSite=Lax` no viaja entre dominios, pero el token en `sessionStorage` sí — por eso el login funciona igual. No hace falta tocar código para esto, ya está resuelto.
- En desarrollo, Vite hace proxy de `/api` hacia `localhost:4000` (ver `vite.config.js`) — en producción eso no existe, por eso `VITE_API_URL` es obligatorio.

## Qué hace falta para desplegar

1. **Desplegar primero `luksoft-api`** (necesitas su URL antes de terminar esto).
2. Conectar el repo en Vercel o Cloudflare Pages:
   - Build command: `pnpm build`
   - Output directory: `dist`
   - Framework preset: Vite
3. Variable de entorno en la plataforma de hosting: `VITE_API_URL=https://tu-api-desplegada.com` (sin `/api` al final, el cliente ya lo agrega).
4. **Paso que se olvida seguido**: una vez tengas la URL final del frontend (ej. `https://lucksoft.vercel.app` o tu dominio propio), volver a `luksoft-api` y agregarla a la variable `CORS_ORIGIN` (separada por coma si hay más de un origen). Si no, el navegador bloquea las peticiones por CORS y nada carga.
5. Si usas dominio propio, agrégalo también a `CORS_ORIGIN` cuando lo conectes.

## Nota encontrada de paso (no es bloqueante)

`src/lib/apiClient.js` tiene varios `console.log('[DEBUG apiClient] ...')` que imprimen el token de sesión en la consola del navegador. No es una vulnerabilidad grave (el token ya vive en `sessionStorage`, accesible igual desde devtools), pero antes de producción real conviene quitarlos — dime si quieres que los limpie.
