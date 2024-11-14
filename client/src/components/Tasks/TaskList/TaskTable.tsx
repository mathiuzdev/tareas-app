import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
} from "@mui/material";
import { Task } from "../../../types/task";
import { TaskTags } from "./TaskTags";
import { getStatusColor } from "../../../utils/taskUtils";
import { TaskActions } from "./TaskAction";

interface TaskTableProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  onTaskClick,
  onComplete,
  onDelete,
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        overflow: "hidden",
        "& .MuiTable-root": {
          borderCollapse: "separate",
          borderSpacing: "0",
        },
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: "grey.50",
              "& th": {
                fontWeight: 600,
                color: "grey.700",
                fontSize: "0.875rem",
                py: 2,
                borderBottom: 2,
                borderColor: "grey.200",
              },
            }}
          >
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              hover
              onClick={() => onTaskClick(task)}
              sx={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative",
                "&:hover": {
                  bgcolor: "grey.50",
                  "& .MuiTableCell-root": {
                    color: "text.primary",
                  },
                },
                ...(task.status === "completed" && {
                  bgcolor: "grey.50",
                  "& .MuiTableCell-root": {
                    color: "text.secondary",
                  },
                }),
              }}
            >
              <TableCell
                sx={{
                  width: "200px",
                  maxWidth: "200px",
                  position: "relative",
                  pl: 3,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    bgcolor: getStatusColor(task.status),
                  },
                }}
              >
                <Typography
                  noWrap
                  sx={{
                    fontWeight: 500,
                    ...(task.status === "completed" && {
                      textDecoration: "line-through",
                    }),
                  }}
                >
                  {task.title}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  maxWidth: "300px",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: 1.4,
                  }}
                >
                  {task.description}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  minWidth: "150px",
                }}
              >
                <TaskTags tags={task.tags} />
              </TableCell>
              <TableCell>
                <Chip
                  label={task.status.replace("_", " ")}
                  size="small"
                  sx={{
                    backgroundColor: getStatusColor(task.status),
                    color: "white",
                    fontWeight: 500,
                    textTransform: "capitalize",
                    "& .MuiChip-label": {
                      px: 1.5,
                    },
                  }}
                />
              </TableCell>
              <TableCell
                sx={{
                  color: "text.secondary",
                  whiteSpace: "nowrap",
                }}
              >
                {new Date(task.dueDate).toLocaleDateString()}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  pr: 2,
                  "& .MuiButtonBase-root": {
                    opacity: 0.8,
                    transition: "opacity 0.2s",
                  },
                  "&:hover .MuiButtonBase-root": {
                    opacity: 1,
                  },
                }}
              >
                <TaskActions
                  isCompleted={task.status === "completed"}
                  onComplete={() => onComplete(task.id)}
                  onDelete={() => onDelete(task.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
