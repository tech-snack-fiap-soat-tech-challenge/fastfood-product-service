import { IProductRepository } from '@app/product/core/domain/interfaces/repositories/product-repository.interface';
import { GetProductByIdQuery } from './get-product-by-id.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductByIdOutput } from './get-product-by-id.output';
import { Inject } from '@nestjs/common';

@QueryHandler(GetProductByIdQuery)
export class GetProductsByIdHandler
  implements IQueryHandler<GetProductByIdQuery, GetProductByIdOutput>
{
  constructor(
    @Inject(IProductRepository) private productRepository: IProductRepository,
  ) {}
  async execute(query: GetProductByIdQuery): Promise<GetProductByIdOutput> {
    const { id } = query;
    const products = await this.productRepository.getById(id);

    return new GetProductByIdOutput(products);
  }
}
