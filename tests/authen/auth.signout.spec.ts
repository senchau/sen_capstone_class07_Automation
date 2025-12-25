import { test, expect } from "../../fixtures/auth";
import { TLocale } from "../../src/types/locale";
import { LANGUAGE } from "../../src/constants/language";
import { HomePage } from "../../pages/home/HomePage";

test("Hiển thị thông báo đăng xuất thành công", async ({ page, signIn }) => {
  const locale: TLocale = "VI";
  const LANG = LANGUAGE[locale];

  const homePage = await HomePage.go(page, { locale });

  await homePage.header.clickSignOut();

  const { data: modalData } = await homePage.modal.getModalData();

  if (modalData) {
    await modalData?.ok();
  }

  const { data: afterSignUpModalData } = await homePage.modal.getModalData();

  expect(
    afterSignUpModalData?.title,
    "Người dùng đăng xuất không thành công"
  ).toEqual(LANG.HEADER_SIGN_OUT_SUCCESSFULLY_MESSAGE);
});

test("Người dùng vẫn đăng nhập khi chọn huỷ đăng xuất", async ({
  page,
  signIn,
  mockUser,
}) => {
  const locale: TLocale = "VI";
  const LANG = LANGUAGE[locale];

  const homePage = await HomePage.go(page, { locale });

  await homePage.header.clickSignOut();

  const { data: modalData } = await homePage.modal.getModalData();

  if (modalData) {
    await modalData?.cancel();
  }

  const { data: accountData } = await homePage.header.getAccountInfo();

  expect(
    accountData?.fullName,
    "Người dùng huỷ đăng xuất không thành công"
  ).toEqual(mockUser.fullName);
});
