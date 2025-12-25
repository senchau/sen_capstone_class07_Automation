import { faker } from "@faker-js/faker";
import { test, expect } from "../../fixtures/auth";
import { HomePage } from "../../pages/home/HomePage";
import { MovieDetailPage } from "../../pages/movie/MovieDetailPage";
import { BookingPage } from "../../pages/booking/BookingPage";
import { TLocale } from "../../src/types/locale";
import { LANGUAGE } from "../../src/constants/language";

test("Hiển thị cảnh báo khi người dùng đặt vé mà chưa chọn ghế", async ({
  page,
  signIn,
}) => {
  const locale: TLocale = "VI";
  const LANG = LANGUAGE[locale];

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

  await bookingPage.bookTicket();

  const { data: modalData } = await bookingPage.modal.getModalData();
  console.log(`Lỗi: ${modalData?.title}`);
  expect(modalData?.title).toBe(LANG.BOOKING_UNSELECT_SEAT_MESSAGE);
});
