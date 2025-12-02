import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { SignInPage } from "../../pages/myPage/SignInPage";
import { HomePage } from "../../pages/myPage/HomePage";
import { MovieDetailPage } from "../../pages/myPage/MovieDetailPage";
import { BookingPage } from "../../pages/myPage/BookingPage";
import { Locale } from "../../pages/types";
import { LANGUAGE, userTest } from "../../pages/constants";

test("Hiển thị thông báo người dùng đã mua vé thành công khi mua từ bộ lọc", async ({
  page,
  context,
}) => {
  const locale: Locale = "vi";
  const lang = LANGUAGE[locale];

  await context.clearCookies();

  const signInPage = await SignInPage.go(page, { locale });
  const { data: signInData } = await signInPage.signIn(
    userTest.username,
    userTest.password
  );
  expect(signInData?.isSuccess, "Đăng nhập không thành công").toEqual(true);

  const homePage = await HomePage.go(page, { locale });

  const { data: getMovieListFromFilterData } =
    await homePage.getMovieListFromFilter();

  if (!getMovieListFromFilterData) {
    expect(
      getMovieListFromFilterData,
      "Không lấy được danh sách phim từ bộ lọc"
    ).toBe(null);

    return;
  } else {
    expect(
      getMovieListFromFilterData.total,
      "Không lấy được danh sách phim từ bộ lọc"
    ).not.toEqual(0);
  }

  const randomMovieNumber = faker.number.int({
    min: 0,
    max: getMovieListFromFilterData.total - 1,
  });

  const randomMovie =
    getMovieListFromFilterData.movieFilters[randomMovieNumber];
  await homePage.selectMovieOptionById(randomMovie.value);

  console.log(`Chọn phim: ${randomMovie.label} từ bộ lọc`);

  const { data: getCinemaListFromFilterData } =
    await homePage.getCinemaListFromFilter();

  if (!getCinemaListFromFilterData) {
    expect(
      getCinemaListFromFilterData,
      "Không lấy được danh sách rạp từ bộ lọc"
    ).toBe(null);

    return;
  } else {
    expect(
      getCinemaListFromFilterData.total,
      "Không lấy được danh sách rạp từ bộ lọc"
    ).not.toEqual(0);
  }

  const randomCinemaNumber = faker.number.int({
    min: 0,
    max: getCinemaListFromFilterData.total - 1,
  });

  const randomCinema =
    getCinemaListFromFilterData.cinemaFilters[randomCinemaNumber];

  await homePage.selectCinemaOptionById(randomCinema.value);

  console.log(`Chọn rạp: ${randomCinema.label} từ bộ lọc`);

  const { data: getShowtimeListFromFilterData } =
    await homePage.getShowtimeListFromFilter();

  if (!getShowtimeListFromFilterData) {
    expect(
      getShowtimeListFromFilterData,
      "Không lấy được danh sách ngày giờ chiếu từ bộ lọc"
    ).toBe(null);

    return;
  } else {
    expect(
      getShowtimeListFromFilterData.total,
      "Không lấy được danh sách ngày giờ chiếu từ bộ lọc"
    ).not.toEqual(0);
  }

  const randomShowtimeNumber = faker.number.int({
    min: 0,
    max: getShowtimeListFromFilterData.total - 1,
  });

  const randomShowtime =
    getShowtimeListFromFilterData.showtimeFilters[randomShowtimeNumber];
  await homePage.selectShowtimeOptionById(randomShowtime.value);

  console.log(`Chọn ngày giờ chiếu: ${randomShowtime.label} từ bộ lọc`);

  await homePage.buyTicketFromFilter();

  const bookingPage = await BookingPage.go(page, {
    id: randomShowtime.value,
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
      `Suất chiếu vào lúc: ${randomShowtime.label} - mã: ${randomShowtime.value} đã hết ghế trống`
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
  expect(modalContentData?.title).toBe(lang.bookingSuccessfullyMessage);
});
