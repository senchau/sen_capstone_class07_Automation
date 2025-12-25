import { faker } from "@faker-js/faker";
import { test, expect } from "../../fixtures/user";
import { SignInPage } from "../../pages/myPage/SignInPage";
import { HomePage } from "../../pages/myPage/HomePage";
import { MovieDetailPage } from "../../pages/myPage/MovieDetailPage";
import { BookingPage } from "../../pages/myPage/BookingPage";
import { TLocale } from "../../src/types/locale";
import { LANGUAGE } from "../../src/constants/language";

test("Hiển thị thông báo người dùng đã mua vé thành công", async ({
  page,
  context,
  mockUser,
}) => {
  const locale: TLocale = "VI";
  const LANG = LANGUAGE[locale];

  await context.clearCookies();

  const signInPage = await SignInPage.go(page, { locale });

  const { data: signInData } = await signInPage.signIn(
    mockUser.username,
    mockUser.password
  );
  expect(signInData?.isSuccess, "Đăng nhập không thành công").toEqual(true);

  const homePage = await HomePage.go(page, { locale });
  expect(homePage.movieTotal, "Không lấy được danh sách phim").not.toEqual(0);

  const { movieModels, movieTotal } = homePage;

  const randomMovieNumber = faker.number.int({ min: 0, max: movieTotal - 1 });
  const randomMovie = movieModels[randomMovieNumber];
  console.log(`Đặt phim: ${randomMovie.title}`);

  const movieDetailPage = await MovieDetailPage.go(page, {
    id: randomMovie.id,
    locale,
  });
  expect(!movieDetailPage.movieModel, "Không lấy đươc chi tiết phim").not.toBe(
    null
  );

  const showtimes = movieDetailPage.getShowTimes();
  if (showtimes.length === 0) {
    console.log(`Phim ${randomMovie.title} hiện không có suất chiếu`);
    return;
  }

  const randomShowTimeNumber = faker.number.int({
    min: 0,
    max: showtimes.length - 1,
  });
  const randomShowtime = showtimes[randomShowTimeNumber];
  console.log(
    `Đặt suất chiếu vào lúc: ${randomShowtime.dateTime} - mã: ${randomShowtime.id}`
  );

  const bookingPage = await BookingPage.go(page, {
    id: randomShowtime.id,
    locale,
  });

  const availableSeats = bookingPage.getAvailableSeatList();

  if (!availableSeats.data) {
    expect(availableSeats.data, "Không lấy được danh sách ghế trống").not.toBe(
      null
    );

    return;
  }

  if (availableSeats.data.total === 0) {
    console.log(
      `Suất chiếu vào lúc: ${randomShowtime.dateTime} - mã: ${randomShowtime.id} đã hết ghế trống`
    );
    return;
  }

  const randomSeatNumber = faker.number.int({
    min: 0,
    max: availableSeats.data.total - 1,
  });
  const randomSeat = availableSeats.data.seats[randomSeatNumber];
  console.log(`Đặt ghế có số thứ tự: ${randomSeat.order}`);

  await bookingPage.bookTicketByOrder(randomSeat.order);

  const { data: modalContentData } = await bookingPage.getModalContent();
  console.log(`${modalContentData?.title}`);
  expect(modalContentData?.title).toBe(LANG.BOOKING_SUCCESSFULLY_MESSAGE);
});
