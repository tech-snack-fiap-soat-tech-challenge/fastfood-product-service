import { ProductEntity } from '@app/product/core/domain/entities/product.entity';

export class CreateProductCommand
  implements
    Pick<
      ProductEntity,
      'name' | 'description' | 'categoryId' | 'price' | 'stockQuantity'
    >
{
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public stockQuantity: number,
    public categoryId: number,
    public imageUrl: string,
  ) {}

  toProductEntity(): ProductEntity {
    const product = ProductEntity.createInstance({
      name: this.name,
      description: this.description,
      price: this.price,
      stockQuantity: this.stockQuantity,
      categoryId: this.categoryId,
      imageUrl: this.imageUrl,
    });
    return product;
  }
}
