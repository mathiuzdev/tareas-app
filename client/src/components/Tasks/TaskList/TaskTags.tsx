import React from "react";
import { Box, Chip } from "@mui/material";
import { Tag } from "../../../types/task";

interface TaskTagsProps {
  tags?: Tag[];
}

export const TaskTags: React.FC<TaskTagsProps> = ({ tags }) => {
  if (!tags?.length) return null;

  return (
    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag.name}
          size="small"
          sx={{ backgroundColor: tag.color, color: "white" }}
        />
      ))}
    </Box>
  );
};
