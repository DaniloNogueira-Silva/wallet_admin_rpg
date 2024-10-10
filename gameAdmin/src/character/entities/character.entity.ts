import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'characters',
  timestamps: false,
})
export class Character extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  character_id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  genre: string;

  @Column({ type: DataType.INTEGER })
  level: number;

  @Column({ type: DataType.INTEGER })
  health: number;

  @Column({ type: DataType.INTEGER })
  stamina: number;

  @Column({ type: DataType.INTEGER })
  user_id: number;
}
