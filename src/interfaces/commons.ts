import { TLocale } from "../types/locale";

export interface IGoInput {
  id?: string;
  locale: TLocale;
}

export interface IBaseOutput<T> {
  data: T | null;
  errorMessage?: string;
}
