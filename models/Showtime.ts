type TShowtime = {
  id: string;
  dateTime: Date;
  price: number;
  duration: number;
};

export class ShowtimeModel {
  public id: string;
  public dateTime: Date;
  public price: number;
  public duration: number;

  constructor({ id, dateTime, price, duration }: TShowtime) {
    this.id = id;
    this.dateTime = dateTime;
    this.price = price;
    this.duration = duration;
  }
}
