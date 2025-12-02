import { Locale } from "./types";

export interface IGoInput {
  id?: string;
  locale: Locale;
}

export interface IBaseOutput<T> {
  data: T | null;
  errorMessage?: string;
}

