import { forwardRef } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import { Plus, X } from "lucide-react";
import { createTask } from "../../../services/task";
import { TagSelector } from "./TagSelector";
import { NewTagForm } from "./NewTagForm";
import { useTags } from "../../../hooks/useTags";
import { Tag } from "../../../types/tag";
import { taskValidationSchema } from "../../../validations";

interface CreateTaskFormProps {
  onTaskCreated: () => void;
  onClose?: () => void;
}

export const CreateTaskForm = forwardRef<HTMLDivElement, CreateTaskFormProps>(
  ({ onTaskCreated, onClose }, ref) => {
    const { availableTags, newTag, setNewTag, handleNewTag } = useTags();

    const formik = useFormik({
      initialValues: {
        title: "",
        description: "",
        dueDate: "",
        status: "pending" as "pending" | "in progress" | "completed",
        tags: [] as Tag[],
      },
      validationSchema: taskValidationSchema,
      onSubmit: async (values, { resetForm }) => {
        try {
          await createTask({
            ...values,
            status: values.status as "pending" | "in progress" | "completed",
            tags: values.tags.map((tag: Tag) => Number(tag.id)),
          });
          resetForm();
          onTaskCreated();
          onClose?.();
        } catch (error) {
          console.error("Failed to create task:", error);
        }
      },
    });

    const handleAddNewTag = async () => {
      const createdTag = await handleNewTag();
      if (createdTag) {
        formik.setFieldValue("tags", [...formik.values.tags, createdTag]);
      }
    };

    return (
      <Box
        component="form"
        ref={ref}
        onSubmit={formik.handleSubmit}
        tabIndex={-1}
        sx={{
          width: { xs: "90%", sm: 500 },
          maxWidth: "100%",
          maxHeight: "90vh", 
          overflowY: "auto", 
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Create New Task
          </Typography>
          {onClose && (
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "text.primary",
                  backgroundColor: "action.hover",
                },
              }}
            >
              <X size={20} />
            </IconButton>
          )}
        </Box>

        <Box sx={{ p: { xs: 2, sm: 3 }, display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            fullWidth
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
              },
            }}
          />

          <TextField
            fullWidth
            name="description"
            label="Description"
            multiline
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
              },
            }}
          />

          <TextField
            fullWidth
            name="dueDate"
            label="Due Date"
            type="date"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
            helperText={formik.touched.dueDate && formik.errors.dueDate}
            InputLabelProps={{ shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
              },
            }}
          />

          <FormControl fullWidth>
            <Select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              displayEmpty
              renderValue={(value) => (
                <Typography color={value ? "text.primary" : "text.secondary"}>
                  {value ? value.charAt(0).toUpperCase() + value.slice(1) : "Select Status"}
                </Typography>
              )}
              sx={{
                backgroundColor: "background.paper",
              }}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <TagSelector
            availableTags={availableTags}
            selectedTags={formik.values.tags}
            onChange={(tagIds) => formik.setFieldValue("tags", tagIds)}
          />

          <NewTagForm
            newTag={newTag}
            onNewTagChange={setNewTag}
            onAddTag={handleAddNewTag}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
            fullWidth={true}
            startIcon={<Plus size={20} />}
            sx={{
              mt: 1,
              py: 1,
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Create Task
          </Button>
        </Box>
      </Box>
    );
  }
);