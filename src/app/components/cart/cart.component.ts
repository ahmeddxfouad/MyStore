import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  onQuantityChange(item: CartItem, event: any): void {
    const value = +event.target.value;
    this.cartService.updateQuantity(item.product.id, value);
    this.loadCart();
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.product.id);
    this.loadCart();
  }
}
