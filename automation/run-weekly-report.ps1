# CSTAR Media — Generate Weekly Client Report
# Fill in the variables below, then right-click → "Run with PowerShell"

# ─── FILL THESE IN BEFORE RUNNING ───────────────────────────────
$ClientName    = "Client Name Here"
$DateRange     = "Mar 31 - Apr 6"
$Spend         = "500"       # total ad spend in dollars
$Leads         = "14"        # number of leads generated
$CPL           = "35"        # cost per lead in dollars
$Clicks        = "320"       # total link clicks
$CTR           = "2.1"       # click-through rate (%)
$Impressions   = "15000"     # total impressions
$LeadQuality   = "Most leads were homeowners aged 35-55 in the target area requesting quotes within the week."
$TestRunning   = "Testing a new urgency hook on creative #2 focused on seasonal demand."
# ────────────────────────────────────────────────────────────────

Write-Host "Generating weekly report for $ClientName..." -ForegroundColor Cyan

$prompt = "You are the reporting assistant for CSTAR Media. Write a professional weekly client report email using this data. Client: $ClientName. Week: $DateRange. Spend: `$$Spend. Leads: $Leads. CPL: `$$CPL. Clicks: $Clicks. CTR: $CTR%. Impressions: $Impressions. Lead quality note: $LeadQuality. Test running this week: $TestRunning. Use this structure: subject line, greeting, results table, lead quality note, what we are testing, what client needs to do (follow up fast, log bookings), next report date. Keep it professional but friendly."

$filename = "report-$ClientName-$(Get-Date -Format 'yyyy-MM-dd').txt"
claude -p $prompt > "$PSScriptRoot\..\delivery\$filename"

Write-Host "Done! Report saved:" -ForegroundColor Green
Write-Host "  Cstar-media-\delivery\$filename" -ForegroundColor Yellow
Start-Process notepad "$PSScriptRoot\..\delivery\$filename"
