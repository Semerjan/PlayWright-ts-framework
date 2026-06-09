import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  zipCode: string;
}

/**
 * CheckoutPage — covers Step 1 (info), Step 2 (overview), and Complete screens.
 */
export class CheckoutPage extends BasePage {
  // ─── Step 1 Locators ────────────────────────────────────────────────────────
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  // ─── Step 2 Locators ────────────────────────────────────────────────────────
  readonly summaryTotal: Locator;
  readonly finishButton: Locator;
  readonly summaryItems: Locator;

  // ─── Complete Locators ──────────────────────────────────────────────────────
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);

    // Step 1
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput  = page.locator('[data-test="lastName"]');
    this.zipInput       = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton   = page.locator('[data-test="cancel"]');
    this.errorMessage   = page.locator('[data-test="error"]');

    // Step 2
    this.summaryTotal = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.summaryItems = page.locator('.cart_item');

    // Complete
    this.completeHeader  = page.locator('.complete-header');
    this.completeText    = page.locator('.complete-text');
    this.backHomeButton  = page.locator('[data-test="back-to-products"]');
  }

  // ─── Actions ────────────────────────────────────────────────────────────────

  async fillCheckoutInfo(info: CheckoutInfo): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.zipInput.fill(info.zipCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async backHome(): Promise<void> {
    await this.backHomeButton.click();
  }

  /** One-shot: fill info + continue in a single call. */
  async fillAndContinue(info: CheckoutInfo): Promise<void> {
    await this.fillCheckoutInfo(info);
    await this.continue();
  }

  // ─── Assertions ─────────────────────────────────────────────────────────────

  async assertOnStepOne(): Promise<void> {
    await this.assertUrl(/checkout-step-one\.html/);
    await expect(this.continueButton).toBeVisible();
  }

  async assertOnStepTwo(): Promise<void> {
    await this.assertUrl(/checkout-step-two\.html/);
    await expect(this.finishButton).toBeVisible();
  }

  async assertOrderComplete(): Promise<void> {
    await this.assertUrl(/checkout-complete\.html/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }

  async assertErrorMessage(text: string | RegExp): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(text);
  }

  async assertSummaryTotal(expected: string): Promise<void> {
    await expect(this.summaryTotal).toContainText(expected);
  }
}
