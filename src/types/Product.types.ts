export interface IProductItems {
  id: number;
  title: string;
  price: number;
  description: string;
}

export interface IProductItemsState {
  items: IProductItems[];
}
