import { CreateProductHandler } from '@app/product/core/application/use-cases/create-product/create-product.handler';
import { CreateProductCommand } from '@app/product/core/application/use-cases/create-product/create-product.command';
import { CreateProductOutput } from '@app/product/core/application/use-cases/create-product/create-product.output';
import { IProductRepository } from '@app/product/core/domain/interfaces/repositories/product-repository.interface';
import { mock, MockProxy } from 'jest-mock-extended';
import { ProductEntityBuilder } from '@app/product/__test__/mocks/builders/product-entity.builder';
import { ProductOutput } from '@app/product/core/application/dtos/product.output';

describe('CreateProductHandler', () => {
  let handler: CreateProductHandler;
  let productRepository: MockProxy<IProductRepository>;

  beforeEach(() => {
    productRepository = mock<IProductRepository>();
    handler = new CreateProductHandler(productRepository);
  });

  describe('Given there is a valid product to be created', () => {
    describe('When execute is called', () => {
      it('should call repository.create with the correct product entity and return CreateProductOutput', async () => {
        // Arrange
        const mockCreatedProduct = new ProductEntityBuilder().build();
        const expectedProductOutput = new ProductOutput(mockCreatedProduct);
        const command = new CreateProductCommand(
          mockCreatedProduct.name,
          mockCreatedProduct.description,
          mockCreatedProduct.price,
          mockCreatedProduct.stockQuantity,
          mockCreatedProduct.categoryId,
          mockCreatedProduct.imageUrl,
        );

        jest
          .spyOn(productRepository, 'create')
          .mockResolvedValue(mockCreatedProduct);

        jest.spyOn(command, 'toProductEntity');

        // Act
        const result = await handler.execute(command);

        // Assert
        expect(command.toProductEntity).toHaveBeenCalled();
        expect(productRepository.create).toHaveBeenCalled();
        expect(result).toBeInstanceOf(CreateProductOutput);
        expect(result.product).toEqual(expectedProductOutput);
      });
    });
  });

  describe('Given there was an error creating the product in the repository', () => {
    describe('When execute is called', () => {
      it('should propagate the error', async () => {
        // Arrange
        const mockProductEntity = { name: 'Test', price: 10 };
        const command = {
          toProductEntity: jest.fn().mockReturnValue(mockProductEntity),
        } as unknown as CreateProductCommand;

        const error = new Error('Repository error');
        jest.spyOn(productRepository, 'create').mockRejectedValue(error);

        // Act & Assert
        await expect(handler.execute(command)).rejects.toThrow(
          'Repository error',
        );
        expect(productRepository.create).toHaveBeenCalledWith(
          mockProductEntity,
        );
      });
    });
  });
});
