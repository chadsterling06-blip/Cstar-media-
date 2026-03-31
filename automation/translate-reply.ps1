# CSTAR Media — Translate a Spanish Reply + Get Response
# Use anytime a Spanish-speaking prospect replies to your DM
# Fill in THEIR_MESSAGE below, then right-click → "Run with PowerShell"

# ─── PASTE THEIR MESSAGE HERE ────────────────────────────────────
$TheirMessage = "PASTE THEIR SPANISH MESSAGE HERE"
# ────────────────────────────────────────────────────────────────

claude -p "You are the bilingual assistant for CSTAR Media. A Spanish-speaking business owner sent this message: '$TheirMessage'. Do 3 things: (1) TRANSLATION - translate their message to English so I understand it. (2) INTENT ANALYSIS - in one sentence, what do they want or feel? (3) RESPONSE OPTIONS - write 2 response options in native Spanish: Option A moves toward booking a call, Option B handles any concern or objection they raised. Keep responses under 3 sentences each. Sound warm and human."

