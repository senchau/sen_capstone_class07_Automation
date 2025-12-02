import { Page } from "@playwright/test";
import { IBaseOutput, IGoInput } from "../interfaces";
import { Locale } from "../types";
import { LANGUAGE, HOME_PAGE_DOMAIN, MOVIE_DETAIL_API } from "../constants";
import { MovieModel } from "../../models/Movie";
import { CinemaModel, CinemaClusterModel } from "../../models/Cinema";
import { ShowtimeModel } from "../../models/Showtime";
import { normalizeUrl } from "../../utils/normalizeUrl";

export interface IShowtimeResp {
  maLichChieu: string;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: string;
  giaVe: number;
  thoiLuong: number;
}

export interface ICinemaClusterResp {
  lichChieuPhim: IShowtimeResp[];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string | null;
}

export interface ICinemaSystemResp {
  cumRapChieu: ICinemaClusterResp[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
}

export interface IMovieDetailResp {
  heThongRapChieu: ICinemaSystemResp[];
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

export interface IGetMovieDetailResp {
  movie: MovieModel;
}

export class MovieDetailPage {
  private static instance: MovieDetailPage;
  private readonly page!: Page;
  private readonly lang: Record<string, string>;

  public movieId: string;
  public movieModel: MovieModel | null = null;

  private constructor(page: Page, movieId: string, locale: Locale) {
    this.page = page;
    this.movieId = movieId;
    this.lang = LANGUAGE[locale];
  }

  public static async go(
    page: Page,
    input: IGoInput
  ): Promise<MovieDetailPage> {
    if (!MovieDetailPage.instance) {
      MovieDetailPage.instance = new MovieDetailPage(
        page,
        input.id || "",
        input.locale
      );
    }

    const self = MovieDetailPage.instance;

    try {
      const prevUrl = normalizeUrl(page.url());
      const curUrl = normalizeUrl(HOME_PAGE_DOMAIN + `/detail/${self.movieId}`);

      if (prevUrl !== curUrl) {
        await self.page.goto(curUrl);
      }

      const { data, errorMessage } = await self.getMovieDetail();
      if (!data) {
        throw new Error(errorMessage);
      }
      self.movieModel = data.movie;

      return self;
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "MovieDetailPage.go",
        errorMessage,
      });

      return self;
    }
  }

  async getMovieDetail(): Promise<IBaseOutput<IGetMovieDetailResp>> {
    try {
      const endpoint = MOVIE_DETAIL_API + `?MaPhim=${this.movieId}`;
      const response = await this.page.waitForResponse(
        (res) => res.url() === endpoint && res.status() === 200
      );
      const movieDetailResp: IMovieDetailResp = await response.json();

      const cinemaModels: CinemaModel[] =
        movieDetailResp?.heThongRapChieu?.map(
          ({ maHeThongRap, cumRapChieu = [], tenHeThongRap, logo }) =>
            new CinemaModel({
              id: maHeThongRap,
              name: tenHeThongRap,
              logo,
              clusters:
                cumRapChieu?.map(
                  ({ lichChieuPhim, maCumRap, tenCumRap, hinhAnh }) =>
                    new CinemaClusterModel({
                      id: maCumRap,
                      name: tenCumRap,
                      image: hinhAnh || "",
                      showtimes:
                        lichChieuPhim?.map(
                          ({
                            maLichChieu,

                            ngayChieuGioChieu,
                            giaVe,
                            thoiLuong,
                          }) =>
                            new ShowtimeModel({
                              id: maLichChieu,
                              dateTime: new Date(ngayChieuGioChieu),
                              price: giaVe,
                              duration: thoiLuong,
                            })
                        ) ?? [],
                    })
                ) ?? [],
            })
        ) ?? [];

      const movieModel = new MovieModel({
        id: movieDetailResp?.maPhim?.toString() ?? "",
        groupId: movieDetailResp?.maNhom ?? "",
        title: movieDetailResp?.tenPhim ?? "",
        slug: movieDetailResp?.biDanh ?? "",
        trailerUrl: movieDetailResp?.trailer ?? "",
        posterUrl: movieDetailResp?.hinhAnh,
        description: movieDetailResp?.moTa,
        releaseDate: movieDetailResp?.ngayKhoiChieu
          ? new Date(movieDetailResp.ngayKhoiChieu)
          : null,
        rating: movieDetailResp?.danhGia ?? 0,
        cinemas: cinemaModels,
      });

      return {
        data: {
          movie: movieModel,
        },
      };
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "MovieDetailPage.getMovieDetail",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }

  getShowTimes(): ShowtimeModel[] {
    return (
      this.movieModel?.cinemas?.flatMap((cinema) =>
        cinema.clusters?.flatMap((cluster) => cluster.showtimes)
      ) ?? []
    );
  }
}
