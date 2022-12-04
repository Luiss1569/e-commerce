export default interface Product {
  id: string;
  name: string;
  price: number;
  category?: string[];
  image: string;
  qtd?: number;
}
