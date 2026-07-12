# Project: Company Landing Page

## Architecture
- Framework: Next.js (App Router, TypeScript, Tailwind CSS)
- Layout: Responsive single-page layout (Hero, Services, About, Contact sections)
- Validation: Client-side Form Validation
- Testing: Playwright/Cypress/Jest for E2E and component testing.

## Milestones

### Implementation Track
| # | Name | Scope | Dependencies | Status | Agent ID |
|---|------|-------|-------------|--------|----------|
| M1 | Scaffold & Init | Initialize Next.js project structure, configuration, and dependencies. | None | DONE | f03f9812-ce24-4214-994c-b590382288b8 |
| M2 | UI Components | Implement Hero, Services 소개, and Company 소개 sections (R1, R2). | M1 | DONE | f03f9812-ce24-4214-994c-b590382288b8 |
| M3 | Contact Form | Implement Contact Form section with client-side validation and success feedback (R1, R3). | M2 | PLANNED | 6f716fae-eb6d-44cc-b413-163dafd354bf |
| M4 | Responsive & Styling | Refine Tailwind responsive styles for 375px and 1200px+ (R2). | M3 | PLANNED | 6f716fae-eb6d-44cc-b413-163dafd354bf |
| M5 | E2E Integration | Run E2E test cases, fix bugs, and ensure 100% test pass rate. | M4, E2E Test Ready | PLANNED | 6f716fae-eb6d-44cc-b413-163dafd354bf |
| M6 | Adversarial Hardening | Tier 5 white-box coverage hardening with Challengers. | M5 | PLANNED | 6f716fae-eb6d-44cc-b413-163dafd354bf |

### E2E Testing Track
| # | Name | Scope | Dependencies | Status | Agent ID |
|---|------|-------|-------------|--------|----------|
| TM1| Test Infra Setup | Choose/setup Playwright/Cypress E2E test harness. | None | IN_PROGRESS | 4863d65d-dceb-4f6a-b87d-8c15db06e57f |
| TM2| Write E2E Tests | Implement Tiers 1-4 tests (Feature, Boundary, Pairwise, Workload). | TM1 | PLANNED | 4863d65d-dceb-4f6a-b87d-8c15db06e57f |
| TM3| Test Suite Ready | Verify test suite executes cleanly and publish `TEST_READY.md`. | TM2 | PLANNED | 4863d65d-dceb-4f6a-b87d-8c15db06e57f |

## Interface Contracts
- **Landing Page Elements**: Elements must have identifiers/data-testid attributes for testing:
  - Hero catchphrase: `data-testid="hero-catchphrase"`
  - CTA button: `data-testid="hero-cta"`
  - Services section: `data-testid="services-section"`
  - About/Vision section: `data-testid="about-section"`
  - Contact Form name: `data-testid="contact-name"`
  - Contact Form email: `data-testid="contact-email"`
  - Contact Form message: `data-testid="contact-message"`
  - Contact Form submit button: `data-testid="contact-submit"`
  - Validation error messages: `data-testid="error-message"`
  - Success feedback (toast/modal): `data-testid="success-feedback"`

## Code Layout
- Next.js root: `/Users/seungwonseo/multi-agent-test/company_landing`
- Next.js app directory: `src/app`
- Tailwind configuration: `tailwind.config.js` or `tailwind.config.ts`
- E2E Tests directory: `tests` or `e2e`
