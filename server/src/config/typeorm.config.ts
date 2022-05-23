import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';


export const typeOrmAsyncConfig:TypeOrmModuleAsyncOptions = {
  useFactory: async () : Promise<TypeOrmModuleOptions> =>{
    return {
      type:'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      
      migrations:[__dirname + '/../migrations/*{.ts,.js}'],
      cli:{
        migrationsDir:__dirname + '/../migrations',
      },
      extra:{
        charset:'utf8mb4_unicode_ci',
      },

      synchronize: false,
      logging: false,
    };
  },
};


export const typeOrmConfig:TypeOrmModuleOptions = {

  type:'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      
      migrations:[__dirname + '/../migrations/*{.ts,.js}'],
      cli:{
        migrationsDir:__dirname + '/../migrations',
      },
      extra:{
        charset:'utf8mb4_unicode_ci',
      },

      logging: false,

}