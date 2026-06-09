# ⚡ Playwright TS Framework

> **A Modern Playwright Test Automation Framework** — UI + API testing with TypeScript, Page Object Model, and GitHub Actions CI/CD.

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

---

## 🚀 What is Playwright TS Framework?

Playwright TS Framework is a **modern, production-ready test automation framework** built on top of [Playwright](https://playwright.dev/) — Microsoft's next-generation end-to-end testing tool. It covers both **UI automation** and **API testing** in a single unified framework, with full CI/CD integration via GitHub Actions.

### Why Playwright?
- ✅ **Auto-wait** — no more flaky `sleep()` calls
- ✅ **Multi-browser** — Chromium, Firefox, WebKit out of the box
- ✅ **Built-in API testing** — no extra libraries needed
- ✅ **Trace viewer** — full video, screenshots & network logs on failure
- ✅ **Parallel execution** — fast by default
- ✅ **TypeScript-first** — full type safety

---

## 🏗️ Architecture

```
playwright-ts-framework/
├── .github/
│   └── workflows/
│       ├── ci.yml          ← Full suite on push to main/develop
│       └── pr.yml          ← Smoke tests + lint on every PR
│
├── src/
│   ├── config/             ← Environment & URL configuration
│   ├── fixtures/           ← Custom Playwright fixtures (auth sessions)
│   ├── pages/              ← Page Object Model (POM)
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   ├── inventory.page.ts
│   │   ├── cart.page.ts
│   │   └── checkout.page.ts
│   ├── api/
│   │   ├── base.api.ts     ← Generic HTTP wrapper
│   │   └── clients/
│   │       └── reqres.client.ts
│   └── utils/
│       ├── test-data.ts    ← Centralized test data
│       └── helpers.ts      ← Utility functions
│
├── tests/
│   ├── ui/                 ← UI specs (SauceDemo)
│   └── api/                ← API specs (ReqRes)
│
├── playwright.config.ts    ← Multi-project config (UI + API)
├── tsconfig.json
└── package.json
```

---

## 🧪 Test Coverage

### UI Tests — [SauceDemo](https://www.saucedemo.com) (19 test cases)

| File | Test Cases |
|------|-----------|
| `tests/ui/login.spec.ts` | Valid login, invalid credentials, locked user, empty fields, dismiss error |
| `tests/ui/inventory.spec.ts` | Product count, sort by price, sort by name, logout |
| `tests/ui/cart.spec.ts` | Add to cart, cart badge, remove item, continue shopping |
| `tests/ui/checkout.spec.ts` | Full E2E checkout, missing first name, missing zip, order summary, back home |

### API Tests — [ReqRes](https://reqres.in) (11 test cases)

| File | Test Cases |
|------|-----------|
| `tests/api/users.spec.ts` | List users, get user, 404 user, create user, update user, delete user, pagination |
| `tests/api/auth.spec.ts` | Login success, login missing password, register success, register missing password |

---

## ⚙️ Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/playwright-ts-framework.git
cd playwright-ts-framework

# 2. Install dependencies
npm ci

# 3. Install Playwright browsers
npx playwright install --with-deps chromium

# 4. Set up environment
cp .env.example .env

# 5. Run all tests
npm test
```

---

## 📋 Test Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (UI + API) |
| `npm run test:ui` | UI tests on Chromium |
| `npm run test:ui:firefox` | UI tests on Firefox |
| `npm run test:api` | API tests only |
| `npm run test:smoke` | `@smoke`-tagged fast suite |
| `npm run test:headed` | UI tests with visible browser |
| `npm run test:debug` | Playwright debug mode |
| `npm run report` | Open HTML report |
| `npm run lint` | ESLint check |
| `npm run type-check` | TypeScript type check |

---

## 🔄 CI/CD Pipeline

```
Push to main / develop
        │
        ▼
┌─────────────────────────────────┐
│         GitHub Actions          │
│                                 │
│  ┌──────────┐  ┌─────────────┐  │
│  │ API Tests│  │  UI Tests   │  │
│  │ (ReqRes) │  │ (Chromium)  │  │
│  └──────────┘  └─────────────┘  │
│         │              │        │
│         └──────┬───────┘        │
│                ▼                │
│       Report Summary            │
│    + HTML Artifact Upload       │
└─────────────────────────────────┘

Pull Requests → Smoke tests only (@smoke tag) + TypeScript lint
```

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Playwright](https://playwright.dev) | `^1.44` | Test runner, browser automation, API testing |
| [TypeScript](https://www.typescriptlang.org) | `^5.4` | Type-safe test code |
| [Node.js](https://nodejs.org) | `>=20` | Runtime |
| [ESLint](https://eslint.org) | `^8.57` | Code linting |
| [GitHub Actions](https://github.com/features/actions) | — | CI/CD pipeline |

---

## 📄 License

MIT — feel free to fork, extend, and use as a base for your own projects.
