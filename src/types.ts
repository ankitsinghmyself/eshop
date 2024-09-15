// types.ts
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface AddToCartProps {
    data: {
      id: string;
      name: string;
      price: number;
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
  address: string;   // Address for the order
}