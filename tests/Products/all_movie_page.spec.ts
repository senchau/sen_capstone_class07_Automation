import test, { expect, request } from "@playwright/test";
import { HOME_PAGE_DOMAIN, LANGUAGE } from "../../pages/constants";
import { HomePage } from "../../pages/menu_pages/HomePage";

test('test movie listing on Homepage', async ({ page }) => {
    const locale = 'vi';
    const lang = LANGUAGE[locale];
    const homePage = new HomePage (page, 'vi');

    const apiResponse = await page.request.get('https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09');
    expect(apiResponse.ok()).toBeTruthy();
    const apiMovies = await apiResponse.json();

    // Chỉ lấy title, description, C18 từ API để so sánh với UI
    const apiMoviesSimplified = apiMovies.map((m: any) => ({
        title: m.tenPhim.trim(),
        description: m.moTa.trim(),
        c18: (m.tuoi != null ? String(m.tuoi).trim() : ''), // giả sử API trả trường C18 là danhGia
    }));

    // Mở Hơmepage
    await page.goto(HOME_PAGE_DOMAIN);

    // Lấy movies từ UI
    const uiMovies = await homePage.getAllMovies();

    // So sánh array mà không dùng vòng lặp
    const apiMoviesStr = apiMoviesSimplified.map((m: any) => JSON.stringify(m)).sort();
    const uiMoviesStr = uiMovies.map(m => JSON.stringify(m)).sort();

    expect(uiMoviesStr).toEqual(apiMoviesStr);
});