import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})
// there was only one exsercise on the Input Fields Assigment page  
test('Change first pet type', async ({ page }) => {
  await page.getByRole('link', { name: 'Pet Types' }).click();
  await expect(page.locator('h2')).toHaveText('Pet Types');
  
  const firstPetTypeRow = page.locator('tr')
    .filter({
      has: page.locator('td')
        .filter({ has: page.locator('[id="0"]') })
    });
  await expect(firstPetTypeRow).toHaveCount(1);
  await firstPetTypeRow.getByRole('button', { name: 'Edit' }).click();

  await expect(page.locator('h2')).toHaveText('Edit Pet Type');
  const editTypeField = page.locator('#name');
  await editTypeField.click();
  await editTypeField.fill('rabbit');

  const updateButton = page.getByRole('button', { name: 'Update' });
  await expect(updateButton).toHaveCount(1);
  await updateButton.click();

  await expect(page.locator('h2')).toHaveText('Pet Types');
  const firstPetTypeValue = page.locator('[id="0"]');
  await expect(firstPetTypeValue).toHaveValue('rabbit');

  await firstPetTypeRow.getByRole('button', { name: 'Edit' }).click();
  await editTypeField.click();
  await editTypeField.fill('cat');
  await updateButton.click();
  await expect(firstPetTypeValue).toHaveValue('cat');
});

