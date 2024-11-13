import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Task from './Task';
import Tag from './Tag';

class TaskTag extends Model {
  public taskId!: number;
  public tagId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TaskTag.init(
  {
    taskId: {
      type: DataTypes.INTEGER,
      references: {
        model: Task,
        key: 'id',
      },
      primaryKey: true,
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: 'id',
      },
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'TaskTag',
    tableName: 'task_tags',
    timestamps: true,
  }
);



export default TaskTag;
