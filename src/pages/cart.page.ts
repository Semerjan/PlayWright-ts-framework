import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * CartPage — the shopping cart.
 * URL: https://www.saucedemo.com/cart.html
 */
export class CartPage extends BasePage {
  // ─── Locators ───────────────────────────────────────────────────────────────
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle              = page.locator('.title');
    this.cartItems              = page.locator('.cart_item');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton         = page.locator('[data-test="checkout"]');
  }

  // ─── Actions ────────────────────────────────────────────────────────────────

  async navigate(): Promise<void> {
    await this.goto('/cart.html');
  }

  async removeItemByName(productName: string): Promise<void> {
    const item = this.page
      .locator('.cart_item')
      .filter({ hasText: productName });
    await item.locator('button[data-test^="remove"]').click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  // ─── Getters ────────────────────────────────────────────────────────────────

  async getItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  // ─── Assertions ─────────────────────────────────────────────────────────────

  async assertOnCartPage(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Your Cart');
    await this.assertUrl(/cart\.html/);
  }

  async assertItemPresent(productName: string): Promise<void> {
    await expect(
      this.page.locator('.cart_item').filter({ hasText: productName })
    ).toBeVisible();
  }

  async assertItemAbsent(productName: string): Promise<void> {
    await expect(
      this.page.locator('.cart_item').filter({ hasText: productName })
    ).not.toBeVisible();
  }

  async assertCartItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  async assertCartEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }
}
