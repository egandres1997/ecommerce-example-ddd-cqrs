import { ProductRepository } from '../../domainmodel/product-repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../domainmodel/product';

@Injectable()
export class TypeormProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly typeormProductRepository: Repository<Product>,
  ) {}

  async add(artist: Product): Promise<void> {
    await this.typeormProductRepository.save(artist);
  }

  async getById(id: number): Promise<Product | null> {
    return await this.typeormProductRepository.findOneBy({ id });
  }

  async getByName(name: string): Promise<Product | null> {
    return await this.typeormProductRepository.findOne({ where: { name } });
  }

  async updateById(id: number, product: Partial<Product>): Promise<void> {
    await this.typeormProductRepository.update(
      {
        id,
      },
      product,
    );
  }
}
