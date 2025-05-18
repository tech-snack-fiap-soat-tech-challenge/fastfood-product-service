import { GetProductsByCategoryHandle } from '@app/product/core/application/use-cases/get-products-by-category/get-products-by-category.handle';
import { GetProductsByCategoryQuery } from '@app/product/core/application/use-cases/get-products-by-category/get-products-by-category.query';
import { GetProductsByCategoryOutput } from '@app/product/core/application/use-cases/get-products-by-category/get-products-by-category.output';
import { IProductRepository } from '@app/product/core/domain/interfaces/repositories/product-repository.interface';
import { mock, MockProxy } from 'jest-mock-extended';
import { ProductEntityBuilder } from '@app/product/__test__/mocks/builders/product-entity.builder';

describe('GetProductsByCategoryHandle', () => {
  let handler: GetProductsByCategoryHandle;
  let productRepository: MockProxy<IProductRepository>;

  beforeEach(() => {
    productRepository = mock<IProductRepository>();
    handler = new GetProductsByCategoryHandle(productRepository);
  });

  describe('Given there are products for a category in the database', () => {
    describe('When execute is called', () => {
      it('should call repository.getByCategory with the correct categoryId and return GetProductsByCategoryOutput', async () => {
        // Arrange
        const productbuilder = new ProductEntityBuilder();
        const mockProducts = [
          productbuilder.build(),
          productbuilder.withId(2).withName('Product 2').build(),
        ];
        const query = new GetProductsByCategoryQuery(2);

        jest
          .spyOn(productRepository, 'getByCategory')
          .mockResolvedValue(mockProducts);

        // Act
        const result = await handler.execute(query);

        // Assert
        expect(productRepository.getByCategory).toHaveBeenCalledWith(2);
        expect(result).toEqual(new GetProductsByCategoryOutput(mockProducts));
      });
    });
  });

  describe('Given there was an error querying the repository', () => {
    describe('When execute is called', () => {
      it('should propagate the error', async () => {
        // Arrange
        const query = new GetProductsByCategoryQuery(2);
        const error = new Error('Repository error');
        jest.spyOn(productRepository, 'getByCategory').mockRejectedValue(error);

        // Act & Assert
        await expect(handler.execute(query)).rejects.toThrow(
          'Repository error',
        );
        expect(productRepository.getByCategory).toHaveBeenCalledWith(2);
      });
    });
  });
});
