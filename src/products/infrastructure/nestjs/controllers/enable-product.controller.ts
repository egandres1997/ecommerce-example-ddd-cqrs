import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { EnableProductCommand } from '../../../application/command/enable-product/enable-product.command';
import { ProductWasNotFound } from '../../../domainmodel/product-was-not-found';

@Controller('products')
@ApiTags('Products')
export class EnableProductController {
  constructor(readonly commandBus: CommandBus) {}

  @Patch(':id/enable')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  async handleRequest(@Param('id') id: number) {
    try {
      return this.commandBus.execute(new EnableProductCommand(id));
    } catch (e) {
      if (e instanceof ProductWasNotFound) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }

      throw e;
    }
  }
}
