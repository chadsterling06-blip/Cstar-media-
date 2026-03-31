# CSTAR Media — Daily Spanish Facebook/Instagram Post
# Auto-runs Mon-Fri at 6:18 AM CT
# Post this on your Facebook/Instagram page to attract Spanish-speaking business owners

claude -p "Eres el redactor de contenido de CSTAR Media. Escribe 1 publicacion para Facebook o Instagram en ESPANOL NATIVO dirigida a duenos de negocios locales hispanos en los Estados Unidos. Elige un angulo al azar: (1) un error comun que cometen los negocios con la publicidad en redes sociales, (2) un consejo rapido para conseguir mas clientes, (3) una historia de resultado de cliente (anonimo), (4) una pregunta que invite a la reflexion sobre el crecimiento del negocio. Menos de 120 palabras. Suena autentico y cercano, como un colega que da consejos, no como un vendedor. Termina con una pregunta para generar comentarios. Maximo 3 hashtags relevantes en espanol." > "C:\Users\jimmy\Cstar-media-\outreach\todays-post-spanish.txt"

# Add English translation below for your reference
Add-Content "C:\Users\jimmy\Cstar-media-\outreach\todays-post-spanish.txt" "`n`n--- ENGLISH TRANSLATION (for your reference) ---"
claude -p "Translate only the Spanish social media post above to English so the user understands what it says. Keep it natural." >> "C:\Users\jimmy\Cstar-media-\outreach\todays-post-spanish.txt"

Start-Process notepad "C:\Users\jimmy\Cstar-media-\outreach\todays-post-spanish.txt"
