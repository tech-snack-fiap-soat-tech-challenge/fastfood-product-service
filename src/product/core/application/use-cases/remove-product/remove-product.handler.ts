import { IProductRepository } from '@app/product/core/domain/interfaces/repositories/product-repository.interface';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveProductCommand } from './remove-product.command';
import { Inject } from '@nestjs/common';
import { RemoveProductOutput } from './remove-product.output';

@CommandHandler(RemoveProductCommand)
export class RemoveProductHandler
  implements ICommandHandler<RemoveProductCommand, RemoveProductOutput>
{
  constructor(
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(command: RemoveProductCommand): Promise<RemoveProductOutput> {
    const { productId } = command;
    const product = await this.productRepository.getById(productId);

    if (!product) {
      throw new Error(`Product ${productId} not found`);
    }

    product.disableProduct();
    const disabledProduct = await this.productRepository.update(product);

    return new RemoveProductOutput(disabledProduct);
  }
}
