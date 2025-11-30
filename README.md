# MyStore 🛒

MyStore is a single-page e-commerce application built with Angular.  
Users can browse products, view product details, add items to a shopping cart, fill out a checkout form, and see an order confirmation screen.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) (v14.2.4) and follows the Udacity **MyStore** project rubric.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Build](#build)
  - [Tests](#tests)
- [Data & API](#data--api)
- [Application Design](#application-design)
  - [Components](#components)
  - [Models](#models)
  - [Services & Data Flow](#services--data-flow)
  - [Routing](#routing)
  - [Forms & Validation](#forms--validation)
- [Rubric Mapping](#rubric-mapping)
- [Future Improvements](#future-improvements)

---

## Features

- **Product List Page**
  - Fetches a list of products from `assets/data.json`.
  - Displays product image, name, price, and description.
  - Allows selecting a quantity and adding products to the cart.

- **Product Detail Page**
  - Shows additional details for a selected product.
  - Allows setting quantity and adding the product to the cart from the detail page.

- **Shopping Cart**
  - Displays all items added to the cart, including name, unit price, quantity, and subtotal.
  - Shows the **total cost** of all products in the cart.
  - Allows updating quantities and removing items.

- **Checkout Form**
  - Collects customer information (name, address, credit card).
  - Validates input fields on the client side.
  - On successful submit, clears the cart and navigates to the confirmation page.

- **Order Confirmation Page**
  - Displays a personalized thank-you message and the order total.
  - Provides a link back to the product list.

---

## Tech Stack

- **Framework:** Angular (Angular CLI 14)
- **Language:** TypeScript
- **UI:** Angular templates + component CSS + global `styles.css`
- **HTTP:** Angular `HttpClient` (for loading JSON data)
- **Forms:** Template-driven forms with `FormsModule`
- **Routing:** Angular Router (single-page application navigation)

---

## Project Structure

High-level structure (only main folders shown):

```text
src/
  app/
    components/
      product-list/
      product-item/
      product-item-detail/
      cart/
      checkout/
      confirmation/
    layout/
      header/
    models/
      product.ts
      cart-item.ts
    services/
      product.service.ts
      cart.service.ts
    app-routing.module.ts
    app.module.ts
    app.component.ts
    app.component.html
  assets/
    data.json
  styles.css
```

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- Angular CLI (v14 recommended), globally or via `npx`:

```bash
npm install -g @angular/cli
```

### Installation

From the project root:

```bash
npm install
```

### Development Server

```bash
ng serve
```

Open your browser at [http://localhost:4200](http://localhost:4200).  
The application will automatically reload when you change any of the source files.

### Build

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

### Tests

- **Unit tests** (if configured):

  ```bash
  ng test
  ```

- **End-to-end tests** can be added with your preferred e2e framework.

---

## Data & API

The application uses a static JSON data file to simulate product data:

- **File:** `src/assets/data.json`
- **Loaded via:** Angular `HttpClient` in `ProductService`
- **Usage:**
  - `GET assets/data.json` → list of products
  - Each product includes `id`, `name`, `price`, `description`, and `url` (image path or URL)

You can replace `data.json` with a real API endpoint if desired.

---

## Application Design

### Components

- **`ProductListComponent`**
  - Main landing page (`/`).
  - Fetches and displays the list of products using `ProductService`.
  - Uses `*ngFor` to render each product via `ProductItemComponent`.
  - Handles `addToCart` events and forwards them to `CartService`.

- **`ProductItemComponent`**
  - Displays a single product card.
  - Accepts a `Product` via `@Input()`.
  - Uses a template-driven form to select quantity.
  - Emits `addToCart` events via `@Output()` `EventEmitter<number>`.
  - Links to the detail page using `routerLink="/products/:id"`.

- **`ProductItemDetailComponent`**
  - Detail page for a single product (`/products/:id`).
  - Fetches the product by ID using `ProductService`.
  - Allows changing quantity and adding to cart.

- **`CartComponent`**
  - Cart page (`/cart`).
  - Reads full cart state from `CartService`.
  - Displays each cart item and total cost.
  - Allows quantity updates and removing items.

- **`CheckoutComponent`**
  - Checkout page (`/checkout`).
  - Template-driven form for name, address, and credit card.
  - Validates inputs and, on submit, clears the cart and navigates to confirmation with order details.

- **`ConfirmationComponent`**
  - Order confirmation page (`/confirmation`).
  - Receives `customerName` and `total` via router navigation state.
  - Displays success message and a link back to the product list.

- **`HeaderComponent`**
  - Layout/header/navigation.
  - Uses `routerLink` to navigate between product list and cart without full page reload.

### Models

- **`Product`**
  - `id: number`
  - `name: string`
  - `price: number`
  - `description: string`
  - `url: string` (image URL)

- **`CartItem`**
  - `product: Product`
  - `quantity: number`

These models are used throughout components and services for type safety.

### Services & Data Flow

- **`ProductService`**
  - Responsible for fetching product data from `assets/data.json`.
  - Methods:
    - `getProducts(): Observable<Product[]>`
    - `getProduct(id: number): Observable<Product | undefined>`

- **`CartService`**
  - Central store for cart state.
  - Provided at root level (`providedIn: 'root'`) and injected into multiple components.
  - Methods:
    - `getItems(): CartItem[]`
    - `addToCart(product: Product, quantity: number)`
    - `updateQuantity(productId: number, quantity: number)`
    - `removeFromCart(productId: number)`
    - `clearCart()`
    - `getTotal(): number`
  - (Optional) Can persist data to `localStorage` for cart survival across refreshes.

**Data flow examples:**

- `ProductListComponent` → `ProductItemComponent`
  - `@Input() product` passes product down.
  - `@Output() addToCart` emits quantity up.

- `ProductListComponent` / `ProductItemDetailComponent` → `CartService` → `CartComponent`
  - Both add to the same cart service instance.
  - `CartComponent` reads from `CartService.getItems()`.

### Routing

Configured in `AppRoutingModule`:

- `/` → `ProductListComponent`
- `/products/:id` → `ProductItemDetailComponent`
- `/cart` → `CartComponent`
- `/checkout` → `CheckoutComponent`
- `/confirmation` → `ConfirmationComponent`
- Unknown paths → redirect to `/`

Templates use:

- `<router-outlet>` in `AppComponent` to host routed views.
- `routerLink` for navigation (e.g. Products, Cart, Checkout).

The app behaves as a single-page application: navigation does not reload the page.

### Forms & Validation

The app uses **template-driven forms** via `FormsModule`:

- **Quantity inputs**
  - `[(ngModel)]` binds form values to component properties.
  - Handled in product item and detail components.

- **Checkout form (`CheckoutComponent`)**
  - Collects `name`, `address`, `creditCard`.
  - Uses template references and Angular validation:
    - `required`
    - `minlength` / `maxlength` (e.g. 16-digit credit card)
  - Submit button is disabled until the form is valid.

---

## Rubric Mapping

This section explains how the project aligns with the Udacity MyStore rubric:

- **Scaffold & Configure SPA**
  - Generated with Angular CLI.
  - `npm install` + `ng serve` are enough to run the project.

- **Documentation (README)**
  - This file includes project description and installation/run instructions.

- **Organize & Write Clean Code**
  - Components, models, and services are placed in clear folders.
  - Code uses TypeScript interfaces and Angular style conventions.

- **Design for User Experience**
  - Cart page shows a total cost.
  - Input forms are validated (checkout form).
  - Feedback is shown when products are added to the cart (e.g. alerts).
  - Product pages show image, name, price, description.
  - Items can be removed from the cart.
  - A confirmation page is shown after successful checkout.

- **Use CSS to Style Application**
  - Each component has a dedicated `.component.css` file.
  - Global styles in `src/styles.css` provide consistent base styling.

- **Fetch and Use Data**
  - Products are loaded from `assets/data.json` using `HttpClient`.

- **Logical Component Hierarchy**
  - Parent–child relationships: `ProductListComponent` → `ProductItemComponent`.
  - Siblings (e.g., product list and cart) share state via services, not direct dependency.

- **Collect User Input with Controlled Form Elements**
  - Template-driven forms with `[(ngModel)]` for quantity and checkout fields.

- **Use Angular Event Bindings**
  - `(click)` and `(ngSubmit)` used for user interactions like add-to-cart and form submission.

- **Custom TypeScript Models**
  - `Product` and `CartItem` interfaces used throughout the app.

- **Use Decorators for Data Sharing**
  - `@Input()` and `@Output()` used between `ProductListComponent` and `ProductItemComponent`.

- **Use Service for Sibling Data Sharing**
  - `CartService` shares cart data between product list/detail and cart/checkout components.

- **Routing**
  - `AppRoutingModule` is configured.
  - `routerLink` + `<router-outlet>` provide SPA navigation without full reloads.

---

## Future Improvements

- Persist cart and user data more robustly using a backend API.
- Implement authentication (e.g., Auth0) and user-specific carts/orders.
- Add unit tests for components and services.
- Add e2e tests for full purchase flow.
- Enhance styling and responsiveness for mobile devices.
- Display a cart badge in the header with item count and/or total cost.

---
