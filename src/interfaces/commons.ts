import { Locator } from "@playwright/test";
import { TLocale } from "../types/locale";

export interface IGoInput {
  id?: string;
  locale: TLocale;
}

export interface IBaseOutput<T> {
  data: T | null;
  errorMessage?: string;
}

export interface IGetOptionsOptionsResp {
  locator: Locator;
  value: string;
  label: string;
}

export interface IGetOptionsResp {
  options: IGetOptionsOptionsResp[];
}

export interface IGetModalDataResp {
  title: string;
  content: string;
  ok: () => Promise<void>
  cancel: () => Promise<void>
}
