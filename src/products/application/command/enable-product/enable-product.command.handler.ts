import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../../../domainmodel/product-repository';
import { Inject } from '@nestjs/common';
import { EnableProductCommand } from './enable-product.command';
import { ProductWasNotFound } from 'src/products/domainmodel/product-was-not-found';

@CommandHandler(EnableProductCommand)
export class EnableProductCommandHandler
  implements IQueryHandler<EnableProductCommand>
{
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute({ id }: EnableProductCommand): Promise<void> {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw ProductWasNotFound.withIdOf(id);
    }

    product.enable();

    await this.productRepository.updateById(id, product);
  }
}
