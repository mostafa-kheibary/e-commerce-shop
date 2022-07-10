export interface IProducts {
  name: string;
  price: number;
  timeStamp: { seconds: number; nanoseconds: number };
  catagory: string;
  description: string;
  discountPercent: number;
  features: string[];
  id: string;
  imageUrls: string[];
  inStock: boolean;
  quantity: number;
}
