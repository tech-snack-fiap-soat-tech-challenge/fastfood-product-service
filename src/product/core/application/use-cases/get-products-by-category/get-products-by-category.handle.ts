import { IProductRepository } from '@app/product/core/domain/interfaces/repositories/product-repository.interface';
import { GetProductsByCategoryQuery } from './get-products-by-category.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductsByCategoryOutput } from './get-products-by-category.output';
import { Inject } from '@nestjs/common';

@QueryHandler(GetProductsByCategoryQuery)
export class GetProductsByCategoryHandle
  implements
    IQueryHandler<GetProductsByCategoryQuery, GetProductsByCategoryOutput>
{
  constructor(
    @Inject(IProductRepository) private productRepository: IProductRepository,
  ) {}
  async execute(
    query: GetProductsByCategoryQuery,
  ): Promise<GetProductsByCategoryOutput> {
    const { categoryId } = query;
    const products = await this.productRepository.getByCategory(categoryId);

    return new GetProductsByCategoryOutput(products);
  }
}
