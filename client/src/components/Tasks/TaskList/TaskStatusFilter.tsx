import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Clock } from "lucide-react";
import { TaskStatus } from "../../../types/task";
import { menuItemStyles } from "../../../utils/taskUtils";

interface TaskStatusFilterProps {
  status: TaskStatus;
  onStatusChange: (event: SelectChangeEvent) => void;
}

export const TaskStatusFilter: React.FC<TaskStatusFilterProps> = ({
  status,
  onStatusChange,
}) => {
  return (
    <FormControl sx={{ width: "200px", maxWidth: "100%" }}>
      <Select
        value={status}
        onChange={onStatusChange}
        displayEmpty
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "divider",
          },
          "& .MuiSelect-select": {
            p: "4px",
            pl: "36px",
            minHeight: "42px",
            display: "flex",
            alignItems: "center",
          },
          "& .MuiOutlinedInput-root": {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
        }}
        startAdornment={
          <Clock size={18} className="text-gray-400 absolute left-2" />
        }
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 1,
              "& .MuiList-root": {
                p: 1,
              },
            },
          },
        }}
      >
        <MenuItem value="All" sx={menuItemStyles}>
          All Tasks
        </MenuItem>
        <MenuItem value="pending" sx={menuItemStyles}>
          Pending
        </MenuItem>
        <MenuItem value="in progress" sx={menuItemStyles}>
          In Progress
        </MenuItem>
        <MenuItem value="completed" sx={menuItemStyles}>
          Completed
        </MenuItem>
      </Select>
    </FormControl>
  );
};
