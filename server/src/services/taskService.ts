import { Task, Tag } from "../models";

export class TaskService {
  static async getTasksWithAllTags(taskIds: number[]) {
    return Task.findAll({
      where: { id: taskIds },
      include: [
        {
          model: Tag,
          as: "tags",
          required: false,
        },
      ],
    });
  }
}
