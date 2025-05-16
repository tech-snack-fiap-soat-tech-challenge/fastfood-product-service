import { ProductEntity } from '@app/product/core/domain/entities/product.entity';
import { ProductOutput } from '../../dtos/product.output';

export class GetProductByIdOutput {
  product: ProductOutput;

  constructor(entity: ProductEntity) {
    this.product = new ProductOutput(entity);
  }
}
