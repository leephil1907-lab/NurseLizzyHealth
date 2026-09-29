# Nurse Lizzy Health

Editorial health-education website built with Next.js, TypeScript, and Tailwind CSS.

## Local development

- Node.js 20.9+ (for Next.js 15)
- `npm install`
- `npm run dev`
- `npm run build`

## Before public launch

- Confirm the final website domain and set canonical/Open Graph metadata for it.
- Replace guide previews with finished PDFs, final pricing, and real Selar checkout URLs. Until then, guide pages say “Coming soon” and route enquiries to the WhatsApp support number.
- Connect the newsletter and Ask Nurse Lizzy forms to real providers before accepting submissions; the current UI explicitly says they do not send or save anything.
- Review health content and legal policies with the appropriate qualified professionals. No article is marked medically reviewed.
- Configure the private admin application and content database separately before relying on browser-independent editing.
- Replace externally hosted Unsplash photos and Google Fonts if you want fully self-hosted assets.

The production build should be run in a CI/deployment environment with sufficient memory. In this workspace, TypeScript checking passes, but the Next.js build worker was killed by the sandbox’s memory limit during compilation; do not treat that local SIGKILL as a successful production build.
