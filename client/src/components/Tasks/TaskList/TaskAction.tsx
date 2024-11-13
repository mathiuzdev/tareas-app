import React from "react";
import { Box, IconButton } from "@mui/material";
import { Trash2, CheckCircle } from "lucide-react";

interface TaskActionsProps {
  isCompleted: boolean;
  onComplete: () => void;
  onDelete: () => void;
}

export const TaskActions: React.FC<TaskActionsProps> = ({
  isCompleted,
  onComplete,
  onDelete,
}) => {
  const handleActionClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
      {!isCompleted && (
        <IconButton
          onClick={(event) => {
            handleActionClick(event);
            onComplete();
          }}
          color="success"
          size="small"
          sx={{ zIndex: 20 }}
        >
          <CheckCircle />
        </IconButton>
      )}
      <IconButton
        onClick={(event) => {
          handleActionClick(event);
          onDelete();
        }}
        color="error"
        size="small"
        sx={{ zIndex: 20 }}
      >
        <Trash2 />
      </IconButton>
    </Box>
  );
};
