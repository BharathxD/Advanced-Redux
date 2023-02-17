export interface ICartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ICartItemState {
  items: Array<ICartItem> | Array<any>;
  showCart: boolean;
}

export interface ICartItemPayload {
  items?: ICartItem;
  itemID?: number;
}
