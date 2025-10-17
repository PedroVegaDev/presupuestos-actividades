export interface ActivityResponse {
  global_price: number;
  debtor_list: Debtor[];
}

export interface Debtor {
  name: string;
  cash: "yape" | "cash" | "dont-payment";
  quantity: number;
  delivered: boolean;
  price_modificated?: number;
}
