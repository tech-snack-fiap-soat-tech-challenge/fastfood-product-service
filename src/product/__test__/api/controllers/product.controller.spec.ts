import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '@app/product/api/controllers/product.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '@app/product/core/application/use-cases/create-product/create-product.command';
import { CreateProductOutput } from '@app/product/core/application/use-cases/create-product/create-product.output';
import { RemoveProductCommand } from '@app/product/core/application/use-cases/remove-product/remove-product.command';
import { RemoveProductOutput } from '@app/product/core/application/use-cases/remove-product/remove-product.output';
import { UpdateProductCommand } from '@app/product/core/application/use-cases/update-product/update-product.command';
import { UpdateProductOutput } from '@app/product/core/application/use-cases/update-product/update-product.output';
import { GetProductsByCategoryQuery } from '@app/product/core/application/use-cases/get-products-by-category/get-products-by-category.query';
import { GetProductsByCategoryOutput } from '@app/product/core/application/use-cases/get-products-by-category/get-products-by-category.output';
import { GetProductByIdQuery } from '@app/product/core/application/use-cases/get-product-by-id/get-product-by-id.query';
import { GetProductByIdOutput } from '@app/product/core/application/use-cases/get-product-by-id/get-product-by-id.output';
import { ProductEntityBuilder } from '@app/product/__test__/mocks/builders/product-entity.builder';
import { ProductOutput } from '@app/product/core/application/dtos/product.output';
import { mock, MockProxy } from 'jest-mock-extended';

describe('ProductController', () => {
  let controller: ProductController;
  let commandBus: MockProxy<CommandBus>;
  let queryBus: MockProxy<QueryBus>;

  beforeEach(async () => {
    commandBus = mock<CommandBus>();
    queryBus = mock<QueryBus>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  describe('Given there are products for a category', () => {
    describe('When getProductsByCategory is called', () => {
      it('should return the products from the query bus', async () => {
        // Arrange
        const mockProducts = [new ProductEntityBuilder().build()];
        const output = new GetProductsByCategoryOutput(mockProducts);
        jest.spyOn(queryBus, 'execute').mockResolvedValue(output);

        // Act
        const result = await controller.getProductsByCategory(1);

        // Assert
        expect(queryBus.execute).toHaveBeenCalledWith(
          new GetProductsByCategoryQuery(1),
        );
        expect(result).toEqual(output.products);
      });
    });
  });

  describe('Given a valid product creation request', () => {
    describe('When createProduct is called', () => {
      it('should return the created product from the command bus', async () => {
        // Arrange
        const mockProduct = new ProductEntityBuilder().build();
        const output = new CreateProductOutput(mockProduct);
        jest.spyOn(commandBus, 'execute').mockResolvedValue(output);

        // Act
        const result = await controller.createProduct({
          name: mockProduct.name,
          description: mockProduct.description,
          price: mockProduct.price,
          stockQuantity: mockProduct.stockQuantity,
          categoryId: mockProduct.categoryId,
          imageUrl: mockProduct.imageUrl,
        });

        // Assert
        expect(commandBus.execute).toHaveBeenCalled();
        expect(result).toEqual(output.product);
      });
    });
  });

  describe('Given there is a product to be returned by id', () => {
    describe('When getProductById is called', () => {
      it('should return the product from the query bus', async () => {
        // Arrange
        const mockProduct = new ProductEntityBuilder().build();
        const output = new GetProductByIdOutput(mockProduct);
        jest.spyOn(queryBus, 'execute').mockResolvedValue(output);

        // Act
        const result = await controller.getProductById(mockProduct.id);

        // Assert
        expect(queryBus.execute).toHaveBeenCalledWith(
          new GetProductByIdQuery(mockProduct.id),
        );
        expect(result).toEqual(output.product);
      });
    });
  });

  describe('Given a valid product update request', () => {
    describe('When updateProduct is called', () => {
      it('should return the updated product from the command bus', async () => {
        // Arrange
        const mockProduct = new ProductEntityBuilder().build();
        const output = new UpdateProductOutput(mockProduct);
        jest.spyOn(commandBus, 'execute').mockResolvedValue(output);

        // Act
        const result = await controller.updateProduct(mockProduct.id, {
          name: mockProduct.name,
          description: mockProduct.description,
          price: mockProduct.price,
          stockQuantity: mockProduct.stockQuantity,
          categoryId: mockProduct.categoryId,
          imageUrl: mockProduct.imageUrl,
        });

        // Assert
        expect(commandBus.execute).toHaveBeenCalled();
        expect(result).toEqual(output.product);
      });
    });
  });

  describe('Given a valid product id for removal', () => {
    describe('When disableProduct is called', () => {
      it('should return the removed product from the command bus', async () => {
        // Arrange
        const mockProduct = new ProductEntityBuilder().build();
        const output = new RemoveProductOutput(mockProduct);
        jest.spyOn(commandBus, 'execute').mockResolvedValue(output);

        // Act
        const result = await controller.disableProduct(mockProduct.id);

        // Assert
        expect(commandBus.execute).toHaveBeenCalledWith(
          new RemoveProductCommand(mockProduct.id),
        );
        expect(result).toEqual(output.removedProduct);
      });
    });
  });
});
