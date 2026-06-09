import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage — shared helpers inherited by all Page Object classes.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Navigate to a path relative to baseURL. */
  async goto(path = ''): Promise<void> {
    await this.page.goto(path);
  }

  /** Wait for a locator to be visible. */
  async waitForVisible(locator: Locator, timeout = 10_000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /** Wait for a locator to be hidden/removed. */
  async waitForHidden(locator: Locator, timeout = 10_000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /** Assert the current URL matches a pattern. */
  async assertUrl(pattern: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(pattern);
  }

  /** Assert page title. */
  async assertTitle(title: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  /** Get current page URL. */
  currentUrl(): string {
    return this.page.url();
  }

  /** Take a named screenshot. */
  async screenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png` });
  }
}
