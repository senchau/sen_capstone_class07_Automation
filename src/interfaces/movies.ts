import { MovieModel } from "../models/Movie";

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
