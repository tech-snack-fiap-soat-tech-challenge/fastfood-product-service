import { IProductRepository } from '@app/product/core/domain/interfaces/repositories/product-repository.interface';
import { UpdateProductCommand } from './update-product.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductOutput } from './update-product.output';
import { Inject } from '@nestjs/common';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand, UpdateProductOutput>
{
  constructor(
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(command: UpdateProductCommand): Promise<UpdateProductOutput> {
    const { productId } = command;
    const product = await this.productRepository.getById(productId);

    if (!product) {
      throw new Error(`Product ${productId} not found`);
    }

    product.changeData(command.productData);
    const updatedProduct = await this.productRepository.update(product);

    return new UpdateProductOutput(updatedProduct);
  }
}
