# CSTAR Media — Sunday Weekly Plan
# Auto-runs every Sunday at 7:00 AM CT
# Review this over coffee before your day starts

$weekStart = (Get-Date).AddDays(1).ToString("MMM dd")
$weekEnd   = (Get-Date).AddDays(7).ToString("MMM dd")

claude -p "You are the strategic planner for CSTAR Media, a bilingual (English + Spanish) Meta ads agency targeting local service businesses nationwide USA. Generate a full weekly plan for the week of $weekStart - $weekEnd. Include: (1) WEEKLY OUTREACH TARGETS - 50 specific business types to target this week split by niche and language (English vs Spanish), with the best platform to find each. (2) CONTENT THEMES - 5 LinkedIn post topics in English and 5 Facebook/Instagram post topics in Spanish for the week. (3) DISCOVERY CALL PREP - Mon-Wed 5-7 PM CT are call windows, write 3 icebreaker questions to open each call. (4) THIS WEEK'S FOCUS - one specific improvement to make this week (outreach, sales, delivery, or operations). Keep it actionable and specific." > "C:\Users\jimmy\Cstar-media-\outreach\weekly-plan-$weekStart.txt"

Write-Host "Weekly plan ready!" -ForegroundColor Green
Start-Process notepad "C:\Users\jimmy\Cstar-media-\outreach\weekly-plan-$weekStart.txt"
