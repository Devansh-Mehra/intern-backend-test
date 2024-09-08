import { Sequelize, DataTypes, Model } from 'sequelize';

export class Datastore {
  async init() {
    const sequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: false,
    });

    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

    return sequelize;
  }
}
