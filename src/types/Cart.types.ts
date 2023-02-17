export interface ICartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ICartNotifcationPayload {
  status: string;
  title: string;
  message: string;
}

export interface ICartItemState {
  items: Array<ICartItem> | Array<any>;
  showCart: boolean;
  notification: ICartNotifcationPayload | null;
}

export interface ICartItemPayload {
  items?: ICartItem;
  itemID?: number;
  notification?: ICartNotifcationPayload | null;
}
