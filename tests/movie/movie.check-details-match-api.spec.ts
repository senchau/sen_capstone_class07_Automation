import test, { expect } from "@playwright/test";
import { HomePage } from "../../pages/myPage/HomePage";
import { Locale } from "../../pages/types";

test("Hiển thị danh sách phim phải đúng với API trả về", async ({
  page,
  context,
}) => {
  const locale: Locale = "vi";
  await context.clearCookies();

  const homePage = await HomePage.go(page, { locale });
  expect(homePage.movieTotal, "Không lấy được danh sách phim").not.toEqual(0);

  const { movieModels, movieTotal } = homePage;

  let currentSlideIndex = 1;
  const { data } = await homePage.getMovieDetailFromCarousel(currentSlideIndex);
  const movies = Array.from(data?.movies ?? []);
  let slideTotal = 0;
  if (movies.length > 0) {
    slideTotal = Math.ceil(movieTotal / movies.length);
  }

  while (currentSlideIndex < slideTotal) {
    ++currentSlideIndex;
    const { data } = await homePage.getMovieDetailFromCarousel(
      currentSlideIndex
    );
    const nextMovies = Array.from(data?.movies ?? []);
    movies.push(...nextMovies);
  }

  expect(
    movies.length,
    "Số lượng phim hiển thị và trả về từ API không khớp"
  ).toEqual(movieTotal);

  movieModels.forEach((movieModel) => {
    const matchedMovie = movies.find((movie) => movie.id === movieModel.id);

    expect(
      matchedMovie,
      "Phim trả về từ API không được hiển thị trên trang chủ"
    ).not.toBeUndefined();

    expect(matchedMovie?.title, "Tựa đề phim không khớp").toEqual(
      movieModel.title
    );

    expect(matchedMovie?.description, "Mô tả phim không khớp").toEqual(
      movieModel.description
    );

    expect(matchedMovie?.posterUrl, "Poster phim không khớp").toEqual(
      movieModel.posterUrl
    );

    console.log(`${movieModel.title} Passed`)
  });
});
