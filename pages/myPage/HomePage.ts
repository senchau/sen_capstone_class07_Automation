import { Page, Locator } from "@playwright/test";
import { GlobalPage, IGetOptionsOptionsResp } from "./GlobalPage";
import { IBaseOutput, IGoInput } from "../interfaces";
import { Locale } from "../types";
import { LANGUAGE, HOME_PAGE_DOMAIN, MOVIE_LIST_API } from "../constants";
import { MovieModel } from "../../models/Movie";
import { CinemaModel } from "../../models/Cinema";
import { ShowtimeModel } from "../../models/Showtime";
import { normalizeUrl } from "../../utils/normalizeUrl";

export interface IMovieResp {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: number;
}

export interface IGetMovieListResp {
  movies: MovieModel[];
  total: number;
}

export interface IGetMovieListFromFilterResp {
  movieFilters: IGetOptionsOptionsResp[];
  total: number;
}

export interface IGetCinemaListFromFilterResp {
  cinemaFilters: IGetOptionsOptionsResp[];
  total: number;
}

export interface IGetShowtimeListFromFilterResp {
  showtimeFilters: IGetOptionsOptionsResp[];
  total: number;
}

export class HomePage extends GlobalPage {
  private static instance: HomePage;
  protected readonly page: Page;
  private readonly lang: Record<string, string>;

  private readonly movieFilterLocator!: Locator;
  private readonly cinemaFilterLocator!: Locator;
  private readonly showtimeFilterLocator!: Locator;
  private readonly buyTicketFilterBtnLocator!: Locator;

  public movieModels: MovieModel[] = [];
  public movieTotal: number = 0;

  private constructor(page: Page, locale: Locale) {
    super(page);

    this.page = page;
    this.lang = LANGUAGE[locale];

    this.movieFilterLocator = this.page.locator("//select[@name='film']");
    this.cinemaFilterLocator = this.page.locator("//select[@name='cinema']");
    this.showtimeFilterLocator = this.page.locator("//select[@name='date']");
    this.buyTicketFilterBtnLocator = this.page.locator(
      "//button[normalize-space(.//span)='MUA VÉ NGAY']"
    );
  }

  public static async go(page: Page, input: IGoInput): Promise<HomePage> {
    if (!HomePage.instance) {
      HomePage.instance = new HomePage(page, input.locale);
    }

    const self = HomePage.instance;

    try {
      const prevUrl = normalizeUrl(page.url());
      const curUrl = normalizeUrl(HOME_PAGE_DOMAIN);

      if (prevUrl !== curUrl) {
        await self.page.goto(curUrl);
      }

      const { data, errorMessage } = await self.getMovieList();
      if (!data) {
        throw new Error(errorMessage);
      }
      self.movieModels = data.movies;
      self.movieTotal = data.total;

      return self;
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "HomePage.go",
        errorMessage,
      });

      return self;
    }
  }

  async getMovieList(): Promise<IBaseOutput<IGetMovieListResp>> {
    try {
      let movies: MovieModel[] = [];
      let total = 0;

      const response = await this.page.waitForResponse(
        (res) => res.url() === MOVIE_LIST_API && res.status() === 200
      );
      const body: IMovieResp[] = await response.json();

      if (Array.isArray(body)) {
        movies = body?.map(
          (resp) =>
            new MovieModel({
              id: resp.maPhim?.toString(),
              groupId: resp.maNhom,
              title: resp.tenPhim,
              slug: resp.biDanh,
              trailerUrl: resp.trailer,
              posterUrl: resp.hinhAnh,
              description: resp.moTa,
              releaseDate: new Date(resp.ngayKhoiChieu),
              rating: resp.danhGia,
            })
        );
        total = movies.length;
      }

      return {
        data: { movies, total },
      };
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "HomePage.getMovieList",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }

  async getMovieListFromFilter(): Promise<
    IBaseOutput<IGetMovieListFromFilterResp>
  > {
    try {
      const { data, errorMessage } = await this.getOptions(
        this.movieFilterLocator
      );

      if (data === null) {
        throw new Error(errorMessage);
      }

      const filteredData =
        data?.options?.filter((option) => option.value !== "") ?? [];

      return {
        data: {
          movieFilters: filteredData,
          total: filteredData.length,
        },
      };
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "HomePage.getMovieListFromFilter",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }
  async getCinemaListFromFilter(): Promise<
    IBaseOutput<IGetCinemaListFromFilterResp>
  > {
    try {
      const { data, errorMessage } = await this.getOptions(
        this.cinemaFilterLocator
      );

      if (data === null) {
        throw new Error(errorMessage);
      }

      const filteredData =
        data?.options?.filter((option) => option.value !== "") ?? [];

      return {
        data: {
          cinemaFilters: filteredData,
          total: filteredData.length,
        },
      };
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "HomePage.getCinemaListFromFilter",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }

  async getShowtimeListFromFilter(): Promise<
    IBaseOutput<IGetShowtimeListFromFilterResp>
  > {
    try {
      const { data, errorMessage } = await this.getOptions(
        this.showtimeFilterLocator
      );
      if (data === null) {
        throw new Error(errorMessage);
      }

      const filteredData =
        data?.options?.filter((option) => option.value !== "") ?? [];

      return {
        data: {
          showtimeFilters: filteredData,
          total: filteredData.length,
        },
      };
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "HomePage.getShowtimeListFromFilter",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }

  async selectMovieOptionById(movieId: string) {
    try {
      await this.movieFilterLocator.selectOption(movieId);
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "HomePage.selectMovieOptionById",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }

  async selectCinemaOptionById(cinemaId: string) {
    try {
      await this.cinemaFilterLocator.selectOption(cinemaId);
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "HomePage.selectCinemaOptionById",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }

  async selectShowtimeOptionById(cinemaId: string) {
    try {
      await this.showtimeFilterLocator.selectOption(cinemaId);
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "HomePage.selectShowtimeOptionById",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }

  async buyTicketFromFilter() {
    try {
      await this.click(this.buyTicketFilterBtnLocator);
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "HomePage.buyTicketFromFilter",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }
}
