import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductController } from './api/controllers/product.controller';
import { GetProductsByCategoryHandle } from './core/application/use-cases/get-products-by-category/get-products-by-category.handle';
import { CreateProductHandler } from './core/application/use-cases/create-product/create-product.handler';
import { RemoveProductHandler } from './core/application/use-cases/remove-product/remove-product.handler';
import { UpdateProductHandler } from './core/application/use-cases/update-product/update-product.handler';
import { ProductRepository } from './infrastructure/adapters/repositories/product.repository';
import { IProductRepository } from './core/domain/interfaces/repositories/product-repository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@app/product/core/domain/entities/product.entity';
import { GetProductsByIdHandler } from './core/application/use-cases/get-product-by-id/get-product-by-id.handle';

const handlers = [
  GetProductsByCategoryHandle,
  CreateProductHandler,
  UpdateProductHandler,
  RemoveProductHandler,
  GetProductsByIdHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CqrsModule],
  controllers: [ProductController],
  providers: [
    ...handlers,
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
  ],
  exports: [],
})
export class ProductModule {}
