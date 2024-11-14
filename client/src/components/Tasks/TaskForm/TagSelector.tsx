import React from "react";
import { Autocomplete, TextField, Box, Chip } from "@mui/material";
import { TagIcon, X, Check } from "lucide-react";
import { Tag } from "../../../types/tag";

interface TagSelectorProps {
  availableTags: Tag[];
  selectedTags: Tag[];
  onChange: (tags: Tag[]) => void;
}

export const TagSelector: React.FC<TagSelectorProps> = ({
  availableTags,
  selectedTags,
  onChange,
}) => {
  return (
    <Autocomplete
      multiple
      options={availableTags}
      getOptionLabel={(option) => option.name}
      value={selectedTags}
      onChange={(_, newValue) => onChange(newValue)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      disableCloseOnSelect
      limitTags={8}
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
              pl: "14px", 
              minHeight: "42px", 
              "& .MuiAutocomplete-input": {
                px: 1,
                py: "8px",
              },
            },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                  <TagIcon size={18} className="text-gray-400 absolute left-2" />

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
              backgroundColor: option.color || "#E2E8F0",
              color: "#FFFFFF",
              fontWeight: 500,
              "& .MuiChip-deleteIcon": {
                color: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  color: "#FFFFFF",
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
                gap: 1.5,
                minHeight: 42,
                borderBottom: "1px solid",
                borderColor: "divider",
                "&:last-child": {
                  borderBottom: "none",
                },
                '&[aria-selected="true"]': {
                  backgroundColor: "action.selected",
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

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flex: 1,
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: option.color || "#E2E8F0",
                  flexShrink: 0,
                  border: "2px solid white",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
                }}
              />
              <Box
                component="span"
                sx={{
                  fontWeight: selected ? 500 : 400,
                  color: selected ? "primary.main" : "text.primary",
                }}
              >
                {option.name}
              </Box>
            </Box>
          </Box>
        );
      }}
      ListboxProps={{
        sx: {
          p: 1,
          maxHeight: 300,
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
  );
};
