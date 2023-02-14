import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column('bool')
  is_enabled: boolean;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  enable() {
    if (!this.is_enabled) {
      this.is_enabled = true;
    }
  }

  disable() {
    if (this.is_enabled) {
      this.is_enabled = false;
    }
  }
}
