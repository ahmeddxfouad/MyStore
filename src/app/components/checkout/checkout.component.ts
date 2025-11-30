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

  nameError: string = '';
  addressError: string = '';
  creditCardError: string = '';

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.total = this.cartService.getTotal();
  }

  onNameChange(value: string): void {
    if (!value || value.trim().length < 3) {
      this.nameError = 'Name must be at least 3 characters long.';
    } else {
      this.nameError = '';
    }
  }

  onAddressChange(value: string): void {
    if (!value || value.trim().length < 5) {
      this.addressError = 'Address must be at least 5 characters long.';
    } else {
      this.addressError = '';
    }
  }

  onCreditCardChange(value: string): void {
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length !== 16) {
      this.creditCardError = 'Credit card number must be exactly 16 digits.';
    } else {
      this.creditCardError = '';
    }
  }

  onSubmit(): void {
    // final guard, in case user tries to submit with invalid data
    if (
      this.nameError ||
      this.addressError ||
      this.creditCardError ||
      !this.name ||
      !this.address ||
      !this.creditCard
    ) {
      window.alert('Please fix validation errors before submitting.');
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
