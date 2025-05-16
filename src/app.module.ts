import { ConfigurationModule } from '@app/configuration/configuration.module';
import { Module } from '@nestjs/common';
import { Logger } from '@common/application/logger';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigurationModule, ProductModule],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
