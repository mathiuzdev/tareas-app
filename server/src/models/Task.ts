import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import Tag from "./Tag";
import TaskTag from "./TaskTag";

interface TaskAttributes {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  userId: number;

}


interface TaskCreationAttributes extends Optional<TaskAttributes, "id"> {}

class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public dueDate!: Date;
  public status!: string;
  public userId!: number;



  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in progress", "completed"),
      allowNull: false,
      defaultValue: "pending",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true,
  }
);

export default Task;
