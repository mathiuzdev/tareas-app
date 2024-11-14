import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  TablePagination,
  useMediaQuery,
  SelectChangeEvent,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ListFilter } from "lucide-react";
import { Tag, Task, TaskStatus } from "../../../types/task";
import { useTasks } from "../../../hooks/useTasks";
import { usePagination } from "../../../hooks/usePagination";
import { TaskStatusFilter } from "./TaskStatusFilter";
import { TaskTagFilter } from "./TaskTagFilter";
import { TaskCard } from "./TaskCard";
import { TaskTable } from "./TaskTable";
import { TaskDetailModal } from "./TaskDetailModal";
import { useTags } from "../../../hooks/useTags";

export const TaskList: React.FC = () => {
  const [status, setStatus] = useState<TaskStatus>("All");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const filters = {
    status: status !== "All" ? status : undefined,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
  };

  const { tasks, handleDeleteTask, handleCompleteTask } = useTasks(filters);
  const { availableTags } = useTags();

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    getPaginatedItems,
  } = usePagination();

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as TaskStatus);
    handleChangePage(null, 0);
  };

  const handleFilterMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTagChange = (tag: Tag, checked: boolean) => {
    setSelectedTags((prev) =>
      checked ? [...prev, tag] : prev.filter((l) => l.name !== tag.name)
    );
  };

  const paginatedTasks = getPaginatedItems(tasks);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <Button
          startIcon={<ListFilter />}
          onClick={handleFilterMenuClick}
          color="primary"
        >
          Filter
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleFilterMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem>
            <TaskStatusFilter
              status={status}
              onStatusChange={handleStatusChange}
            />
          </MenuItem>
          <MenuItem>
            <TaskTagFilter
              tags={availableTags}
              selectedTags={selectedTags}
              onTagChange={handleTagChange}
            />
          </MenuItem>
        </Menu>
      </Box>

      {isMobile ? (
        <Box>
          {paginatedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
              onTaskClick={() => setSelectedTask(task)}
            />
          ))}
        </Box>
      ) : (
        <TaskTable
          tasks={paginatedTasks}
          onTaskClick={setSelectedTask}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
        />
      )}

      <TablePagination
        component="div"
        count={tasks.length}
        page={page}
        colSpan={3}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </Box>
  );
};
