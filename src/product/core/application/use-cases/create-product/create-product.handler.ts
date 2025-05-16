import { IProductRepository } from '@app/product/core/domain/interfaces/repositories/product-repository.interface';
import { CreateProductCommand } from './create-product.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductOutput } from './create-product.output';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand, CreateProductOutput>
{
  constructor(
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(command: CreateProductCommand): Promise<CreateProductOutput> {
    const product = command.toProductEntity();

    const createdProduct = await this.productRepository.create(product);

    return new CreateProductOutput(createdProduct);
  }
}
