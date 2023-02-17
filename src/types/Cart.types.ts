export interface ICartItemType {
  id: number;
  title: string;
  quantity: number;
  total: number;
  price: number;
}

export interface ICartItemState {
  items: Array<ICartItemType> | Array<any>;
  showCart: boolean;
}

export interface ICartItemPayload {
  items?: ICartItemType;
  itemID?: number;
}
