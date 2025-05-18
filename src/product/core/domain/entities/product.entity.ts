import { BaseEntity } from '@common/domain/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'stock_quantity', type: 'int' })
  stockQuantity: number;

  @Column({ name: 'category_id', type: 'int' })
  categoryId: number;

  @Column({ name: 'image_url', type: 'varchar', nullable: true })
  imageUrl?: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  static createInstance(
    data: Pick<
      ProductEntity,
      | 'name'
      | 'description'
      | 'price'
      | 'stockQuantity'
      | 'categoryId'
      | 'imageUrl'
    >,
  ) {
    const product = new ProductEntity();
    product.name = data.name;
    product.description = data.description;
    product.price = data.price;
    product.stockQuantity = data.stockQuantity;
    product.categoryId = data.categoryId;
    product.imageUrl = data.imageUrl;
    product.isActive = true;
    return product;
  }

  changeData(
    data: Partial<
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
  ): void {
    const { name, description, price, stockQuantity, categoryId } = data;
    this.name = name ?? this.name;
    this.description = description ?? this.description;
    this.price = price ?? this.price;
    this.stockQuantity = stockQuantity ?? this.stockQuantity;
    this.imageUrl = data.imageUrl ?? this.imageUrl;
    this.updatedAt = new Date();
    if (categoryId) {
      this.categoryId = categoryId;
      this.category = undefined;
    }
  }

  disableProduct(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }
}
