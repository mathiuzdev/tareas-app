import React, { useState } from "react";
import { Typography, Box, Divider, Button, Modal } from "@mui/material";
import { CreateTaskForm } from "../components/Tasks/TaskForm/CreateTaskForm";
import { TaskList } from "../components/Tasks/TaskList/TaskList";
import AppLayout from "../components/layout/AppLayout";

const TasksPage: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleTaskCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <AppLayout>
      <Box
        sx={{ width: "100%", maxWidth: 1200, mx: "auto", p: { xs: 2, sm: 3 } }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "primary.main",
            textAlign: { xs: "center", sm: "left" },
            mb: 4,
          }}
        >
          Task Manager
        </Typography>

        <Box sx={{ mb: 4, textAlign: { xs: "center", sm: "left" } }}>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Add New Task
          </Button>
        </Box>

        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CreateTaskForm
            onTaskCreated={handleTaskCreated}
            onClose={handleCloseModal}
          />
        </Modal>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <TaskList key={refreshTrigger} />
        </Box>
      </Box>
    </AppLayout>
  );
};

export default TasksPage;
