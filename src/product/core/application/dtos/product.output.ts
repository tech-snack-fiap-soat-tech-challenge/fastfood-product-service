import { ProductEntity } from '@app/product/core/domain/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProductOutput {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stockQuantity: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  categoryName: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  constructor(entity: ProductEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
    this.price = entity.price;
    this.stockQuantity = entity.stockQuantity;
    this.categoryId = entity.category.id;
    this.categoryName = entity.category.name;
    this.imageUrl = entity.imageUrl;
    this.isActive = entity.isActive;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
