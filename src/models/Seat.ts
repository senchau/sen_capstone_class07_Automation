type TSeatKind = "Regular" | "Vip";

type TSeat = {
  id: string;
  cinemaId: string;
  userId: string;
  order: number;
  seatName: string;
  seatType: TSeatKind;
  price: number;
  isBooked: boolean;
};

export class SeatModel {
  public id: string;
  public cinemaId: string;
  public userId: string;
  public order: number;
  public seatName: string;
  public seatType: TSeatKind;
  public price: number;
  public isBooked: boolean;

  constructor({
    id,
    cinemaId,
    userId,
    order,
    seatName,
    seatType,
    price,
    isBooked,
  }: TSeat) {
    this.id = id;
    this.cinemaId = cinemaId;
    this.userId = userId;
    this.order = order;
    this.seatName = seatName;
    this.seatType = seatType;
    this.price = price;
    this.isBooked = isBooked;
  }
}
