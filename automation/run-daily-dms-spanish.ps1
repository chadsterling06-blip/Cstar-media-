# CSTAR Media — Daily Spanish DMs
# Auto-runs Mon-Fri at 6:16 AM CT
# Or right-click → "Run with PowerShell" anytime

claude -p "Eres el asistente de comunicacion de CSTAR Media, una agencia de publicidad de Meta que trabaja con negocios locales en los Estados Unidos. Genera exactamente 10 mensajes directos personalizados en ESPANOL NATIVO (no traduccion literal). Reglas: (1) Empieza con el PROBLEMA del negocio, no con nuestro servicio. (2) Menos de 3 oraciones. (3) Suena humano y natural, no como vendedor. (4) Nunca menciones 'Facebook ads' o 'Meta ads' en el primer mensaje. Nichos: paisajismo y jardineria, servicios de limpieza, reparacion de autos, salones de belleza, peluquerias, restaurantes, construccion y remodelacion. Incluye una etiqueta [NICHO] y [PLATAFORMA: FB/IG] antes de cada mensaje. Numeralos del 1 al 10." > "C:\Users\jimmy\Cstar-media-\outreach\todays-dms-spanish.txt"

# Also generate English translation for reference
claude -p "Translate the following Spanish DMs to English so the user can understand what was sent. Keep the same numbering. Label each: [SPANISH ORIGINAL] and [ENGLISH TRANSLATION]. File to translate: C:\Users\jimmy\Cstar-media-\outreach\todays-dms-spanish.txt" >> "C:\Users\jimmy\Cstar-media-\outreach\todays-dms-spanish.txt"

Start-Process notepad "C:\Users\jimmy\Cstar-media-\outreach\todays-dms-spanish.txt"
