// src/models/book.model.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Datastore } from '../integration/datastore';
import { UserModel } from './user.model';

export class BookModel extends Model {
  public title!: string;
  public author!: string;
  public userId!: number;
}

async function initializeBookModel() {
  const datastore = new Datastore();
  const sequelize = await datastore.init();

  BookModel.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Book',
      tableName: 'books',
    }
  );

  // Associations
  UserModel.hasMany(BookModel, { foreignKey: 'userId' });
  BookModel.belongsTo(UserModel, { foreignKey: 'userId' });

  await BookModel.sync();
}

initializeBookModel().catch((error) => {
  console.error('Error initializing BookModel:', error);
});
