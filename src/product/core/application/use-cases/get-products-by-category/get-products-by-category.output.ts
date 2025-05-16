import { ProductEntity } from '@app/product/core/domain/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProductItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  imageUrl: string;
}

export class GetProductsByCategoryOutput {
  products: ProductItem[];

  constructor(entities: ProductEntity[]) {
    this.products = entities.map((entity) => ({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      category: entity.category.name,
      imageUrl: entity.imageUrl,
    }));
  }
}
