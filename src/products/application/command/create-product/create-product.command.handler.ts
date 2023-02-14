import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../../../domainmodel/product-repository';
import { Inject } from '@nestjs/common';
import { Product } from '../../../domainmodel/product';
import { CreateProductCommand } from './create-product.command';
import { ProductAlreadyExists } from '../../../domainmodel/product-already-exists';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements IQueryHandler<CreateProductCommand>
{
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute({
    aProduct: { name, description },
  }: CreateProductCommand): Promise<void> {
    let product = await this.productRepository.getByName(name);

    if (product) {
      throw ProductAlreadyExists.withNameOf(name);
    }

    product = new Product(name, description);
    await this.productRepository.add(product);
  }
}
