import { Product } from '../../../domainmodel/product';

export class CreateProductCommand {
  constructor(readonly aProduct: Partial<Product>) {}
}
