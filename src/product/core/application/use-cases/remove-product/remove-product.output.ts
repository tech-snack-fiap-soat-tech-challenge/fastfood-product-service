import { ProductEntity } from '@app/product/core/domain/entities/product.entity';
import { ProductOutput } from '../../dtos/product.output';

export class RemoveProductOutput {
  removedProduct: ProductOutput;
  constructor(product: ProductEntity) {
    this.removedProduct = new ProductOutput(product);
  }
}
