import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Task from './Task';
import Label from './Label';

class TaskLabel extends Model {
  public task_id!: number;
  public label_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TaskLabel.init(
  {
    task_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Task,
        key: 'id',
      },
      primaryKey: true,
    },
    label_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Label,
        key: 'id',
      },
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'TaskLabel',
    tableName: 'task_labels',
    timestamps: true,
  }
);



export default TaskLabel;
