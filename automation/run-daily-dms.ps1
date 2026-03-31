# CSTAR Media — Daily English DMs
# Auto-runs Mon-Fri at 6:15 AM CT
# Or right-click → "Run with PowerShell" anytime

claude -p "You are the outreach assistant for CSTAR Media, a Meta ads agency targeting local service businesses across the USA. Generate exactly 20 personalized cold DM messages in English. Rules: (1) Lead with their PROBLEM not our service. (2) Under 3 sentences each. (3) Never mention 'Meta ads' or 'Facebook ads' in the first message. (4) Sound human, not salesy. Mix these niches: home services (plumbers, HVAC, roofers, electricians, landscapers), health & wellness (dentists, chiropractors, gyms, med spas), automotive (auto repair, detailers, tire shops), beauty (salons, barbershops, nail salons). Include a [NICHE] and [PLATFORM: FB/IG/LinkedIn] label before each message. Number 1-20." > "C:\Users\jimmy\Cstar-media-\outreach\todays-dms.txt"

Start-Process notepad "C:\Users\jimmy\Cstar-media-\outreach\todays-dms.txt"
