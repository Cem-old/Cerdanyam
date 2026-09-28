# Comparación y recuperación — 28 de septiembre de 2026

## Material comprobado

- JavaScript original `index-bwttn339.js`, localizado en Descargas. SHA-256: `365613f76188aade66a5c64a18802c4d4f9f3b6829aab75248b2f7c66eb19142`.
- CSS original `index-x2wub345.css`, recuperado del adjunto. SHA-256: `8e272bbb1c71f9b665c22c1b86eb6313d57684149740c3e0ad4faa70e91fe25e`.
- `index.html`, `manifest.json`, `logo.png` y `_redirects.txt`, recuperados de los adjuntos.
- Reconstrucción descargada de `Cem-old/Cerdanyam`, revisión `a289c74`.
- La copia local de GitHub Desktop estaba en una revisión anterior, `44df604`, con `backup_original/` sin seguimiento. Esos archivos de respaldo no se usan ni se incluyen en la entrega.

El HTML original hace referencia a los bundles con mayúsculas (`index-BwTtn339.js` y `index-X2wub345.css`), mientras que los adjuntos tienen nombres en minúsculas. La nueva compilación genera referencias coincidentes, evitando este problema en GitHub Pages.

## Funciones recuperadas

| Área | Reconstrucción revisada | Versión recuperada del bundle |
| --- | --- | --- |
| Inicio | Tarjetas simplificadas, sin iconos | Logo, iconos, colores, tamaños y composición originales |
| Menú | Texto de 11 px, sin iconos | Texto de 12 px, iconos de 20 px, estado activo y áreas seguras originales |
| Miembros | Alias y número de votos, sin acción al pulsar | Tabla con votos, favorito, última visita y alta; al pulsar, clasificación personal por restaurante, medias de las cuatro notas y visitas; eliminación con confirmación |
| Restaurantes | Tarjetas con media general | Tabla de clasificación, cuatro medias, total de votos y medallas; alta, edición y eliminación con confirmación |
| Detalle de restaurante | Ausente | Ventana con cada votación, autor, fecha de visita, fecha de registro, notas y comentarios |
| Votar | Formulario simplificado | Selectores, cuatro valoraciones con estrellas, fecha obligatoria, comentario de hasta 500 caracteres, validación y estados de envío; tratamiento del error por voto duplicado |
| Votaciones | Listado sin filtros ni acciones | Filtros por restaurante y usuario, limpiar filtros, contador, edición de notas/fecha/comentarios y eliminación confirmada |
| Notificaciones | Sustituidas por un indicador de Realtime | Campana, contador, lista de nuevas votaciones y marcar como vistas; consulta cada 30 segundos y estado por usuario en localStorage |
| Datos locales antiguos | Ausente | Aviso y migración manual del original, únicamente si existen datos locales; no se ejecuta automáticamente |

La ventana de miembro es una **clasificación personal agrupada por restaurante**, no un listado cronológico de todos sus votos. Se mantiene así porque es el comportamiento del original. El historial completo permite filtrar por miembro.

El bundle contiene lógica de edición de miembros, pero no ofrece un botón que abra ese formulario en la tabla original. Se conserva el código sin inventar un nuevo acceso. Tampoco había autenticación real de Supabase: se mantiene la identificación por alias del original.

## Adaptaciones de publicación

- Router con base `/Cerdanyam/`; recursos de la interfaz mediante la base de Vite.
- Entradas estáticas para las cuatro páginas internas; normalización de la barra final para conservar el estado activo del menú. Se incluye `404.html` como respaldo.
- Logo original de 1024 × 1024 intacto; iconos de 192 × 192 y 512 × 512 derivados de él, declarados con dimensiones reales y propósito `any`.
- Manifest con `id`, `start_url` y `scope` en `/Cerdanyam/`. No se anuncia un icono `maskable` que no haya sido diseñado con su margen de seguridad.
- Corrección del selector del favicon de notificaciones: ya no altera `apple-touch-icon`. Sin notificaciones, el favicon utiliza el logo.
- CSS original conservado íntegro en el código fuente.
- Conexión mediante las variables de entorno que ya utiliza el workflow de GitHub. Eliminada del código recuperado la configuración pública incrustada en el bundle; el proceso de compilación rechaza claves que no sean públicas.
- No se requiere `_redirects`: era una regla exclusiva de Netlify.

No se han cambiado tablas, políticas, datos, claves, autenticación ni configuración de Supabase. El workflow de publicación y el de mantenimiento existentes se conservan. No se han ejecutado esos workflows durante las pruebas.

## Verificación realizada

Compilación de producción correcta con Vite 7.3.6 y configuración ficticia. Pruebas automatizadas en navegador Chromium/Edge, pantalla móvil de 390 × 844 y escritorio de 1280 × 900, con servidor estático que no reescribe rutas.

- Portada, carga del logo, menú de 12 px e iconos de 20 px.
- Clasificación de miembro: media esperada 4,0 para notas 5/4/3/4.
- Alta de miembro contra una API simulada.
- Historial de restaurante, cuatro notas y comentarios.
- Apertura y cancelación del formulario de edición de restaurante.
- Validación, estrellas, límite de comentario y envío de votación simulado.
- Filtros, limpieza, edición y eliminación simulada de votaciones.
- Acceso directo, respuesta HTTP 200 y recarga en las cuatro rutas internas.
- Manifest, archivos de iconos y conservación de `apple-touch-icon`.
- Notificaciones, marcado como vistas y título de la página.
- Ausencia de migración automática de datos locales y estado vacío del historial.
- Revisión visual de cuatro capturas con datos ficticios.

Resultado: **13 grupos de comprobaciones correctos, 4 escrituras simuladas, 0 conexiones externas del navegador y 0 errores JavaScript**. No se han enviado votos de prueba ni otras escrituras a Supabase. No se ha probado la instalación en un iPhone físico ni la conexión real de producción; se conservan las credenciales de despliegue existentes para esa conexión.

La recuperación reutiliza el código compilado original. No equivale a disponer del proyecto fuente de Bolt: posteriores cambios amplios serían más cómodos si se recuperan también los JSX/TSX originales.
