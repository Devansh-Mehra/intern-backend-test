// src/models/user.model.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import { Datastore } from '../integration/datastore';

export class UserModel extends Model {
  public validPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.getDataValue('password'));
  }
}

async function initializeUserModel() {
  const datastore = new Datastore();
  const sequelize = await datastore.init();

  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );

  UserModel.beforeCreate(async (user: UserModel) => {
    try {
      if (
        !user.getDataValue('password') ||
        user.getDataValue('password').trim() === ''
      ) {
        throw new Error('Password is required');
      }
      const hashedPassword = await bcrypt.hash(
        user.getDataValue('password'),
        10
      );
      user.setDataValue('password', hashedPassword);
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  });

  await UserModel.sync({ alter: true });
}

initializeUserModel().catch((error) => {
  console.error('Error initializing UserModel:', error);
});
