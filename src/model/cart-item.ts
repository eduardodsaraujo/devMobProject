
export class CartItem {
  total: number;
  constructor(public productItem: any, public quantity: number = 1) {
    this.total = productItem.price * quantity;
  }

  value(): number {
    return this.productItem.price * this.quantity;
  }

}