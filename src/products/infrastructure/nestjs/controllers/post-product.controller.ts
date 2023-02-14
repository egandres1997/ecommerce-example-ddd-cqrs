import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '../../../application/command/create-product/create-product.command';
import { ProductDto } from '../dtos/product.dto';
import { ProductAlreadyExists } from '../../../domainmodel/product-already-exists';

@Controller('products')
@ApiTags('Products')
export class PostProductController {
  constructor(readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async handleRequest(@Body() body: ProductDto) {
    try {
      return this.commandBus.execute(new CreateProductCommand(body));
    } catch (e) {
      if (e instanceof ProductAlreadyExists) {
        throw new HttpException(e.message, HttpStatus.CONFLICT);
      }

      throw e;
    }
  }
}
