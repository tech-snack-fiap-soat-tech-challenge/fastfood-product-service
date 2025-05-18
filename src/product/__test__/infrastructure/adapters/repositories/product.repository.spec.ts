import { ProductRepository } from '@app/product/infrastructure/adapters/repositories/product.repository';
import { ProductEntity } from '@app/product/core/domain/entities/product.entity';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntityBuilder } from '@app/product/__test__/mocks/builders/product-entity.builder';
import { mock, MockProxy } from 'jest-mock-extended';

describe('ProductRepository', () => {
  let repository: ProductRepository;
  let mockRepository: MockProxy<Repository<ProductEntity>>;

  beforeEach(async () => {
    mockRepository = mock<Repository<ProductEntity>>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepository,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get(ProductRepository);
  });

  describe('Given there are products for a category', () => {
    describe('When getByCategory is called', () => {
      it('should return the products from the orm repository', async () => {
        // Arrange
        const mockProducts = [
          new ProductEntityBuilder().withCategoryId(2).build(),
        ];
        mockRepository.find.mockResolvedValue(mockProducts);

        // Act
        const result = await repository.getByCategory(2);

        // Assert
        expect(mockRepository.find).toHaveBeenCalledWith({
          where: { categoryId: 2, isActive: true },
          relations: ['category'],
        });
        expect(result).toEqual(mockProducts);
      });
    });
  });

  describe('Given there is a product to be returned by id', () => {
    describe('When getById is called', () => {
      it('should return the product from the orm repository', async () => {
        // Arrange
        const mockProduct = new ProductEntityBuilder().withId(1).build();
        mockRepository.findOne.mockResolvedValue(mockProduct);

        // Act
        const result = await repository.getById(1);

        // Assert
        expect(mockRepository.findOne).toHaveBeenCalledWith({
          where: { id: 1 },
          relations: ['category'],
        });
        expect(result).toEqual(mockProduct);
      });
    });
  });

  describe('Given a product to be created', () => {
    describe('When create is called', () => {
      it('should save and return the created product', async () => {
        // Arrange
        const mockProduct = new ProductEntityBuilder().withId(1).build();
        mockRepository.save.mockResolvedValue(mockProduct);
        mockRepository.findOne.mockResolvedValue(mockProduct);

        // Act
        const result = await repository.create(mockProduct);

        // Assert
        expect(mockRepository.save).toHaveBeenCalledWith(mockProduct);
        expect(mockRepository.findOne).toHaveBeenCalledWith({
          where: { id: mockProduct.id },
          relations: ['category'],
        });
        expect(result).toEqual(mockProduct);
      });
    });
  });

  describe('Given a product to be updated', () => {
    describe('When update is called', () => {
      it('should save and return the updated product', async () => {
        // Arrange
        const mockProduct = new ProductEntityBuilder().withId(1).build();
        mockRepository.save.mockResolvedValue(mockProduct);
        mockRepository.findOne.mockResolvedValue(mockProduct);

        // Act
        const result = await repository.update(mockProduct);

        // Assert
        expect(mockRepository.save).toHaveBeenCalledWith(mockProduct);
        expect(mockRepository.findOne).toHaveBeenCalledWith({
          where: { id: mockProduct.id },
          relations: ['category'],
        });
        expect(result).toEqual(mockProduct);
      });
    });
  });
});
