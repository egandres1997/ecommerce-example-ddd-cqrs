import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Product } from '../../domainmodel/product';
import { TypeormProductRepository } from '../persistence/product-repository';
import { GetProductController } from './controllers/get-product.controller';
import { GetProductByIdQueryHandler } from '../../application/query/get-product-by-id/get-product-by-id.query.handler';
import { PostProductController } from './controllers/post-product.controller';
import { CreateProductCommandHandler } from '../../application/command/create-product/create-product.command.handler';
import { EnableProductController } from './controllers/enable-product.controller';
import { EnableProductCommandHandler } from 'src/products/application/command/enable-product/enable-product.command.handler';

const controllers = [
  GetProductController,
  PostProductController,
  EnableProductController,
];

const cqrsHandlers = [
  GetProductByIdQueryHandler,
  CreateProductCommandHandler,
  EnableProductCommandHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CqrsModule],
  controllers,
  providers: [
    TypeormProductRepository,
    {
      provide: 'PRODUCTS_REPOSITORY',
      useExisting: TypeormProductRepository,
    },
    ...cqrsHandlers,
  ],
})
export class ProductsNestjsModule {}
