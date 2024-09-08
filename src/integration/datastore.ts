import { Sequelize, DataTypes, Model } from 'sequelize';

export class Datastore {
  async init() {
    const sequelize = new Sequelize({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
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
