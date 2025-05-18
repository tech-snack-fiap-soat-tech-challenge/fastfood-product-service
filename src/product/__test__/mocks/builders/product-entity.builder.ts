import { ProductEntity } from '@app/product/core/domain/entities/product.entity';
import { CategoryEntity } from '@app/product/core/domain/entities/category.entity';

export class ProductEntityBuilder {
  private product: ProductEntity;

  constructor() {
    this.product = new ProductEntity();
    this.product.id = 1;
    this.product.name = 'Default Product';
    this.product.description = 'Default Description';
    this.product.price = 10.0;
    this.product.stockQuantity = 100;
    this.product.categoryId = 1;
    this.product.imageUrl = 'http://example.com/image.png';
    this.product.isActive = true;
    this.product.createdAt = new Date();
    this.product.updatedAt = new Date();
    this.product.category = this.defaultCategory();
  }

  private defaultCategory(): CategoryEntity {
    const category = new CategoryEntity();
    category.id = 1;
    category.name = 'Default Category';
    category.description = 'Default Category Description';
    category.createdAt = new Date();
    category.updatedAt = new Date();
    return category;
  }

  withId(id: number): ProductEntityBuilder {
    this.product.id = id;
    return this;
  }

  withName(name: string): ProductEntityBuilder {
    this.product.name = name;
    return this;
  }

  withDescription(description: string): ProductEntityBuilder {
    this.product.description = description;
    return this;
  }

  withPrice(price: number): ProductEntityBuilder {
    this.product.price = price;
    return this;
  }

  withStockQuantity(stockQuantity: number): ProductEntityBuilder {
    this.product.stockQuantity = stockQuantity;
    return this;
  }

  withCategoryId(categoryId: number): ProductEntityBuilder {
    this.product.categoryId = categoryId;
    return this;
  }

  withImageUrl(imageUrl: string): ProductEntityBuilder {
    this.product.imageUrl = imageUrl;
    return this;
  }

  withIsActive(isActive: boolean): ProductEntityBuilder {
    this.product.isActive = isActive;
    return this;
  }

  withCategory(category: CategoryEntity): ProductEntityBuilder {
    this.product.category = category;
    return this;
  }

  build(): ProductEntity {
    return this.product;
  }
}
