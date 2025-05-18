import { ProductEntityBuilder } from '@app/product/__test__/mocks/builders/product-entity.builder';
import { ProductOutput } from '@app/product/core/application/dtos/product.output';
import { GetProductsByIdHandler } from '@app/product/core/application/use-cases/get-product-by-id/get-product-by-id.handle';
import { GetProductByIdOutput } from '@app/product/core/application/use-cases/get-product-by-id/get-product-by-id.output';
import { GetProductByIdQuery } from '@app/product/core/application/use-cases/get-product-by-id/get-product-by-id.query';
import { IProductRepository } from '@app/product/core/domain/interfaces/repositories/product-repository.interface';
import { mock, MockProxy } from 'jest-mock-extended';

describe('GetProductsByIdHandler', () => {
  let handler: GetProductsByIdHandler;
  let productRepository: MockProxy<IProductRepository>;

  beforeEach(() => {
    productRepository = mock<IProductRepository>();
    handler = new GetProductsByIdHandler(productRepository);
  });

  describe('Given there is a product to be returned from the database', () => {
    describe('When execute is called', () => {
      it('should call repository.getById with the correct id and return GetProductByIdOutput', async () => {
        // Arrange
        const mockProduct = new ProductEntityBuilder().build();
        const query = new GetProductByIdQuery(1);
        const expectedProductOutput = new ProductOutput(mockProduct);

        jest.spyOn(productRepository, 'getById').mockResolvedValue(mockProduct);

        // Act
        const result = await handler.execute(query);

        // Assert
        expect(productRepository.getById).toHaveBeenCalledWith(1);
        expect(result).toBeInstanceOf(GetProductByIdOutput);
        expect(result.product).toEqual(expectedProductOutput);
      });
    });
  });
});
