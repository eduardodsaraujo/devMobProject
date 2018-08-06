
export class CartItem {
  constructor(public productItem: any, public quantity: number = 1) { }

  value(): number {
    return this.productItem.price * this.quantity;
  }
}