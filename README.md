# Roam with Gowthaman

A responsive React portfolio for an Indian athlete, vlogger, and explorer. Built with React 19, TypeScript, Vite, and Lucide icons.

## Included

- Photo-led hero with custom compass branding and scrapbook details.
- Filterable adventure journal: travel, athletics and fitness, football, cycling, riding, and outings with friends.
- Accessible native story dialogs with Escape dismissal and focus restoration.
- Personal story, passion cards, and a friends photo feature.
- Responsive navigation, smooth anchor scrolling, visible keyboard focus, and reduced-motion support.
- Direct contact-form submission to `roamwithgowtham@gmail.com` through FormSubmit, with visitor CC, validation, loading, error handling, and email/copy fallbacks.
- Verified YouTube, professional Instagram, and personal Instagram links.
- Local photographs, metadata, and a custom favicon.
- Playwright desktop and mobile tests.

## Run locally

Use **Node.js 22 LTS, version 22.12 or later within the 22.x release line**, then run `npm ci` and `npm run dev`. The application is served at http://localhost:5173. The Node engine range is intentionally limited to 22.x so Vercel uses the same tested major version instead of choosing a newer default.

In this workspace, the installed system Node.js is version 18.12.1. The **Start Roam with Gowthaman** VS Code task uses a temporary Node.js 22 runtime without modifying the system installation. Start it through **Terminal → Run Task**.

For the same compatibility approach outside the task, prefix npm commands with `npx --yes --package=node@22 --package=npm@10 --`, for example `npx --yes --package=node@22 --package=npm@10 -- npm run build`.

## Available scripts

| Script            | Purpose                                |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start the development server           |
| `npm run build`   | Type-check and build production assets |
| `npm run preview` | Preview the production build           |
| `npm run lint`    | Run Oxlint                             |
| `npm test`        | Run desktop and mobile browser tests   |
| `npm run test:production` | Build and run the same browser tests against production assets |
| `npm run test:ui` | Open Playwright's test UI              |

Install the test browser once using `npx playwright install chromium`. Browser tests start a development server automatically or reuse one at http://127.0.0.1:5173.

Production tests use [playwright.production.config.ts](playwright.production.config.ts) to start a separate Vite preview server at http://127.0.0.1:4173. They do not reuse the development server or send real email. This checks the compiled application, not Vercel's CDN header handling.

## Connected social profiles

Public profiles were checked on September 16, 2026:

