# CSTAR Media — Generate Ad Copy for a New Client
# Fill in the variables below, then right-click → "Run with PowerShell"

# ─── FILL THESE IN BEFORE RUNNING ───────────────────────────────
$BusinessType  = "Plumber"           # e.g. Plumber, Dentist, Gym, Auto Repair
$City          = "Dallas"            # client's city
$MainService   = "emergency plumbing repairs"
$Offer         = "free estimate"     # e.g. free quote, free consultation, 20% off
$TargetCustomer = "homeowners aged 30-60 dealing with plumbing emergencies or needing repairs"
$ClientName    = "Client Name"
# ────────────────────────────────────────────────────────────────

Write-Host "Generating ad copy for $ClientName..." -ForegroundColor Cyan

$prompt = "You are the ad copywriter for CSTAR Media. Write 5 Facebook ad variations for a local $BusinessType in $City. Main service: $MainService. Offer: $Offer. Target customer: $TargetCustomer. Use the Hook (0-3s) → Hold (3-15s) → Offer → CTA framework for each ad. Give each a different angle: (1) pain/problem, (2) social proof, (3) urgency, (4) trust/credibility, (5) identity/aspiration. Label each angle. Make them punchy, specific, and local."

$filename = "ad-copy-$ClientName-$(Get-Date -Format 'yyyy-MM-dd').txt"
claude -p $prompt > "$PSScriptRoot\..\delivery\$filename"

Write-Host "Done! Ad copy saved:" -ForegroundColor Green
Write-Host "  Cstar-media-\delivery\$filename" -ForegroundColor Yellow
Start-Process notepad "$PSScriptRoot\..\delivery\$filename"
