export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type Order = {
  id: number;
  customer: Customer;
  orderDate: string;
  orderCode: string;
  status: string;
  total: number;
  deliveryAddress: string;
  items: {
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
};

export type OrderHistory = {
  id: number;
  order: Order;
  status: string;
  createdAt: Date;
};
