# CSTAR Media — Automation Setup Script
# Run ONCE as Administrator to schedule all tasks
# After this, Claude works automatically every day

Write-Host "Setting up CSTAR Media automation (Central Time)..." -ForegroundColor Cyan
Write-Host ""

# ----- TASK 1: Daily English DMs (Mon-Fri at 6:15 AM CT) -----
$action1 = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-NonInteractive -ExecutionPolicy Bypass -File `"C:\Users\jimmy\Cstar-media-\automation\run-daily-dms.ps1`""

$trigger1 = New-ScheduledTaskTrigger -Weekly `
    -DaysOfWeek Monday,Tuesday,Wednesday,Thursday,Friday `
    -At 6:15AM

Register-ScheduledTask `
    -TaskName "CSTAR - Daily English DMs" `
    -Action $action1 `
    -Trigger $trigger1 `
    -Description "Generates 20 English cold DMs every weekday at 6:15 AM CT" `
    -RunLevel Highest `
    -Force | Out-Null

Write-Host "✓ Daily English DMs — Mon-Fri 6:15 AM CT" -ForegroundColor Green

# ----- TASK 2: Daily Spanish DMs (Mon-Fri at 6:16 AM CT) -----
$action2 = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-NonInteractive -ExecutionPolicy Bypass -File `"C:\Users\jimmy\Cstar-media-\automation\run-daily-dms-spanish.ps1`""

$trigger2 = New-ScheduledTaskTrigger -Weekly `
    -DaysOfWeek Monday,Tuesday,Wednesday,Thursday,Friday `
    -At 6:16AM

Register-ScheduledTask `
    -TaskName "CSTAR - Daily Spanish DMs" `
    -Action $action2 `
    -Trigger $trigger2 `
    -Description "Generates 10 Spanish cold DMs every weekday at 6:16 AM CT" `
    -RunLevel Highest `
    -Force | Out-Null

Write-Host "✓ Daily Spanish DMs — Mon-Fri 6:16 AM CT" -ForegroundColor Green

# ----- TASK 3: Daily LinkedIn Post in English (Mon-Fri at 6:17 AM CT) -----
$action3 = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-NonInteractive -ExecutionPolicy Bypass -File `"C:\Users\jimmy\Cstar-media-\automation\run-daily-post.ps1`""

$trigger3 = New-ScheduledTaskTrigger -Weekly `
    -DaysOfWeek Monday,Tuesday,Wednesday,Thursday,Friday `
    -At 6:17AM

Register-ScheduledTask `
    -TaskName "CSTAR - Daily English Post" `
    -Action $action3 `
    -Trigger $trigger3 `
    -Description "Generates 1 LinkedIn post in English every weekday at 6:17 AM CT" `
    -RunLevel Highest `
    -Force | Out-Null

Write-Host "✓ Daily English Post — Mon-Fri 6:17 AM CT" -ForegroundColor Green

# ----- TASK 4: Daily Spanish Social Post (Mon-Fri at 6:18 AM CT) -----
$action4 = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-NonInteractive -ExecutionPolicy Bypass -File `"C:\Users\jimmy\Cstar-media-\automation\run-daily-post-spanish.ps1`""

$trigger4 = New-ScheduledTaskTrigger -Weekly `
    -DaysOfWeek Monday,Tuesday,Wednesday,Thursday,Friday `
    -At 6:18AM

Register-ScheduledTask `
    -TaskName "CSTAR - Daily Spanish Post" `
    -Action $action4 `
    -Trigger $trigger4 `
    -Description "Generates 1 Facebook/Instagram post in Spanish every weekday at 6:18 AM CT" `
    -RunLevel Highest `
    -Force | Out-Null

Write-Host "✓ Daily Spanish Post — Mon-Fri 6:18 AM CT" -ForegroundColor Green

# ----- TASK 5: Mon-Wed Evening Prospect Research (4:30 PM CT) -----
$action5 = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-NonInteractive -ExecutionPolicy Bypass -File `"C:\Users\jimmy\Cstar-media-\automation\run-evening-prospects.ps1`""

$trigger5 = New-ScheduledTaskTrigger -Weekly `
    -DaysOfWeek Monday,Tuesday,Wednesday `
    -At 4:30PM

Register-ScheduledTask `
    -TaskName "CSTAR - Evening Prospect Research" `
    -Action $action5 `
    -Trigger $trigger5 `
    -Description "Generates prospect research and reply suggestions Mon-Wed at 4:30 PM CT" `
    -RunLevel Highest `
    -Force | Out-Null

Write-Host "✓ Evening Prospect Research — Mon-Wed 4:30 PM CT" -ForegroundColor Green

# ----- TASK 6: Wednesday Weekly Performance Review (4:30 PM CT) -----
$action6 = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-NonInteractive -ExecutionPolicy Bypass -File `"C:\Users\jimmy\Cstar-media-\automation\run-weekly-review.ps1`""

$trigger6 = New-ScheduledTaskTrigger -Weekly `
    -DaysOfWeek Wednesday `
    -At 4:35PM

Register-ScheduledTask `
    -TaskName "CSTAR - Weekly Performance Review" `
    -Action $action6 `
    -Trigger $trigger6 `
    -Description "Generates weekly performance review every Wednesday at 4:35 PM CT" `
    -RunLevel Highest `
    -Force | Out-Null

Write-Host "✓ Weekly Performance Review — Wednesday 4:35 PM CT" -ForegroundColor Green

# ----- TASK 7: Sunday Morning Weekly Plan (7:00 AM CT) -----
$action7 = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-NonInteractive -ExecutionPolicy Bypass -File `"C:\Users\jimmy\Cstar-media-\automation\run-weekly-plan.ps1`""

$trigger7 = New-ScheduledTaskTrigger -Weekly `
    -DaysOfWeek Sunday `
    -At 7:00AM

Register-ScheduledTask `
    -TaskName "CSTAR - Sunday Weekly Plan" `
    -Action $action7 `
    -Trigger $trigger7 `
    -Description "Generates weekly prospect list and content plan every Sunday at 7 AM CT" `
    -RunLevel Highest `
    -Force | Out-Null

Write-Host "✓ Sunday Weekly Plan — 7:00 AM CT" -ForegroundColor Green

Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  All 7 tasks scheduled successfully!" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "YOUR DAILY ROUTINE:" -ForegroundColor Yellow
Write-Host "  6:15 AM  — Open outreach/todays-dms.txt (English DMs)"
Write-Host "  6:16 AM  — Open outreach/todays-dms-spanish.txt (Spanish DMs)"
Write-Host "  6:17 AM  — Open outreach/todays-post.txt (LinkedIn post)"
Write-Host "  6:18 AM  — Open outreach/todays-post-spanish.txt (Spanish post)"
Write-Host "           → Send DMs + post content = 20 min total"
Write-Host ""
Write-Host "  4:30 PM  — Open outreach/evening-prospects.txt (Mon-Wed only)"
Write-Host "           → Reply to DMs, book discovery calls = 10 min"
Write-Host ""
Write-Host "WEEKLY:"
Write-Host "  Wednesday 4:35 PM — Review weekly-review.txt"
Write-Host "  Sunday    7:00 AM — Review weekly-plan.txt"
Write-Host ""
Write-Host "Discovery calls: Mon-Wed evenings 5-7 PM CT" -ForegroundColor Green
Write-Host "Night job days (no CSTAR needed): Thu, Fri, Sat, Sun evenings" -ForegroundColor Gray
