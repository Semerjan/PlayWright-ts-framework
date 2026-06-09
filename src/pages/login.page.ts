import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * LoginPage — covers the SauceDemo login screen.
 * URL: https://www.saucedemo.com/
 */
export class LoginPage extends BasePage {
  // ─── Locators ───────────────────────────────────────────────────────────────
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorDismiss: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton   = page.locator('[data-test="login-button"]');
    this.errorMessage  = page.locator('[data-test="error"]');
    this.errorDismiss  = page.locator('.error-button');
  }

  // ─── Actions ────────────────────────────────────────────────────────────────

  /** Navigate to login page. */
  async navigate(): Promise<void> {
    await this.goto('/');
  }

  /** Fill credentials and click login. */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Dismiss the error message banner. */
  async dismissError(): Promise<void> {
    await this.errorDismiss.click();
  }

  // ─── Assertions ─────────────────────────────────────────────────────────────

  async assertLoginPageVisible(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
  }

  async assertErrorMessage(text: string | RegExp): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(text);
  }

  async assertNoError(): Promise<void> {
    await expect(this.errorMessage).not.toBeVisible();
  }
}
