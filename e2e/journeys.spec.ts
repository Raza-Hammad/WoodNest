import { test, expect } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';

test.describe('WoodNest E2E Critical Journeys', () => {

  test('1. Bestseller to Inquiry Journey', async ({ page }) => {
    await page.goto(BASE_URL);

    // Locate the Bestsellers section on homepage
    const bestsellerSection = page.locator('section', { hasText: 'Most ordered' });
    await expect(bestsellerSection).toBeVisible();
    await bestsellerSection.scrollIntoViewIfNeeded();

    // Find a guaranteed bestseller product card (e.g. Marlow 3-Seater Sofa) and click its title link
    const productCard = bestsellerSection.locator('article', { hasText: 'Marlow 3-Seater Sofa' }).first();
    await expect(productCard).toBeVisible();
    await productCard.getByRole('link', { name: 'Marlow 3-Seater Sofa', exact: true }).click();

    // Verify detail page has loaded with the correct heading
    await page.waitForURL('**/products/marlow-3-seater-sofa');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Marlow 3-Seater Sofa');

    // Open inquiry form drawer
    const inquiryBtn = page.getByRole('button', { name: /Request price & availability/i }).first();
    await expect(inquiryBtn).toBeVisible();
    await inquiryBtn.click();

    // Verify inquiry drawer is open and settled with product context
    const inquiryDrawer = page.locator('div[role="dialog"]');
    await expect(inquiryDrawer).toBeVisible();
    await expect(inquiryDrawer.getByText('Marlow 3-Seater Sofa')).toBeVisible();

    // Fill in customer inquiry details
    await inquiryDrawer.getByLabel(/Your name/i).fill('Ahmed Khan');
    await inquiryDrawer.getByLabel(/Phone \/ WhatsApp/i).fill('+923001234567');
    await inquiryDrawer.getByLabel(/Email/i).fill('ahmed@example.com');
    await inquiryDrawer.getByLabel(/Message/i).fill('Is this available for immediate delivery in Lahore?');

    // Submit inquiry via form button
    const submitBtn = inquiryDrawer.locator('form').getByRole('button', { name: /Request price & availability/i });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // Assert success confirmation
    await expect(inquiryDrawer.getByText('Message sent')).toBeVisible();
  });

  test('2. Category to Detail Journey', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    // Click an active category filter button in the sidebar (e.g., "Sofas & Sectionals")
    const categoryBtn = page.getByRole('button', { name: /Sofas & Sectionals/i }).first();
    await expect(categoryBtn).toBeVisible();
    await categoryBtn.click();

    // Verify URL updates with category query parameter and active filter chip appears
    await expect(page).toHaveURL(/.*cat=sofas.*/);
    await expect(page.locator('button', { hasText: 'Sofas & Sectionals' }).first()).toBeVisible();

    // Click the first product card's title link in the filtered list
    const firstProductCard = page.locator('article').first();
    await expect(firstProductCard).toBeVisible();
    const productTitleLink = firstProductCard.locator('a.text-\\[15px\\]');
    await expect(productTitleLink).toBeVisible();
    const expectedName = (await productTitleLink.textContent())?.trim();
    await productTitleLink.click();

    // Verify target product detail page displays the expected heading
    await expect(page).toHaveURL(/.*\/products\/.+/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    if (expectedName) {
      await expect(page.getByRole('heading', { level: 1 })).toContainText(expectedName);
    }
  });

  test('3. Search to Wishlist Journey', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    // Search for furniture pieces (e.g., "Chair")
    const searchInput = page.getByPlaceholder(/Search sofas, oak tables, lamps/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill('Chair');

    // Verify search filtered results to matching pieces
    const productCard = page.locator('article', { hasText: /Chair/i }).first();
    await expect(productCard).toBeVisible();

    // Click the wishlist button on the card (matching WishlistButton.tsx aria-label)
    const wishlistBtn = productCard.getByRole('button', { name: /Save .* to your list/i });
    await expect(wishlistBtn).toBeVisible();
    await wishlistBtn.click();

    // Verify button toggled to saved state
    await expect(productCard.getByRole('button', { name: /Remove .* from saved pieces/i })).toBeVisible();

    // Open wishlist drawer from header
    const headerWishlistBtn = page.getByRole('button', { name: /Open wishlist/i });
    await expect(headerWishlistBtn).toBeVisible();
    await headerWishlistBtn.click();

    // Assert wishlist drawer opens and displays the saved piece
    const wishlistDrawer = page.locator('div[role="dialog"]');
    await expect(wishlistDrawer).toBeVisible();
    await expect(wishlistDrawer.getByText(/Saved pieces/i)).toBeVisible();
    await expect(wishlistDrawer.getByText(/Chair/i).first()).toBeVisible();
  });

  test('4. Room to Inquiry Journey', async ({ page }) => {
    await page.goto(`${BASE_URL}/rooms`);

    // Verify page heading and room inspiration content
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Tap a dot. Shop the room.');
    await expect(page.getByRole('heading', { name: 'The living room' })).toBeVisible();

    // Click a shoppable hotspot link in the room scene (e.g. Marlow 3-Seater Sofa)
    const hotspotLink = page.getByRole('link', { name: /Shop the Marlow 3-Seater Sofa/i }).first();
    await expect(hotspotLink).toBeVisible();
    await hotspotLink.click();

    // Verify navigation to the target product detail page
    await page.waitForURL('**/products/marlow-3-seater-sofa');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Marlow 3-Seater Sofa');

    // Open inquiry drawer from product page
    const inquiryBtn = page.getByRole('button', { name: /Request price & availability/i }).first();
    await expect(inquiryBtn).toBeVisible();
    await inquiryBtn.click();

    // Verify inquiry drawer is open and preserves product context
    const inquiryDrawer = page.locator('div[role="dialog"]');
    await expect(inquiryDrawer).toBeVisible();
    await expect(inquiryDrawer.getByText('Marlow 3-Seater Sofa')).toBeVisible();

    // Fill in inquiry details
    await inquiryDrawer.getByLabel(/Your name/i).fill('Zahra Khan');
    await inquiryDrawer.getByLabel(/Phone \/ WhatsApp/i).fill('+923005556667');
    await inquiryDrawer.getByLabel(/Email/i).fill('zahra@example.com');
    await inquiryDrawer.getByLabel(/Message/i).fill('I would like to know the lead time for this piece.');

    // Submit inquiry
    const submitBtn = inquiryDrawer.locator('form').getByRole('button', { name: /Request price & availability/i });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // Assert success confirmation
    await expect(inquiryDrawer.getByText('Message sent')).toBeVisible();
  });

  test('5. Contact & Showroom Journey', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);

    // Verify showroom location and contact details
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Tell us about the room you');
    await expect(page.getByText('24-C Main Boulevard, Gulberg III, Lahore')).toBeVisible();
    await expect(page.getByRole('main').getByText('hello@woodnest.pk')).toBeVisible();

    // Fill in the contact form scoped to main content area
    const contactSection = page.locator('main');
    const contactForm = contactSection.locator('form', { hasText: 'Your name' });
    await expect(contactForm).toBeVisible();

    await contactForm.getByLabel(/Your name/i).fill('Maria Yusuf');
    await contactForm.getByLabel(/Phone \/ WhatsApp/i).fill('+923123456789');
    await contactForm.getByLabel(/^Email$/i).fill('maria@example.com');
    await contactForm.getByLabel(/Message/i).fill('General inquiry about showroom visit timings this weekend.');

    // Submit the inquiry form
    const submitBtn = contactForm.getByRole('button', { name: /Request price & availability/i });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // Assert success confirmation on the contact page
    await expect(contactSection.getByText('Message sent')).toBeVisible();
    await expect(contactSection.getByText(/We will get back to you within one working day/i)).toBeVisible();
  });

});
