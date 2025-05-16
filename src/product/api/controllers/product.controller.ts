import { CreateProductCommand } from '@app/product/core/application/use-cases/create-product/create-product.command';
import { CreateProductOutput } from '@app/product/core/application/use-cases/create-product/create-product.output';
import {
  GetProductsByCategoryOutput,
  ProductItem,
} from '@app/product/core/application/use-cases/get-products-by-category/get-products-by-category.output';
import { GetProductsByCategoryQuery } from '@app/product/core/application/use-cases/get-products-by-category/get-products-by-category.query';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductRequest } from '../dtos/create-product.request';
import { RemoveProductCommand } from '@app/product/core/application/use-cases/remove-product/remove-product.command';
import { RemoveProductOutput } from '@app/product/core/application/use-cases/remove-product/remove-product.output';
import { UpdateProductRequest } from '../dtos/update-product.request';
import { UpdateProductCommand } from '@app/product/core/application/use-cases/update-product/update-product.command';
import { UpdateProductOutput } from '@app/product/core/application/use-cases/update-product/update-product.output';
import { ProductOutput } from '@app/product/core/application/dtos/product.output';
import { GetProductByIdOutput } from '@app/product/core/application/use-cases/get-product-by-id/get-product-by-id.output';
import { GetProductByIdQuery } from '@app/product/core/application/use-cases/get-product-by-id/get-product-by-id.query';

@ApiTags('products')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('products')
export class ProductController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @ApiOperation({ summary: 'Get products by category' })
  @ApiOkResponse({
    description: 'Products retrieved',
    type: ProductItem,
    isArray: true,
  })
  @Get('by-category')
  async getProductsByCategory(
    @Query('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<ProductItem[]> {
    const input = new GetProductsByCategoryQuery(categoryId);

    const output = await this.queryBus.execute<
      GetProductsByCategoryQuery,
      GetProductsByCategoryOutput
    >(input);

    return output.products;
  }

  @ApiOperation({ summary: 'Create a product' })
  @ApiBody({ type: CreateProductRequest })
  @ApiResponse({
    status: 201,
    description: 'Product created',
    type: ProductOutput,
  })
  @Post()
  async createProduct(@Body() input: CreateProductRequest) {
    const { name, description, stockQuantity, price, categoryId, imageUrl } =
      input;

    const command = new CreateProductCommand(
      name,
      description,
      price,
      stockQuantity,
      categoryId,
      imageUrl,
    );

    const output = await this.commandBus.execute<
      CreateProductCommand,
      CreateProductOutput
    >(command);

    return output.product;
  }

  @ApiOperation({ summary: 'Get product details' })
  @ApiOkResponse({
    description: 'Product retrieved',
    type: ProductOutput,
  })
  @Get(':productId')
  async getProductById(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<ProductOutput> {
    const input = new GetProductByIdQuery(productId);

    const output = await this.queryBus.execute<
      GetProductByIdQuery,
      GetProductByIdOutput
    >(input);

    return output.product;
  }

  @ApiOperation({ summary: 'Update a product' })
  @ApiBody({ type: UpdateProductRequest })
  @ApiResponse({
    status: 200,
    description: 'Product updated',
    type: ProductOutput,
  })
  @Put(':productId')
  async updateProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() input: UpdateProductRequest,
  ) {
    const command = new UpdateProductCommand(productId, input);

    const output = await this.commandBus.execute<
      UpdateProductCommand,
      UpdateProductOutput
    >(command);

    return output.product;
  }

  @ApiOperation({ summary: 'Remove a product' })
  @ApiResponse({
    status: 200,
    description: 'Product removed',
    type: ProductOutput,
  })
  @Delete(':productId')
  async disableProduct(@Param('productId') productId: number) {
    const command = new RemoveProductCommand(productId);

    const output = await this.commandBus.execute<
      RemoveProductCommand,
      RemoveProductOutput
    >(command);
    return output.removedProduct;
  }
}
