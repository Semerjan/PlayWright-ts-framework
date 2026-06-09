import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { SORT_OPTIONS } from '../utils/test-data';

type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

/**
 * InventoryPage — the product listing page after login.
 * URL: https://www.saucedemo.com/inventory.html
 */
export class InventoryPage extends BasePage {
  // ─── Locators ───────────────────────────────────────────────────────────────
  readonly pageTitle: Locator;
  readonly productList: Locator;
  readonly productItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle    = page.locator('.title');
    this.productList  = page.locator('.inventory_list');
    this.productItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge    = page.locator('.shopping_cart_badge');
    this.cartIcon     = page.locator('.shopping_cart_link');
    this.burgerMenu   = page.locator('#react-burger-menu-btn');
    this.logoutLink   = page.locator('#logout_sidebar_link');
  }

  // ─── Actions ────────────────────────────────────────────────────────────────

  async navigate(): Promise<void> {
    await this.goto('/inventory.html');
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  /** Add a product to cart by its displayed name. */
  async addToCartByName(productName: string): Promise<void> {
    const item = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });
    await item.locator('button[data-test^="add-to-cart"]').click();
  }

  /** Remove a product from cart (when button switches to Remove). */
  async removeFromCartByName(productName: string): Promise<void> {
    const item = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });
    await item.locator('button[data-test^="remove"]').click();
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async logout(): Promise<void> {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }

  // ─── Getters ────────────────────────────────────────────────────────────────

  /** Returns all product names as an array. */
  async getProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  /** Returns all product prices as floats. */
  async getProductPrices(): Promise<number[]> {
    const raw = await this.page.locator('.inventory_item_price').allTextContents();
    return raw.map((p) => parseFloat(p.replace('$', '')));
  }

  async getCartCount(): Promise<number> {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return 0;
    return parseInt(await this.cartBadge.textContent() ?? '0', 10);
  }

  // ─── Assertions ─────────────────────────────────────────────────────────────

  async assertOnInventoryPage(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Products');
    await this.assertUrl(/inventory\.html/);
  }

  async assertProductCount(count: number): Promise<void> {
    await expect(this.productItems).toHaveCount(count);
  }

  async assertCartBadgeCount(count: number): Promise<void> {
    if (count === 0) {
      await expect(this.cartBadge).not.toBeVisible();
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async assertSortedByPriceAscending(): Promise<void> {
    const prices = await this.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  }

  async assertSortedByPriceDescending(): Promise<void> {
    const prices = await this.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  }

  async assertSortedByNameAscending(): Promise<void> {
    const names = await this.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  }
}
