import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface LabelAttributes {
  id: number;
  name: string;
  color: string;
}

interface LabelCreationAttributes extends Optional<LabelAttributes, 'id'> {}

class Label extends Model<LabelAttributes, LabelCreationAttributes> implements LabelAttributes {
  public id!: number;
  public name!: string;
  public color!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Label.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Label',
    tableName: 'labels',
    timestamps: true,
  }
);

export default Label;
