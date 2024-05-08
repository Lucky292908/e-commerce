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
