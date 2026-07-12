# Development Process Guide / 개발 프로세스 가이드 (PROCESS.md)

This file details the development, maintenance, and deployment processes for the **SnK Systems** landing page.
본 문서는 **(주)에스앤케이시스템즈** 랜딩 페이지의 개발, 유지보수 및 배포 프로세스 가이드를 설명합니다.

---

## 🇰🇷 한국어 버전 (Korean Version)

### 1. 개발 및 검증 프로세스
* **로컬 서버 테스트**:
  로컬 환경에서 코드 변경 사항을 검토하려면 프로젝트 폴더에서 아래 명령어를 사용합니다.
  ```bash
  npm run dev
  ```
  이후 브라우저에서 `http://localhost:3000`으로 접속하여 확인합니다.
* **E2E 테스트 실행 (품질 검증)**:
  배포 전에 브라우저 기능 호환성 및 에러 핸들링 유효성을 자동 검사하려면 아래 명령어를 수행합니다.
  ```bash
  npm run test:e2e
  ```
  *테스트가 100% 통과(Pass)하는지 확인 후 코드를 커밋합니다.*

### 2. 콘텐츠 업데이트 및 이미지 등록
* **텍스트 문구 변경**:
  `src/app/content.json` 파일을 열어 한국어(`ko`) 또는 영어(`en`) 오브젝트 내부의 키 값을 직접 수정하면 다국어 토글 화면에 즉시 변경된 내용이 적용됩니다.
* **이미지 등록**:
  새로운 이미지(예: 로고 이미지)는 `public/` 디렉토리에 저장하고, 코드 내에서는 `/filename.ext` 형식으로 참조합니다.

### 3. Vercel 배포 및 이메일 수신 설정
* **GitHub 연동 배포**:
  이 프로젝트는 GitHub 저장소에 푸시(`git push origin main`)할 때마다 Vercel에서 자동으로 변경 사항을 감지하여 1분 내로 재배포합니다.
* **문의(Contact Form) 이메일 수신 지정**:
  Vercel 환경 변수(Environment Variables) 설정에 아래 두 값을 추가합니다:
  * `CONTACT_RECEIVER_EMAIL`: 문의 메일을 수신할 대표 이메일 주소
  * `RESEND_API_KEY`: 이메일 전송 API Key (Resend 가입 후 획득)

---

## 🇺🇸 English Version (영어 버전)

### 1. Development & Verification Process
* **Running Local Server**:
  To test your changes locally, navigate to the project directory and run:
  ```bash
  npm run dev
  ```
  Open your browser and navigate to `http://localhost:3000`.
* **Running E2E Tests (Quality Assurance)**:
  To run automated browser compatibility and form validation checks before deploying:
  ```bash
  npm run test:e2e
  ```
  *Ensure that 100% of the test cases pass before committing code.*

### 2. Content Updates & Image Uploads
* **Editing Website Text**:
  Open `src/app/content.json` and directly modify values under the `"ko"` (Korean) or `"en"` (English) objects. Changes will immediately reflect on the multilingual switch layout.
* **Uploading Images**:
  Save new image files (e.g. corporate logo) in the `public/` directory, and reference them in the code using the `/filename.ext` path structure.

### 3. Vercel Deployment & Email Inbound Setup
* **GitHub Automatic Deployments**:
  Every push to the main branch (`git push origin main`) triggers an automatic build and deployment on Vercel, updating the live site within a minute.
* **Contact Form Email Destination**:
  Configure the following environment variables in the Vercel Dashboard Settings:
  * `CONTACT_RECEIVER_EMAIL`: Target email inbox to receive customer inquiries.
  * `RESEND_API_KEY`: API Key for Resend service to authorize secure delivery.
