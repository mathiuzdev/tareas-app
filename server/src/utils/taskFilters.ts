import { Sequelize, WhereOptions } from "sequelize";
import TaskAttributes from "../models/Task";
import Tag from "../models/Tag";

export const buildStatusFilter = (
  status: string | undefined
): WhereOptions<TaskAttributes> => {
  const validStatuses = ["pending", "in progress", "completed"];
  if (status && validStatuses.includes(status)) {
    return { status };
  }
  return {};
};

export const normalizeTagIds = (
  tagId: string | string[] | undefined
): string[] => {
  if (!tagId) return [];
  return Array.isArray(tagId) ? tagId : [tagId];
};

export const buildTagsInclude = (tagIds: string[]) => {
  return {
    model: Tag,
    as: "tags",
    where: tagIds.length > 0 ? { id: tagIds } : undefined,
    required: tagIds.length > 0,
  };
};

export const buildTagsHavingClause = (tagIds: string[]) => {
  return tagIds.length > 0
    ? Sequelize.literal(`COUNT(DISTINCT "tags"."id") = ${tagIds.length}`)
    : undefined;
};
