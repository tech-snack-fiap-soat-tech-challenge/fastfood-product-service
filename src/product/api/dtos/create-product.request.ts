import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductRequest {
  @ApiProperty({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Product description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Product price' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'Product stock quantity' })
  @IsInt()
  @IsNotEmpty()
  stockQuantity: number;

  @ApiProperty({ description: 'Product category' })
  @IsPositive()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({ description: 'Product image URL' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
