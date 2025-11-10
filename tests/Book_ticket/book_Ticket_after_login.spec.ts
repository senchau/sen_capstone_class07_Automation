import { expect, test } from '@playwright/test';

test('Valid buy ticket test', async ({ page }) => {
    await page.goto('https://demo1.cybersoft.edu.vn/');

    // Step 1: Click "Đăng Nhập"
    const lnkLogin = page.getByRole('link', { name: 'Đăng Nhập' });
    await lnkLogin.click();

    // Step 2: Enter Username
    await page.getByRole('textbox', { name: 'Tài Khoản' }).fill('Testbb02a63727a845bc850256c55d2c1b77');

    // Step 3: Enter Password
    await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Test123456@');

    // Step 4: Click Đăng Nhập
    await page.getByRole('button', { name: 'Đăng nhập' }).click();

    // Step 5: Verify login successfully
    await expect(page.getByRole('heading', { name: 'Đăng nhập thành công' })).toBeVisible();

    // Step 6: Verify user profile
    await expect(page.getByRole('link', { name: 'Avatar John Kenny' })).toBeVisible();

    //   Step 7: Click Mua Ve button at Homepage
    await page.locator('a').filter({ hasText: 'C18The GentlemenQuý ông thế' }).click();

    //  Step 8: Click Mua Ve button at detail page
    await page.getByText('Mua vé').click();

    // Step 9: Select time
    await page.getByRole('link', { name: '-09-2021  ~  01:58' }).click();

    //  Step 10: Select Seat
    await page.getByRole('button', { name: '99' }).click();

    // Step 11: Click Dat ve button
    await page.getByRole('button', { name: 'ĐẶT VÉ' }).click();

    // Step 12: Verify Dat ve thanh cong
    await expect(page.getByText('Đặt vé thành công×')).toBeVisible();

    // Step 13: Click Dong Y button
    await page.getByRole('button', { name: 'Đồng ý' }).click();

});