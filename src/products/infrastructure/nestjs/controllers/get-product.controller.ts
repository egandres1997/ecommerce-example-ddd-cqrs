import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetProductByIdQuery } from '../../../application/query/get-product-by-id/get-product-by-id.query';
import { ProductWasNotFound } from '../../../domainmodel/product-was-not-found';

@Controller('products')
@ApiTags('Products')
export class GetProductController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async handleRequest(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.queryBus.execute(new GetProductByIdQuery(id));
    } catch (e) {
      if (e instanceof ProductWasNotFound) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }

      throw e;
    }
  }
}
