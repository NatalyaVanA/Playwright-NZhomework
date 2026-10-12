import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})
// there was only one exsercise on the Input Fields Assigment page 
test('Change first pet type', async ({ page }) => {
  await page.getByRole('link', { name: 'Pet Types' }).click();
  await expect(page.getByRole('heading')).toHaveText('Pet Types');

  const firstPetTypeRow = page.locator('tr', { has: page.locator('[id="0"]') });

  await expect(firstPetTypeRow).toHaveCount(1);
  await firstPetTypeRow.getByRole('button', { name: 'Edit' }).click();

  await expect(page.getByRole('heading')).toHaveText('Edit Pet Type');
  const editTypeField = page.getByRole('textbox');
  await expect(editTypeField).toHaveValue('cat')
  await editTypeField.fill('rabbit');
  await page.getByRole('button', { name: 'Update' }).click()

  await expect(page.getByRole('heading')).toHaveText('Pet Types');
  const firstPetTypeInputField = page.locator('[id="0"]');
  await expect(firstPetTypeInputField).toHaveValue('rabbit');

  await firstPetTypeRow.getByRole('button', { name: 'Edit' }).click();
  await expect(editTypeField).toHaveValue('rabbit')
  await editTypeField.fill('cat');
  await page.getByRole('button', { name: 'Update' }).click()
  await expect(firstPetTypeInputField).toHaveValue('cat');
});

