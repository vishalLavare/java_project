import { test, expect } from '@playwright/test';

/**
 * End-to-End (E2E) Automation Test Suite for Student Management Application
 * Simulates real user browser interactions with the React frontend & Spring Boot backend.
 */
test.describe('Student Management E2E UI Automation', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to local React App URL
    await page.goto('http://localhost:5173');
  });

  test('Page loads correctly with header and architecture banner', async ({ page }) => {
    // Verify Page Title
    await expect(page).toHaveTitle(/Student Portal/i);

    // Verify Main Header
    const heading = page.getByText('Student Portal Management');
    await expect(heading).toBeVisible();

    // Verify Architecture Banner
    await expect(page.getByText('Database Backend:')).toBeVisible();
  });

  test('User can open Add Student modal and type student details', async ({ page }) => {
    // Click "Add Student" button
    const addButton = page.getByRole('button', { name: /add student/i });
    await addButton.click();

    // Verify Modal opens with "Add New Student" heading
    const modalHeader = page.getByRole('heading', { name: 'Add New Student' });
    await expect(modalHeader).toBeVisible();

    // Fill form fields with exact placeholder matches
    await page.getByPlaceholder('e.g. John Doe').fill('Test Student');
    await page.getByPlaceholder('e.g. john.doe@example.com').fill('test.student@example.com');
    await page.getByPlaceholder('e.g. Computer Science').fill('Cyber Security');

    // Close modal via Cancel button
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(modalHeader).not.toBeVisible();
  });

  test('Search filter dynamically accepts text input', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search by student name or email/i);
    await searchInput.fill('Alice');

    // Verify search input value was updated
    await expect(searchInput).toHaveValue('Alice');
  });

});
