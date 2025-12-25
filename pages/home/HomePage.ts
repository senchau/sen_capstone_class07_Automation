import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { Header } from "../components/Header";
import { Modal } from "../components/Modal";
import { IBaseOutput, IGoInput } from "../../src/interfaces/commons";
import {
  IGetMovieListResp,
  IMovieResp,
  IGetMovieListFromFilterResp,
  IGetCinemaListFromFilterResp,
  IGetMovieDetailFromMovieCardResp,
  IGetMovieDetailFromMovieCardMovieResp,
  IGetShowtimeListFromFilterResp,
} from "../../src/interfaces/homes";
import { TLocale } from "../../src/types/locale";
import { LANGUAGE } from "../../src/constants/language";
import { HOME_PAGE_DOMAIN, MOVIE_LIST_API } from "../../src/constants/endpoint";
import { MovieModel } from "../../src/models/Movie";
import { formatError, prettyErrorLog, normalizeUrl } from "../../helpers/utils";

export class HomePage extends BasePage {
  private static instance: HomePage;
  private readonly lang: Record<string, string>;

  private readonly movieFilterLocator!: Locator;
  private readonly cinemaFilterLocator!: Locator;
  private readonly showtimeFilterLocator!: Locator;
  private readonly buyTicketFilterBtnLocator!: Locator;
  private readonly movieCarouselItemLocator!: Locator;

  private readonly movieCarouselBtnLocator!: (slideNumber: number) => Locator;

  protected readonly page: Page;

  public readonly header: Header;
  public readonly modal: Modal;

  public movieModels: MovieModel[] = [];
  public movieTotal: number = 0;

  private constructor(page: Page, locale: TLocale) {
    super(page, locale);

    this.page = page;
    this.lang = LANGUAGE[locale];

    this.header = new Header(page, locale);
    this.modal = new Modal(page, locale);

    this.movieFilterLocator = this.page.locator("//select[@name='film']");
    this.cinemaFilterLocator = this.page.locator("//select[@name='cinema']");
    this.showtimeFilterLocator = this.page.locator("//select[@name='date']");
    this.buyTicketFilterBtnLocator = this.page.locator(
      `//button[normalize-space(.//span)='${this.lang.bookingBuyTNowicketBtn}']`
    );
    this.movieCarouselItemLocator = this.page.locator(
      `//div[contains(@class,'CarouselItem')]//a[not(ancestor::a)][1]`
    );
    this.movieCarouselBtnLocator = (slideNumber: number) =>
      this.page.locator(
        `//div[contains(@class,'CarouselItem') and .//a]/following-sibling::div[1]/button[${slideNumber}]`
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
      const error = formatError(err);
      prettyErrorLog(error);

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
              description: resp.moTa.trim(),
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
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
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
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
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
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }

  async getMovieDetailFromCarousel(
    slideNumber: number = 1
  ): Promise<IBaseOutput<IGetMovieDetailFromMovieCardResp>> {
    try {
      let movies: IGetMovieDetailFromMovieCardMovieResp[] = [];
      const movieCarouselBtnLocator = this.movieCarouselBtnLocator(slideNumber);
      await this.click(movieCarouselBtnLocator);
      await this.page.waitForTimeout(300);

      const allMovidecardLocator = await this.movieCarouselItemLocator.all();

      for (const eachMovieCardLocator of allMovidecardLocator) {
        const movieObject: IGetMovieDetailFromMovieCardMovieResp = {
          id: "",
          title: "",
          description: "",
          posterUrl: "",
        };

        const href = await eachMovieCardLocator.getAttribute("href");
        const hrefPaths = href?.split("/")?.filter((v) => v?.trim()) ?? [];

        if (hrefPaths?.length > 0) {
          const id = hrefPaths?.[hrefPaths?.length - 1] ?? "";
          movieObject.id = id;
        }

        const posterContainerLocator = await eachMovieCardLocator.locator(
          "xpath=./div/div[1]"
        );
        const posterUrl = await posterContainerLocator.evaluate((el) => {
          const bg = getComputedStyle(el).backgroundImage;
          const match = bg.match(/url\(["']?(.*?)["']?\)/);
          return match ? match[1] : "";
        });
        movieObject.posterUrl = posterUrl;

        const infoContainerLocator = await eachMovieCardLocator.locator(
          "xpath=./div/div[2]"
        );
        const ageRestricted = await infoContainerLocator
          .locator("//span")
          .innerText();
        const titleLocator = await infoContainerLocator.locator(
          "xpath=./div[1]/div[1]"
        );
        const titleData = await this.getText(titleLocator);
        const title = titleData.data?.replace(ageRestricted, "") ?? "";
        movieObject.title = title;

        const descriptionLocator = eachMovieCardLocator.locator("h4");
        if (await descriptionLocator.isVisible()) {
          const description = await descriptionLocator.innerText();
          movieObject.description = description.trim();
        }

        movies.push(movieObject);
      }

      return {
        data: {
          movies,
        },
      };
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
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
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }

  async selectMovieOptionById(movieId: string) {
    try {
      await this.movieFilterLocator.selectOption(movieId);
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }

  async selectCinemaOptionById(cinemaId: string) {
    try {
      await this.cinemaFilterLocator.selectOption(cinemaId);
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }

  async selectShowtimeOptionById(cinemaId: string) {
    try {
      await this.showtimeFilterLocator.selectOption(cinemaId);
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }

  async buyTicketFromFilter() {
    try {
      await this.click(this.buyTicketFilterBtnLocator);
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }
}
