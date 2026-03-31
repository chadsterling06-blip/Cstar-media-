# CSTAR Media — Evening Prospect Research + Reply Suggestions
# Auto-runs Mon-Wed at 4:30 PM CT
# Use this to prep for discovery calls and reply to DM responses

$date = Get-Date -Format "yyyy-MM-dd"

claude -p "You are the prospect researcher for CSTAR Media, a Meta ads agency in Central Time targeting local service businesses nationwide (USA) including Spanish-speaking Hispanic-owned businesses. Generate an evening action plan with 3 sections: (1) TOP 15 PROSPECTS TO TARGET TONIGHT - list business types, which platform to find them on (Facebook Groups, Instagram, LinkedIn), and which DM template number to use (reference templates 1-12 from the playbook). Include 5 Spanish-speaking business types. (2) REPLY SCRIPTS - write 5 follow-up messages for prospects who replied but havent booked a call yet, in both English and Spanish. (3) CALL BOOKING TIPS - 3 specific tips for getting someone to book a call tonight during Mon-Wed 5-7 PM CT window." > "C:\Users\jimmy\Cstar-media-\outreach\evening-prospects-$date.txt"

Write-Host "Evening prospect research ready!" -ForegroundColor Green
Start-Process notepad "C:\Users\jimmy\Cstar-media-\outreach\evening-prospects-$date.txt"
