# CSTAR Media — Wednesday Weekly Performance Review
# Auto-runs every Wednesday at 4:35 PM CT
# Quick 5-min read before your evening call window

$date = Get-Date -Format "yyyy-MM-dd"

claude -p "You are the performance coach for CSTAR Media. Generate a Wednesday mid-week performance review checklist for a bilingual Meta ads agency (English + Spanish markets). Include: (1) OUTREACH SCORECARD - questions to self-assess: How many DMs sent Mon-Wed? How many replies? How many calls booked? Is the English or Spanish outreach performing better? (2) CAMPAIGN HEALTH CHECK - 5 metrics to review in Meta Ads Manager before Thursday (CPL vs benchmark, CTR, spend pacing, best performing creative, audience fatigue signals). (3) CLIENT PULSE - 3 questions to ask yourself about each active client. (4) TONIGHT'S PRIORITY - one specific action to take during tonight's Mon-Wed call window (5-7 PM CT). (5) QUICK WIN - one thing you can do in under 10 minutes right now to move CSTAR forward. Make it direct and no-fluff." > "C:\Users\jimmy\Cstar-media-\delivery\weekly-review-$date.txt"

Write-Host "Weekly review ready!" -ForegroundColor Green
Start-Process notepad "C:\Users\jimmy\Cstar-media-\delivery\weekly-review-$date.txt"
