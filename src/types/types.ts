export interface CartItem {
  id: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
}

export interface AddToCartProps {
  data: {
    id: string;
    name: string;
    price: number;
    img: string;
    quantity: number;
  };
}

export interface UserAddress {
  pinCode: any;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
export interface OrderPayload {
  items: CartItem[]; // Array of items in the order
  address: string; // Address for the order
}
export interface User {
  id: string; // Assuming id is a string
  firstName: string;
  lastName?: string; // Optional
  middleName?: string; // Optional
  birthdate?: Date; // Optional
  gender?: string; // Optional
  address?: string; // Optional
  phone?: string; // Optional
  website?: string; // Optional
  username?: string; // Optional and unique
  email?: string; // Optional and unique
  emailVerified?: Date | null; // Optional
  image?: string | null; // Optional
  isAdmin: boolean;
  password: string; // Required for creation
  createdAt?: Date; // Optional, usually set in the backend
  updatedAt?: Date; // Optional, usually set in the backend
}