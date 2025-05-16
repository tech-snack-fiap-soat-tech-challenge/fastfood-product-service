import { ProductEntity } from '@app/product/core/domain/entities/product.entity';

export interface IProductRepository {
  getById(id: number): Promise<ProductEntity>;
  getByCategory(categoryId: number): Promise<ProductEntity[]>;
  create(product: ProductEntity): Promise<ProductEntity>;
  update(product: ProductEntity): Promise<ProductEntity>;
}

export const IProductRepository = Symbol('IProductRepository');
