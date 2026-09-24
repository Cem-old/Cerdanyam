# Cerdanyam — reconstrucción independiente de Bolt

Esta carpeta contiene una reconstrucción editable de la app recuperada de Netlify y una copia de seguridad de los CSV originales.

## Qué conserva
- Tablas Supabase: `members`, `restaurants`, `votes`.
- Alta de miembros y restaurantes.
- Votación por restaurante/miembro con 4 notas, fecha y comentarios.
- Ranking por media de las cuatro notas.
- PWA para móvil/iPhone.
- Actualización automática mediante Supabase Realtime.

## Puesta en marcha local
1. Instalar Node.js 20+.
2. Copiar `.env.example` a `.env`.
3. Rellenar `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` con los datos públicos del proyecto Supabase.
4. Ejecutar `npm install` y después `npm run dev`.
5. Para producción: `npm run build`; Netlify publica la carpeta `dist`.

## Realtime
En Supabase > SQL Editor, ejecutar `supabase/enable_realtime.sql` una sola vez. Si Realtime ya está habilitado para esas tablas, no hace falta.

## Keep-alive gratuito
El workflow `.github/workflows/keep-supabase-awake.yml` hace una lectura de un único ID cada 6 horas. Para usarlo, subir el proyecto a GitHub y crear dos Repository secrets:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

La consulta es solo lectura; no modifica ningún registro. GitHub puede retrasar tareas cron, por lo que no es una garantía contractual de disponibilidad. Si se necesita garantía, usar un plan de Supabase que no pause proyectos.

## Seguridad
La app original identifica a la persona por alias/localStorage y no usa Supabase Auth. Esta reconstrucción mantiene esa simplicidad. Antes de abrir la app a usuarios no confiables, revisar RLS y autenticación.

## Copia original
`backup_original/` contiene los tres CSV exportados y, si está disponible, el ZIP del deploy recuperado de Netlify.
