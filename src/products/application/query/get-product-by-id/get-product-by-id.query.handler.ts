import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductByIdQuery } from './get-product-by-id.query';
import { ProductRepository } from '../../../domainmodel/product-repository';
import { Inject } from '@nestjs/common';
import { Product } from 'src/products/domainmodel/product';
import { ProductWasNotFound } from 'src/products/domainmodel/product-was-not-found';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdQueryHandler
  implements IQueryHandler<GetProductByIdQuery>
{
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute({ id }: GetProductByIdQuery): Promise<Product> {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw ProductWasNotFound.withIdOf(id);
    }

    return product;
  }
}
