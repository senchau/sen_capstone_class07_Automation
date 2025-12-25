import { IGetOptionsOptionsResp } from "./commons";
import { MovieModel } from "../models/Movie";

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

export interface IGetMovieDetailFromMovieCardMovieResp {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
}

export interface IGetMovieDetailFromMovieCardResp {
  movies: IGetMovieDetailFromMovieCardMovieResp[];
}
