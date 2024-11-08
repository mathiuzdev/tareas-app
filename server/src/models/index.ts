import User from './User';
import Task from './Task';
import Label from './Label';
import TaskLabel from './TaskLabel';

export { User, Task, Label, TaskLabel };

User.hasMany(Task, { foreignKey: 'user_id' });
Task.belongsTo(User, { foreignKey: 'user_id' });
Task.belongsToMany(Label, { through: TaskLabel, foreignKey: 'task_id' });
Label.belongsToMany(Task, { through: TaskLabel, foreignKey: 'label_id' });