import { BaseEntity } from '@app/common/domain/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;
  @Column({ name: 'description', type: 'varchar' })
  description: string;
}
