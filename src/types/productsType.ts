export interface IProducts {
  name: string;
  price: number;
  timeStamp: string;
  catagory: string;
  description: string;
  discountPercent: number;
  features: string[];
  id: number | string;
  imageUrls: string[];
  inStock: boolean;
  count: number;
}
