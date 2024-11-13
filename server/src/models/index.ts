import User from './User';
import Task from './Task';
import Tag from './Tag';
import TaskTag from './TaskTag';
export { User, Task, Tag, TaskTag };

User.hasMany(Task, { foreignKey: 'user_id' });
Task.belongsTo(User, { foreignKey: 'user_id' });
Task.belongsToMany(Tag, { as: 'tags', through: TaskTag, foreignKey: 'taskId', onDelete: 'CASCADE' });
Tag.belongsToMany(Task, { as: 'tasks',through: TaskTag, foreignKey: 'tagId', onDelete: 'CASCADE' });