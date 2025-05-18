import { RemoveProductHandler } from '@app/product/core/application/use-cases/remove-product/remove-product.handler';
import { RemoveProductCommand } from '@app/product/core/application/use-cases/remove-product/remove-product.command';
import { RemoveProductOutput } from '@app/product/core/application/use-cases/remove-product/remove-product.output';
import { IProductRepository } from '@app/product/core/domain/interfaces/repositories/product-repository.interface';
import { mock, MockProxy } from 'jest-mock-extended';
import { ProductEntityBuilder } from '@app/product/__test__/mocks/builders/product-entity.builder';

describe('RemoveProductHandler', () => {
  let handler: RemoveProductHandler;
  let productRepository: MockProxy<IProductRepository>;

  beforeEach(() => {
    productRepository = mock<IProductRepository>();
    handler = new RemoveProductHandler(productRepository);
  });

  describe('Given there is a product to be removed', () => {
    describe('When execute is called', () => {
      it('should disable the product and update it in the repository, returning RemoveProductOutput', async () => {
        // Arrange
        const mockProduct = new ProductEntityBuilder().build();
        const command = new RemoveProductCommand(mockProduct.id);

        jest.spyOn(productRepository, 'getById').mockResolvedValue(mockProduct);
        jest.spyOn(productRepository, 'update').mockResolvedValue(mockProduct);
        jest.spyOn(mockProduct, 'disableProduct');

        // Act
        const result = await handler.execute(command);

        // Assert
        expect(productRepository.getById).toHaveBeenCalledWith(mockProduct.id);
        expect(mockProduct.disableProduct).toHaveBeenCalled();
        expect(productRepository.update).toHaveBeenCalledWith(mockProduct);
        expect(result).toBeInstanceOf(RemoveProductOutput);
        expect(result.removedProduct.isActive).toBe(false);
      });
    });
  });

  describe('Given the product does not exist in the repository', () => {
    describe('When execute is called', () => {
      it('should throw an error', async () => {
        // Arrange
        const command = new RemoveProductCommand(999);
        jest.spyOn(productRepository, 'getById').mockResolvedValue(undefined);

        // Act & Assert
        await expect(handler.execute(command)).rejects.toThrow(
          'Product 999 not found',
        );
        expect(productRepository.getById).toHaveBeenCalledWith(999);
      });
    });
  });
});
