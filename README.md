# Cerdanyam recuperado

Aplicación original recuperada de los archivos de Netlify y adaptada a GitHub Pages en `/Cerdanyam/`. Conserva sus componentes, estilos y operaciones de Supabase. Ver [RECUPERACION.md](RECUPERACION.md) para la comparación y pruebas.

## Publicación

El workflow existente `.github/workflows/deploy-pages.yml` compila y publica al actualizar `main`. Conserva los secretos existentes `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`; no hace falta cambiarlos. La clave debe ser pública (`anon` o `publishable`), nunca una clave de administración.

El código fuente entregado no incluye credenciales. No contiene los CSV de datos, ni ejecuta migraciones o cambios en Supabase. No se debe ejecutar ningún SQL para esta recuperación.

## Trabajo local

1. Instalar Node.js 22 LTS y ejecutar `npm install`.
2. Copiar `.env.example` a `.env.local` y configurar la conexión pública del proyecto existente.
3. Ejecutar `npm run dev` y abrir la dirección indicada, bajo `/Cerdanyam/`.
4. `npm run build` genera `dist/`; `npm run preview` permite revisarlo.

La publicación genera entradas físicas para `/data/`, `/ranking/`, `/vote/` y `/votes/`, además de la portada. GitHub Pages no necesita las reglas `_redirects` de Netlify.

## Origen del código

`src/recovered.js` conserva el JavaScript compilado original, con adaptaciones pequeñas documentadas. No se dispone de los componentes JSX originales ni de sus mapas de código fuente. `src/main.jsx` lo carga junto con el CSS original. `src/supabase.js` se conserva como referencia de la reconstrucción anterior, pero no es la conexión utilizada por la aplicación recuperada.

Las notificaciones conservan la consulta periódica original cada 30 segundos. Se mantienen los nombres de tablas y campos, así como las preferencias guardadas en localStorage. No se ha añadido un modo sin conexión: los archivos originales no incluían un service worker.
