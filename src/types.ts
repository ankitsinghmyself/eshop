// types.ts
export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface AddToCartProps {
    data: {
      id: number;
      name: string;
      price: number;
      quantity: number;
    };
  }