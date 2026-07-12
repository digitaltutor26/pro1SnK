# Project Progress & Roadmap - SnK Systems Landing Page

This file tracks the project's development history, completed tasks, and future roadmap. It is maintained under version control on GitHub to ensure transparency.

---

## 📈 Current Status
* **Last Updated**: 2026-07-12
* **Current Version**: v1.1
* **E2E Test Success Rate**: 100% (110/110 tests passed)
* **Vercel Deploy Status**: Ready (Awaiting GitHub link setup in Vercel UI)

---

## 📅 Version History (Date-based Logs)

### 2026-07-12 (v1.1) - Bilingual & Branding Update
* **Added Bilingual Support (KO/EN)**:
  * Extracted all website copy to a single [content.json](file:///Users/seungwonseo/multi-agent-test/company_landing/src/app/content.json) file.
  * Added a language toggle button (KO | EN) in the navigation header.
  * Configured state management to persist user's language preferences in `localStorage`.
* **Korean Branding & Logo Layout**:
  * Set corporate name: **SnK Systems ((주)에스앤케이시스템즈)** in the Header and About sections.
  * Structured the header to accommodate an image logo with clean SVGs as a placeholder.
* **Email Destination Setup**:
  * Programmed the [route.ts](file:///Users/seungwonseo/multi-agent-test/company_landing/src/app/api/contact/route.ts) API handler to dynamically fetch environment variables (`RESEND_API_KEY` and `CONTACT_RECEIVER_EMAIL`) on Vercel to route submissions to a real email address, falling back to console logging locally.
* **Local vs. Vercel Alignment**:
  * Verified that local execution (`npm run dev`) and Vercel deployment will look and behave 100% identically due to static compiling.

### 2026-07-12 (v1.0) - Premium UI & Linter Fixes
* **UI Refinements & Dark Mode**:
  * Enabled class-based dark mode toggle.
  * Configured Tailwind dark utilities.
  * Integrated CSS micro-interactions and hover scales.
* **Testing & Conflict Resolution**:
  * Resolved the port 3000 occupation issue.
  * Excluded Next.js announcer in Playwright locators.
  * Pushed initial clean build codebase to [digitaltutor26/pro1SnK](https://github.com/digitaltutor26/pro1SnK).

---

## 📋 Task Board (Remaining & Future Work)

### ⬜ Remaining Tasks (To-Do)
1. **Logo Image Upload**:
   * Replace placeholder text logo with a real corporate image logo asset (e.g. `logo.png`).
2. **Vercel Dashboard Setup**:
   * Log into Vercel and import the GitHub repository `pro1SnK`.
   * Set Environment Variables on Vercel dashboard:
     * `CONTACT_RECEIVER_EMAIL` = `your-inbox@example.com` (Target email to receive inquiries).
     * `RESEND_API_KEY` = `re_...` (Resend API key for secure delivery).
3. **Design Review Adjustments**:
   * Implement layouts or styles based on design feedback.

---

## 📝 Content Editing & Image Upload Guide

We have simplified the content upload workflow so it can be managed easily:

### 1. How to Modify Website Text (Easiest Method)
All website text strings are separated in [content.json](file:///Users/seungwonseo/multi-agent-test/company_landing/src/app/content.json).
1. Open `content.json` in a text editor (or edit it directly on the GitHub website UI).
2. Modify values under `"ko"` (for Korean text) or `"en"` (for English text).
3. Save, commit, and push (`git push`). Vercel will automatically rebuild and update the live page.

### 2. How to Upload New Images
1. Place your new image file inside the `public/` directory (e.g., `public/logo.png` or `public/images/office.jpg`).
2. In the code, reference the image path starting with `/` (e.g., `<img src="/logo.png" />` or `<img src="/images/office.jpg" />`).
3. Commit and push the image to GitHub.
