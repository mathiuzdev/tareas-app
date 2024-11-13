import React from "react";
import { Autocomplete, Box, TextField, Typography, Chip } from "@mui/material";
import { Tag as TagIcon, X, Check } from "lucide-react";
import { Tag } from "../../../types/task";

interface TaskTagFilterProps {
  tags: Tag[];
  selectedTags: Tag[];
  onTagChange: (tag: Tag, checked: boolean) => void;
}

export const TaskTagFilter: React.FC<TaskTagFilterProps> = ({
  tags,
  selectedTags,
  onTagChange,
}) => {
  const handleChange = (_: React.SyntheticEvent, values: Tag[]) => {
    tags.forEach((tag) => {
      const isSelected = values.some(
        (selectedTag) => selectedTag.id === tag.id
      );
      const wasSelected = selectedTags.some(
        (selectedTag) => selectedTag.id === tag.id
      );
      if (isSelected !== wasSelected) {
        onTagChange(tag, isSelected);
      }
    });
  };

  return (
    <Box sx={{ width: "280px", maxWidth: "100%" }}>
      <Autocomplete
        multiple
        options={tags}
        getOptionLabel={(tag) => tag.name}
        value={selectedTags}
        onChange={handleChange}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        disableCloseOnSelect
        onKeyDown={(event) => {
          event.stopPropagation();
        }}
        filterOptions={(options, state) =>
          options.filter((option) =>
            option.name.toLowerCase().startsWith(state.inputValue.toLowerCase())
          )
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Search tags..."
            sx={{
              "& .MuiOutlinedInput-root": {
                p: "4px",
                "& .MuiAutocomplete-input": {
                  px: 1,
                },
              },
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <TagIcon size={18} className="text-gray-400 ml-2 mr-1" />
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option.id}
              label={option.name}
              size="small"
              sx={{
                m: "2px",
                borderRadius: "4px",
                backgroundColor: "primary.50",
                color: "primary.700",
                "& .MuiChip-deleteIcon": {
                  color: "primary.500",
                  "&:hover": {
                    color: "primary.700",
                  },
                },
              }}
              deleteIcon={<X size={14} />}
            />
          ))
        }
        renderOption={(props, option, { selected }) => {
          const { key, ...restProps } = props;
          return (
            <Box
              component="li"
              sx={{
                "&.MuiAutocomplete-option": {
                  p: "6px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  minHeight: 42,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  "&:last-child": {
                    borderBottom: "none",
                  },
                  '&[aria-selected="true"]': {
                    backgroundColor: "primary.50",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "action.hover",
                  },
                },
              }}
              key={key}
              {...restProps}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  border: "1px solid",
                  borderColor: selected ? "primary.main" : "divider",
                  backgroundColor: selected ? "primary.main" : "transparent",
                }}
              >
                {selected && <Check size={14} className="text-white" />}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: selected ? 500 : 400,
                  color: selected ? "primary.main" : "text.primary",
                }}
              >
                {option.name}
              </Typography>
            </Box>
          );
        }}
        ListboxProps={{
          sx: {
            p: 1,
            "& .MuiAutocomplete-option": {
              borderRadius: 1,
              mx: "2px",
            },
          },
        }}
        popupIcon={null}
        sx={{
          "& .MuiAutocomplete-popupIndicator": {
            display: "none",
          },
        }}
      />
    </Box>
  );
};
