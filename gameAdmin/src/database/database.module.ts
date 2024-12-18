import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'cash_admin',
      autoLoadModels: true,  // Carrega automaticamente os modelos (entities)
      synchronize: true,     // Sincroniza automaticamente as entidades com o banco de dados
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
