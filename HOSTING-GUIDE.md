# 🚀 Vivek Portfolio — Hosting & Domain Guide
# Netlify (hosting) + Namecheap (domain) setup

═══════════════════════════════════════════════════════
## STEP 1 — Add your files before deploying
═══════════════════════════════════════════════════════

Folder structure:
  portfolio/
    ├── index.html
    ├── css/style.css
    ├── js/script.js
    └── assets/
        ├── resume.pdf     ← PUT YOUR RESUME HERE (required)
        ├── photo.jpg      ← YOUR PHOTO (optional)
        └── ...

Before you deploy:
  1. Copy resume.pdf into assets/
  2. Optionally add photo.jpg (then uncomment the <img> line in index.html About section)
  3. Edit social links in index.html (search for "✦ EDIT")
  4. Set up EmailJS (see STEP 4 below)

═══════════════════════════════════════════════════════
## STEP 2 — Deploy to Netlify (FREE, takes 60 seconds)
═══════════════════════════════════════════════════════

### Option A — Drag and Drop (no account needed to start):
  1. Open: https://app.netlify.com/drop
  2. Drag your entire "portfolio" folder into the browser
  3. Done! You get a live URL like: random-name.netlify.app

### Option B — GitHub + Netlify (auto-deploys on every update):
  1. Create free account at https://github.com
  2. Create new repository: "portfolio"
  3. Upload all your portfolio files
  4. Go to https://netlify.com → "Add new site" → "Import from Git"
  5. Connect GitHub, select your repo
  6. Build settings: leave blank (it's a static site)
  7. Click "Deploy site"
  ✓ Every time you push to GitHub, Netlify rebuilds automatically

### Get a nice Netlify subdomain (free):
  1. In Netlify: Site Settings → General → Site name
  2. Change to: vivekpatidar → gives you vivekpatidar.netlify.app

═══════════════════════════════════════════════════════
## STEP 3 — Connect your Namecheap domain to Netlify
═══════════════════════════════════════════════════════

You bought a domain on Namecheap (e.g. vivekpatidar.com or vivekpatidar.dev).
Here is the exact process to connect it:

### In Netlify:
  1. Go to your site → "Domain management"
  2. Click "Add a domain"
  3. Type your domain: vivekpatidar.com (no www, just the domain)
  4. Click "Verify" → "Yes, add domain"
  5. Netlify shows you its nameservers — they look like:
       dns1.p03.nsone.net
       dns2.p03.nsone.net
       dns3.p03.nsone.net
       dns4.p03.nsone.net
  6. Copy all 4 nameserver addresses

### In Namecheap:
  1. Log in at namecheap.com
  2. Dashboard → "Domain List" → click "Manage" next to your domain
  3. In the "Nameservers" section, select "Custom DNS" from the dropdown
  4. Paste Netlify's 4 nameservers one by one
  5. Click the green ✓ checkmark to save
  
  ⏱ DNS propagation takes 5 minutes to 48 hours (usually under 1 hour)
  
  6. Back in Netlify → check "Domain management" — it will show "Awaiting..."
     then "DNS verified" once propagation completes

### Enable HTTPS (free, automatic):
  Once DNS is verified in Netlify:
  1. "Domain management" → scroll to "HTTPS"
  2. Click "Verify DNS configuration"
  3. Click "Provision certificate"
  ✓ Your site is now live at https://vivekpatidar.com with SSL!

═══════════════════════════════════════════════════════
## STEP 4 — Set up EmailJS (contact form, free)
═══════════════════════════════════════════════════════

  1. Go to https://www.emailjs.com — create free account
  2. "Email Services" → "Add New Service" → Gmail
     Connect your Gmail account → click "Create Service"
     Copy the Service ID (looks like: service_abc1234)

  3. "Email Templates" → "Create New Template"
     Set up the template like this:
     
     To Email:   patidarvivek333@gmail.com
     Subject:    New message: {{subject}} from {{from_name}}
     Body:
       Name: {{from_name}}
       Email: {{from_email}}
       Phone: {{phone}}
       Subject: {{subject}}
       
       Message:
       {{message}}
     
     Save → copy Template ID (looks like: template_xyz7890)

  4. "Account" → "API Keys" → copy your Public Key

  5. Open js/script.js → top of file, paste your 3 values:
     const EJS_KEY = "your_public_key_here";
     const EJS_SVC = "your_service_id_here";
     const EJS_TPL = "your_template_id_here";
  
  6. Save and re-upload/push to GitHub

═══════════════════════════════════════════════════════
## STEP 5 — Update your site later
═══════════════════════════════════════════════════════

### Add a project:
  Open js/script.js → find PROJECTS array → copy the comment block, fill in details

### Add experience:
  Open index.html → find the Experience section comment → copy the example block, fill in

### Add your photo:
  1. Save photo as assets/photo.jpg
  2. In index.html, find this comment in About section:
       <!-- ✦ ADD YOUR PHOTO: uncomment... -->
  3. Uncomment the <img> line, delete the <div class="av-ph"> block below it

### If using GitHub + Netlify auto-deploy:
  1. Edit file → save → git add . → git commit -m "update" → git push
  2. Netlify automatically rebuilds in ~30 seconds

### If using Netlify drag & drop:
  1. Edit files locally → drag the whole folder again to netlify.com/drop
  2. Netlify asks if you want to update the existing site → confirm

═══════════════════════════════════════════════════════
## PERFORMANCE NOTES
═══════════════════════════════════════════════════════

This version is optimised for speed:
  ✓ No custom scroll engine (native browser scroll)
  ✓ No cursor RAF loop
  ✓ No heavy canvas animations
  ✓ Fonts: 3 weights only (vs 10+ in previous version)
  ✓ Font Awesome loaded non-blocking (won't delay page render)
  ✓ EmailJS deferred (never blocks page load)
  ✓ Animations: CSS-only where needed, respects prefers-reduced-motion
  ✓ Images: lazy-loaded with loading="lazy"
  ✓ Scroll events: throttled with rAF

Expected Lighthouse scores after deployment:
  Performance:    90-100
  Accessibility:  95+
  Best Practices: 100
  SEO:            90+
