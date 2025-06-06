import { ProductEntity } from '@app/product/core/domain/entities/product.entity';

export class UpdateProductCommand {
  constructor(
    public productId: number,
    public productData: Partial<
      Pick<
        ProductEntity,
        | 'name'
        | 'description'
        | 'categoryId'
        | 'price'
        | 'stockQuantity'
        | 'imageUrl'
      >
    >,
  ) {}
}
