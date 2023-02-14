import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @ApiProperty()
  readonly id: number | null;

  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly is_enabled: boolean;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
