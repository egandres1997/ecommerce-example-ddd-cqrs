import { Product } from './product';

export interface ProductRepository {
  add(product: Product): Promise<void>;
  getById(id: number): Promise<Product | null>;
  getByName(name: string): Promise<Product | null>;
  updateById(id: number, product: Partial<Product>): Promise<void>;
}
