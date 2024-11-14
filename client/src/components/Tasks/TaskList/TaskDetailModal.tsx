import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { X, Calendar, CheckCircle } from "lucide-react";
import { TaskTags } from "./TaskTags";
import { Task } from "../../../types/task";

interface TaskDetailModalProps {
  task: Task | null;
  onClose: () => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  onClose,
}) => {
  if (!task) return null;

  return (
    <Modal
      open={Boolean(task)}
      onClose={onClose}
      aria-labelledby="task-detail-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxHeight: "90vh",
          overflow: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            p: 3,
            pb: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            position: "relative",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "text.secondary",
              "&:hover": {
                color: "text.primary",
                backgroundColor: "action.hover",
              },
            }}
          >
            <X size={20} />
          </IconButton>
          <Typography
            variant="h6"
            component="h2"
            fontWeight={800}
            sx={{ pr: 4 }}
          >
            {task.title}
          </Typography>
        </Box>

        <Box sx={{ p: 3 }}>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: "text.secondary",
              whiteSpace: "pre-wrap",
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
              flexDirection: "column",
              gap: 1.5,
              p: 2,
              bgcolor: "grey.50",
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CheckCircle size={18} className="text-gray-500" />
              <Typography variant="body2" color="text.secondary">
                Status:{" "}
                <Box
                  component="span"
                  sx={{ color: "text.primary", fontWeight: 500 }}
                >
                  {task.status}
                </Box>
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Calendar size={18} className="text-gray-500" />
              <Typography variant="body2" color="text.secondary">
                Due Date:{" "}
                <Box
                  component="span"
                  sx={{ color: "text.primary", fontWeight: 500 }}
                >
                  {new Date(task.dueDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
