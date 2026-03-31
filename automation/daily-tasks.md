# CSTAR Media — Automation: Let Claude Work While You're Away

---

## WHAT THIS DOES
These commands run Claude in headless mode (no screen, no interaction needed).
You set them up once. They run automatically on a schedule.

---

## COMMAND 1 — Daily Outreach Generator
Run every morning. Generates 30 personalized DMs ready to copy-paste.

```powershell
claude -p "You are the outreach assistant for CSTAR Media, a Meta ads agency for local service businesses. Generate 30 personalized cold DM messages for today. Use the templates in C:\Users\jimmy\Cstar-media-\outreach\cold-dm-templates.md as a guide. Mix across niches: home services, health & wellness, automotive, and beauty. Each message should be unique, lead with a problem not a service, and be under 3 sentences. Format as a numbered list with the niche label." --output-format text > C:\Users\jimmy\Cstar-media-\outreach\todays-dms.txt
```

**Output:** `outreach/todays-dms.txt` — open it, copy-paste and send

---

## COMMAND 2 — Daily LinkedIn/Twitter Post
Run every morning. Generates today's content post.

```powershell
claude -p "You are the content writer for CSTAR Media. Write 1 LinkedIn post for today about Meta ads for local service businesses. The post should provide a genuine tip, insight, or observation that positions CSTAR Media as an expert. Keep it under 150 words. No hashtag spam — max 3 relevant hashtags. Make it sound human, not corporate." --output-format text > C:\Users\jimmy\Cstar-media-\outreach\todays-post.txt
```

**Output:** `outreach/todays-post.txt` — copy and post to LinkedIn/Twitter

---

## COMMAND 3 — Weekly Client Report Writer
Run every Sunday night. Paste in the numbers, get a formatted report back.

```powershell
claude -p "You are the reporting assistant for CSTAR Media. Using the template at C:\Users\jimmy\Cstar-media-\delivery\weekly-report-template.md, write a professional weekly client report. Client name: [CLIENT]. Week: [DATE RANGE]. Spend: $[X]. Leads: [X]. CPL: $[X]. Clicks: [X]. CTR: [X]%. Impressions: [X]. Lead quality note: [YOUR NOTE]. Test running this week: [YOUR TEST]." --output-format text > C:\Users\jimmy\Cstar-media-\delivery\report-[client]-[date].txt
```

**Output:** Formatted report ready to copy-paste into email

---

## COMMAND 4 — Ad Copy Generator (New Client)
Run when you sign a new client. Generates 5 custom ads for their niche.

```powershell
claude -p "You are the ad copywriter for CSTAR Media. Write 5 Facebook ad variations for a new client. Business type: [TYPE]. City: [CITY]. Main service: [SERVICE]. Offer: [OFFER e.g. free quote]. Target customer: [DESCRIPTION]. Use the Hook → Hold → Offer → CTA framework. Make each one unique with a different angle (pain, social proof, urgency, trust, identity)." --output-format text > C:\Users\jimmy\Cstar-media-\delivery\ad-copy-[client].txt
```

---

## COMMAND 5 — Prospect Research
Run weekly. Gives you a fresh list of businesses to target.

```powershell
claude -p "You are the prospect researcher for CSTAR Media. Generate a list of 50 local service businesses to cold outreach this week. Mix of: home services (plumbers, HVAC, roofers, electricians), health & wellness (dentists, chiropractors, gyms, med spas), automotive (auto repair, detailing), and beauty (salons, barbershops). For each, provide: business type, what to search on Facebook/Instagram to find them, and which cold DM template number from the CSTAR Media playbook to use. Format as a table." --output-format text > C:\Users\jimmy\Cstar-media-\outreach\prospect-list-[date].txt
```

---

## HOW TO SCHEDULE THESE (Run Once, Works Forever)

### Option A — Windows Task Scheduler (built into Windows, free)
1. Open "Task Scheduler" from Start menu
2. Click "Create Basic Task"
3. Name it (e.g., "CSTAR Daily DMs")
4. Set trigger: Daily, 8:00 AM
5. Action: Start a program
6. Program: `powershell`
7. Arguments: `-Command "claude -p '[paste command here]'"`
8. Finish

### Option B — Claude Code Schedule Skill
Run this inside Claude Code:
```
/schedule daily at 8am: generate today's outreach messages for CSTAR Media using the cold DM templates
```

### Option C — Run Manually (simplest)
Open PowerShell, paste the command, press Enter. Done in 30 seconds.

---

## YOUR DAILY ROUTINE (with automation)
| Time | What Claude Does | What You Do |
|------|-----------------|-------------|
| 8:00 AM | Generates 30 DMs + 1 post | Wake up |
| 8:05 AM | Files saved to folder | Open files, review (2 min) |
| 8:10 AM | Done | Copy-paste DMs, send (15 min) |
| 8:25 AM | Done | Post content to LinkedIn (2 min) |
| **Total your time:** | | **~20 minutes** |
