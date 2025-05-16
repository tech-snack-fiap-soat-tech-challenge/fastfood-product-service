import { ProductEntity } from '@app/product/core/domain/entities/product.entity';
import { ProductOutput } from '../../dtos/product.output';

export class CreateProductOutput {
  product: ProductOutput;
  constructor(entity: ProductEntity) {
    this.product = new ProductOutput(entity);
  }
}
