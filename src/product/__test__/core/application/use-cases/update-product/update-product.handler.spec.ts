import { UpdateProductHandler } from '@app/product/core/application/use-cases/update-product/update-product.handler';
import { UpdateProductCommand } from '@app/product/core/application/use-cases/update-product/update-product.command';
import { UpdateProductOutput } from '@app/product/core/application/use-cases/update-product/update-product.output';
import { IProductRepository } from '@app/product/core/domain/interfaces/repositories/product-repository.interface';
import { mock, MockProxy } from 'jest-mock-extended';
import { ProductEntityBuilder } from '@app/product/__test__/mocks/builders/product-entity.builder';
import { ProductOutput } from '@app/product/core/application/dtos/product.output';

describe('UpdateProductHandler', () => {
  let handler: UpdateProductHandler;
  let productRepository: MockProxy<IProductRepository>;

  beforeEach(() => {
    productRepository = mock<IProductRepository>();
    handler = new UpdateProductHandler(productRepository);
  });

  describe('Given there is a product to be updated', () => {
    describe('When execute is called', () => {
      it('should update the product and return UpdateProductOutput', async () => {
        // Arrange
        const mockProduct = new ProductEntityBuilder().build();
        const command = new UpdateProductCommand(mockProduct.id, {
            name: 'Updated Name',
        });
        
        jest.spyOn(productRepository, 'getById').mockResolvedValue(mockProduct);
        jest.spyOn(mockProduct, 'changeData');
        jest.spyOn(productRepository, 'update').mockResolvedValue(mockProduct);
        
        // Act
        const result = await handler.execute(command);
        
        // Assert        
        expect(productRepository.getById).toHaveBeenCalledWith(mockProduct.id);
        expect(mockProduct.changeData).toHaveBeenCalledWith({
          name: 'Updated Name',
        });
        expect(productRepository.update).toHaveBeenCalledWith(mockProduct);
        expect(result).toBeInstanceOf(UpdateProductOutput);
        expect(result.product).toEqual(new ProductOutput(mockProduct));
      });
    });
  });

  describe('Given the product does not exist in the repository', () => {
    describe('When execute is called', () => {
      it('should throw an error', async () => {
        // Arrange
        const command = new UpdateProductCommand(999, { name: 'Updated Name' });
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
