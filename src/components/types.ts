// Assuming your types.ts file looks like this




export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    quantity?: number; // Add quantity property to Product type
  }
  
  
  export interface ProductInterface {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    quantity: 0;
  }
  
  export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber?: string;
    company?: string;
    isDefault?: boolean; // Indicates if this address is the default shipping/billing address
    instructions?: string; // Delivery instructions, if any
    landmark?: string; // Nearby landmark
  }
  export interface WishlistItem {
    id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }


  export interface Address {
    street: string;
    firstName: string;
    lastName: string;
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
    alternatePhone: string;
  }
  export interface OrderDetails {
    orderId: string;
    address: string;
    totalPrice: number;
  }
// types.ts

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  street: string;
  state: string;
  alternatePhone: string;
}






export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  quantity?: number;
}

export interface CartState {
  cartItems: Product[];
}

export interface UpdateCartItemPayload {
  productId: number;
  newQuantity: number;
}

export interface RootState {
  cart: CartState;
}
