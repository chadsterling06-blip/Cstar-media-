# How to Build a Meta Ads Agency with AI — Step by Step
## CSTAR Media Playbook

**Created by:** CSTAR Media
**Purpose:** Anyone can follow this guide to build their own Meta ads agency for local service businesses — automated with AI.

---

## WHAT YOU'RE BUILDING
A Meta (Facebook/Instagram) ads agency that:
- Serves local service businesses (plumbers, dentists, gyms, salons, auto shops)
- Charges $1,500/month per client
- Promises 10+ qualified leads within 30 days
- Runs mostly on AI automation — you work ~20 min/day once it's set up

---

## WHAT YOU NEED TO START
- A computer (Windows, Mac, or Linux)
- A GitHub account (free) — github.com
- Node.js installed — nodejs.org
- A Meta Business account (free) — business.facebook.com
- ~$0 to start (paid tools come later when you have clients)

---

## STEP 1 — Install Claude Code (Your AI Engine)

Open PowerShell or Terminal and run:
```
npm install -g @anthropic-ai/claude-code
```

If it doesn't stick after closing the terminal, add npm to your PATH:
```
[Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";C:\Users\[yourname]\AppData\Roaming\npm", "User")
```
Close and reopen terminal. Test with: `claude --version`

---

## STEP 2 — Connect GitHub to Claude

1. Go to github.com → Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Generate a new token with Contents, Issues, Pull Requests permissions
3. Run in terminal:
```
claude mcp add --transport http github https://api.githubcopilot.com/mcp/ -H "Authorization: Bearer YOUR_TOKEN"
```
4. Test: `claude mcp list` — should show "Connected"

---

## STEP 3 — Clone This Repo

```
git clone https://github.com/chadsterling06-blip/Cstar-media-
cd Cstar-media-
```

---

## STEP 4 — Learn the Folder Structure

| Folder | What's Inside |
|--------|---------------|
| `/outreach` | Cold DM templates, prospect tracker |
| `/sales` | Call script, objection handling |
| `/delivery` | Campaign checklist, ad copy, reports |
| `/operations` | SOPs for every task |
| `/automation` | Commands that run Claude automatically |
| `/guide` | This guide |

---

## STEP 5 — Set Up Your AI Tools

| Tool | Cost | What It Does | Sign Up |
|------|------|-------------|---------|
| Claude | ~$20/mo | Strategy, writing, automation | claude.ai |
| ChatGPT | Free/~$20 | Bulk content variations | chat.openai.com |
| Perplexity | Free | Research prospects | perplexity.ai |
| Canva | Free | Ad graphics | canva.com |
| HeyGen | ~$24/mo | AI video ads | heygen.com |
| ElevenLabs | Free tier | AI voiceover | elevenlabs.io |
| Apollo.io | Free tier | Find business contacts | apollo.io |
| Notion | Free | SOPs + client workspace | notion.so |
| Make.com | Free tier | Automate between tools | make.com |

**Start with the free ones. Add paid tools as you get clients.**

---

## STEP 6 — Run Your First Automation

Open terminal in the `Cstar-media-` folder and run:
```
claude -p "Generate 30 personalized cold DM messages for a Meta ads agency targeting local service businesses. Lead with a problem, not a service. Mix of home services, health & wellness, automotive, and beauty businesses. Under 3 sentences each. Numbered list." > outreach/todays-dms.txt
```

Open `outreach/todays-dms.txt` — your DMs are ready. Copy-paste and send.

---

## STEP 7 — Your Daily Routine

| Task | Time | How |
|------|------|-----|
| Run outreach generator | 1 min | Paste command in terminal |
| Review and send DMs | 15 min | Copy-paste 20–30 messages |
| Post daily content | 2 min | Copy from file, post on LinkedIn |
| Reply to any responses | 5 min | Book discovery calls |
| **Total** | **~23 min** | |

---

## STEP 8 — Get Your First Client

1. Send 20–30 DMs per day using `/outreach/cold-dm-templates.md`
2. Book a discovery call using `/sales/call-script.md`
3. Handle objections using `/sales/objection-handling.md`
4. Close at $1,500/month
5. Onboard using `/operations/sops/onboarding-sop.md`
6. Launch campaign using `/delivery/campaign-launch-checklist.md`
7. Send weekly reports using `/delivery/weekly-report-template.md`

---

## STEP 9 — Let Claude Work While You Sleep

See `/automation/daily-tasks.md` for full setup.

Short version — run this once to schedule daily automation:
```
claude -p "[task description]" > output-file.txt
```
Set up Windows Task Scheduler to run it at 8am daily. Done.

---

## PHASE ROADMAP

| Phase | Goal | Timeline |
|-------|------|----------|
| 1 — Foundation | Niche, offer, positioning | Day 1 |
| 2 — Outreach | 20–30 DMs/day, book calls | Week 1–4 |
| 3 — Sales | Close first client | Week 2–6 |
| 4 — Delivery | Run ads, get results | Month 1–2 |
| 5 — Operations | SOPs, systems, maybe a VA | Month 3–4 |
| 6 — Scale | Paid acquisition, VSL funnel | Month 5+ |

---

## QUESTIONS?
Contact CSTAR Media or open an issue in this GitHub repo.

Built with Claude Code + AI automation.
