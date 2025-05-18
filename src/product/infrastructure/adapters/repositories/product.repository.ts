import { ProductEntity } from '@app/product/core/domain/entities/product.entity';
import { IProductRepository } from '@app/product/core/domain/interfaces/repositories/product-repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly orderRepository: Repository<ProductEntity>,
  ) {}

  getByCategory(categoryId: number): Promise<ProductEntity[]> {
    return this.orderRepository.find({
      where: { categoryId, isActive: true },
      relations: ['category'],
    });
  }

  getById(id: number): Promise<ProductEntity> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    const savedProduct = await this.orderRepository.save(product);
    return this.getById(savedProduct.id);
  }

  async update(product: ProductEntity): Promise<ProductEntity> {
    await this.orderRepository.save(product);
    return this.getById(product.id);
  }
}
