import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  name: string = '';
  address: string = '';
  creditCard: string = '';
  total: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.total = this.cartService.getTotal();
  }

  onSubmit(): void {
    if (!this.name || !this.address || !this.creditCard) {
      window.alert('Please fill in all fields.');
      return;
    }

    const orderTotal = this.cartService.getTotal();
    const customerName = this.name;

    this.cartService.clearCart();

    this.router.navigate(['/confirmation'], {
      state: {
        customerName,
        total: orderTotal
      }
    });
  }
}