- YouTube: [RoamwithGowtham](https://www.youtube.com/@Roamwithgowtham)
- Professional Instagram: [@roamwithgowtham](https://www.instagram.com/roamwithgowtham/)
- Personal Instagram: [@gowtham\_\_vasu](https://www.instagram.com/gowtham__vasu/)

All displayed photos now come from these profiles: Instagram posts and original YouTube thumbnails are downloaded locally so expiring Instagram CDN URLs do not break the site. The adventure cards link back to the actual posts/videos. Summaries are based on public titles or visible post artwork, not fabricated trip diaries or claims that the complete videos were reviewed.

Edit `profile` and `adventures` in [src/data.ts](src/data.ts) to update content. Each adventure includes a required `sourceUrl` and `sourceNote`; a `videoUrl` selects the **Watch the vlog** button, otherwise the source opens as an Instagram post. Use full HTTPS links. Keep the original post credits when replacing imagery.

## Contact delivery — one-time activation required

The **Send message** button posts the visitor's name, email, and message directly to `https://formsubmit.co/ajax/roamwithgowtham@gmail.com`. FormSubmit relays the submission to that Gmail inbox and requests a copy to the visitor using its documented `_cc` field. `_replyto` remains the visitor's address so replies go back to them. When the visitor enters the recipient's exact address (case-insensitive), duplicate CC is omitted. No Gmail password, SMTP credential, or API key is exposed in the app.

**Sender limitation:** FormSubmit sends from its own service address, **not from `roamwithgowtham@gmail.com`**. Changing `_replyto` or adding a fake `_from` field cannot authenticate Gmail. Sending both from and to this Gmail account requires a server-side Gmail API/OAuth or authenticated Gmail SMTP integration. That connection is not configured. Any future credentials must stay on the server, never in React code, a `VITE_` variable, or chat.

The email-app fallback targets the same recipient and carries the visitor's CC address. Its sender is whichever account the visitor uses in their mail application; it cannot force the portfolio owner's Gmail sender. Primary delivery and CC remain subject to activation and the provider's policies; neither inbox receipt has been verified.

**The inbox owner must activate the form before email delivery is enabled:**

1. Open the portfolio through its HTTP(S) address, preferably on the final deployment domain.
2. Submit one legitimate message with the contact form. FormSubmit will send an activation email if the form/domain has not yet been activated.
3. In **roamwithgowtham@gmail.com**, find the email from FormSubmit (check spam too) and click its confirmation/activation link. Activation for a previous recipient does not activate this new address.
4. Submit a new message after activation and verify that it arrives. FormSubmit may require verification again for a different deployment domain. This setup has not verified access to the inbox or activated it on the owner's behalf.

The UI only reports service acceptance after a successful HTTP response and an explicit `success: true` (boolean or string). Acceptance is not proof of inbox delivery; the confirmation message mentions the first-use activation requirement. Network failures, provider rejections, invalid responses, and a 15-second timeout preserve the visitor's text and offer an email-app fallback and a copy button. The submit button is disabled while a request is in flight. A hidden honeypot provides basic spam filtering; public endpoints still depend on the provider's anti-abuse protections.

The form explicitly discloses that personal information is sent to FormSubmit, the entered email is added as CC, and the sender is FormSubmit; it links the provider's privacy policy. The site does not persist messages to browser storage. A visitor email is not ownership-verified, so public CC can be abused: for higher-traffic deployment use server-side rate limits, CAPTCHA, and verified-copy opt-in with an authenticated provider.

**Automated tests intercept every FormSubmit request. They do not send test emails or activate the recipient.** The main form component is [src/ContactForm.tsx](src/ContactForm.tsx).

## Deploy to Vercel

The site is a **static Vite/React application**. No running Node server, database, serverless function, Gmail credential, or environment variable is required for the current implementation.

[vercel.json](vercel.json) supplies the deployment settings:

| Setting | Value |
| --- | --- |
| Framework preset | **Vite** |
| Root directory | The folder containing [package.json](package.json) and [vercel.json](vercel.json); leave as `.` if this project is at the repository root |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js version | **22.x**, selected by `engines.node` in [package.json](package.json) |
| Environment variables | **None required** |

### Import and deploy

1. Push this project to a GitHub, GitLab, or Bitbucket repository. Include [package-lock.json](package-lock.json), [vercel.json](vercel.json), source code, and all local social photos. Do not commit dependency folders, generated build output, or secrets.
2. In the Vercel dashboard, select **Add New → Project**, then import that repository.
3. Choose the project root described above. Vercel should recognise **Vite** and use the committed install/build/output settings. Leave the environment-variable list empty.
4. Select **Deploy**. Vercel installs the locked dependencies, type-checks/builds the site, and serves the generated assets over HTTPS. Do not use `npm run dev` or `npm run preview` as the deployment build command.
5. Open the generated deployment URL and check the photos, social links, navigation, and contact form. Add a custom domain through **Project Settings → Domains** if desired.
6. After choosing the final domain, complete FormSubmit activation for **roamwithgowtham@gmail.com** from that domain. Submit a real message after activation and verify the main recipient and visitor CC inboxes. Approval of a localhost or temporary preview form may not carry over to the final domain.

The application has not been deployed or linked to a Vercel account by this configuration change. Vercel project IDs and domain names are deliberately not hard-coded.

### Routing, caching, and local files

- Navigation uses hash anchors such as `/#about` and `/#contact`. Refreshing those URLs requests `/`, so a catch-all SPA rewrite is **not needed**. There is no `/about` pathname route. If a client-side router is added later, add the appropriate rewrites then.
- The app is served at the domain root, which matches its root-relative social-photo URLs. There is no GitHub Pages-style repository prefix on Vercel.
- Only Vite's content-hashed `/assets/` bundles receive a one-year immutable cache header. HTML and unversioned social photos retain Vercel's defaults so changes are not frozen in visitors' browser caches.
- Responses include `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin`. No restrictive policy is added that would block Google Fonts, FormSubmit, or the clipboard fallback.
- [.vercelignore](.vercelignore) excludes local build outputs, test artifacts, and environment files from CLI uploads. [.gitignore](.gitignore) excludes local Vercel account/project linkage and environment secrets from Git. Vercel builds from source; it does not need your local generated output.
- The production check is `npm run test:production`. Playwright is a development dependency and is not part of the browser bundle; Vercel's normal build does not download test browsers or run the browser suite.

### Email sender remains unchanged

Vercel hosts the portfolio; it does not turn FormSubmit into a Gmail sender. Delivery still targets **roamwithgowtham@gmail.com**, requests visitor **CC**, and uses the visitor as **Reply-To**. The actual **From** remains FormSubmit's service address. Sending from the owner's Gmail would require a separate authenticated server-side integration. Never add Gmail secrets under a `VITE_` environment variable, since those values become public in the browser bundle.

Photographs are bundled locally. Google Fonts provides fonts and FormSubmit processes contact submissions. Social links open the original platforms; videos are not auto-played or embedded. Self-host the fonts if external font requests are undesirable.

## Photography

Displayed imagery is sourced from the owner's public Instagram and YouTube posts at the user's request. Original post links and provenance are documented in [PHOTO_CREDITS.md](PHOTO_CREDITS.md). Earlier stock assets remain unused; no stock images are rendered by the portfolio.
