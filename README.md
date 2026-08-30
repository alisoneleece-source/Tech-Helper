# Tech Helper

Tech Helper is a work-in-progress technology-support prototype originally built in Base44. This repository restores the exported React source into its intended project structure and publishes a recruiter-friendly demonstration through GitHub Pages.

The project is designed around plain-language, patient technology support for people who may be less comfortable with digital tools. Examples include device accessibility, troubleshooting, patient portals, online appointment systems, virtual-visit setup, DocuSign, and everyday communication tools.

**Important:** Tech Helper does not provide medical advice or clinical guidance. Its care-related content is about navigating the technology used by care providers and related services.

## Origin

- Original platform: Base44
- Framework: React + Vite + Tailwind CSS
- Data model: Base44 entities
- Restored for GitHub Pages from the original Base44 export

## Local development

```bash
npm install
VITE_BASE44_APP_ID=68d2c3d10887bbe5530210d6 VITE_BASE44_BACKEND_URL=https://techhelper-1.base44.app VITE_BASE44_APP_BASE_URL=https://techhelper-1.base44.app npm run dev
```

## Build

```bash
VITE_BASE44_APP_ID=68d2c3d10887bbe5530210d6 VITE_BASE44_BACKEND_URL=https://techhelper-1.base44.app VITE_BASE44_APP_BASE_URL=https://techhelper-1.base44.app npm run build
```
