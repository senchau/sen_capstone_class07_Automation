import { CinemaModel } from "./Cinema";

type TMovie = {
  id: string;
  groupId: string;
  title: string;
  slug: string;
  trailerUrl: string;
  posterUrl: string;
  description: string;
  releaseDate: Date | null;
  rating: number;
  cinemas?: CinemaModel[];
};

export class MovieModel {
  public id: string;
  public groupId: string;
  public title: string;
  public slug: string;
  public trailerUrl: string;
  public posterUrl: string;
  public description: string;
  public releaseDate: Date | null;
  public rating: number;
  public cinemas?: CinemaModel[];

  constructor({
    id,
    groupId,
    title,
    slug,
    trailerUrl,
    posterUrl,
    description,
    releaseDate,
    rating,
    cinemas,
  }: TMovie) {
    this.id = id;
    this.groupId = groupId;
    this.title = title;
    this.slug = slug;
    this.trailerUrl = trailerUrl;
    this.posterUrl = posterUrl;
    this.description = description;
    this.releaseDate = releaseDate;
    this.rating = rating;
    this.cinemas = cinemas || [];
  }
}
