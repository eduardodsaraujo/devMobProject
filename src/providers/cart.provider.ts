import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item';

@Injectable()
export class CartProvider {
  items: CartItem[] = [];

  constructor() {
  }

  addItem(item: CartItem) {
    this.items.push(item);
  }

  removeQuantityItem(item: CartItem) {
    this.items.find(i => i == item).quantity--;
  }

  addQuantityItem(item: CartItem) {
    this.items.find(i => i == item).quantity++;
  }

  removeItem(item: CartItem) {
    this.items = this.items.filter(i => i != item);
  }

  removeAllItems() {
    this.items = [];
  }

  getItems() {
    return this.items;
  }
}