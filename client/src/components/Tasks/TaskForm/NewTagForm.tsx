import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { ColorPicker } from "./ColorPicker";
import { NewTag } from "../../../types/tag";

interface NewTagFormProps {
  newTag: NewTag;
  onNewTagChange: (tag: NewTag) => void;
  onAddTag: () => void;
}

export const NewTagForm: React.FC<NewTagFormProps> = ({
  newTag,
  onNewTagChange,
  onAddTag,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ color: false, name: false });

  useEffect(() => {
    const colorError =
      !isSubmitting && newTag.name.trim() !== "" && newTag.color.trim() === "";
    const nameError =
      !isSubmitting && newTag.color.trim() !== "" && newTag.name.trim() === "";
    setErrors({ color: colorError, name: nameError });
  }, [newTag, isSubmitting]);

  const handleColorSelect = (color: string) => {
    setIsSubmitting(false);
    onNewTagChange({ ...newTag, color });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    onNewTagChange({ ...newTag, name: e.target.value });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setErrors({ color: false, name: false });
    onAddTag();
  };

  const isFormValid = newTag.color.trim() !== "" && newTag.name.trim() !== "";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <ColorPicker
        selectedColor={newTag.color}
        onColorSelect={handleColorSelect}
      />
      <TextField
        fullWidth
        label="New Tag Name"
        value={newTag.name}
        onChange={handleNameChange}
      />
      {!isSubmitting && (errors.color || errors.name) && (
        <Typography color="error" variant="body2">
          {errors.color && "Color is required"}
          {errors.name && "Name is required"}
        </Typography>
      )}
      <Button variant="outlined" onClick={handleSubmit} disabled={!isFormValid}>
        Add New Tag
      </Button>
    </Box>
  );
};
