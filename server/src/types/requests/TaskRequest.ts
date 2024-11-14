import { UserRequest } from "./UserRequest";

export interface TaskRequest extends UserRequest {
  body: {
    title: string;
    description: string;
    dueDate: Date;
    status: string;
    tags: number[];
  };
}
