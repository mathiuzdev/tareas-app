import React from "react";
import { Paper, Typography, Box, Chip } from "@mui/material";
import { TaskTags } from "./TaskTags";
import { Task } from "../../../types/task";
import { getStatusColor } from "../../../utils/taskUtils";
import { TaskActions } from "./TaskAction";

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onTaskClick?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onComplete,
  onDelete,
  onTaskClick,
}) => {
  return (
    <Paper
      onClick={onTaskClick}
      sx={{
        mb: 2,
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 6,
        },
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          bgcolor: getStatusColor(task.status),
        }}
      />

      <Box sx={{ p: 3, pl: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              overflowWrap: "break-word",
              flex: 1,
              mr: 2,
              ...(task.status === "completed" && {
                textDecoration: "line-through",
                color: "text.secondary",
              }),
            }}
          >
            {task.title}
          </Typography>

          <TaskActions
            isCompleted={task.status === "completed"}
            onComplete={() => onComplete(task.id)}
            onDelete={() => onDelete(task.id)}
          />
        </Box>

        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color:
              task.status === "completed" ? "text.disabled" : "text.secondary",
          }}
        >
          {task.description}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TaskTags tags={task.tags} />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
            pt: 2,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <Chip
            label={task.status.replace("_", " ")}
            size="small"
            sx={{
              backgroundColor: getStatusColor(task.status),
              color: "white",
              fontWeight: 500,
              px: 0.5,
              "& .MuiChip-label": {
                px: 1.5,
              },
            }}
          />

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              display: "flex",
              alignItems: "center",
            }}
          >
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
