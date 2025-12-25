import { ShowtimeModel } from "./Showtime";

type TCinemaCluster = {
  id: string;
  showtimes: ShowtimeModel[];
  name: string;
  image: string;
};

type TCinema = {
  id: string;
  clusters: CinemaClusterModel[];
  name: string;
  logo: string;
};

export class CinemaClusterModel {
  public id: string;
  public showtimes: ShowtimeModel[];
  public name: string;
  public image: string;

  constructor({ id, showtimes, name, image }: TCinemaCluster) {
    this.id = id;
    this.showtimes = showtimes;
    this.name = name;
    this.image = image;
  }
}

export class CinemaModel {
  public id: string;
  public clusters: CinemaClusterModel[];
  public name: string;
  public logo: string;

  constructor({ clusters, id, name, logo }: TCinema) {
    this.clusters = clusters;
    this.id = id;
    this.name = name;
    this.logo = logo;
  }
}
