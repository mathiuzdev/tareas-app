import React from "react";
import { Box, Typography } from "@mui/material";
import { Check } from "lucide-react";

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const predefinedColors = [
  "#FF5F5F",
  "#33FF57",
  "#5CA1FF",
  "#FFD700",
  "#8E44AD",
  "#1ABC9C",
  "#E95FFF",
  "#1D9159",
  "#FAAA37",
  "#4A90E2",
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor = "",
  onColorSelect,
}) => {
  const handleColorClick = (color: string) => {
    onColorSelect(color === selectedColor ? "" : color);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        Select Color
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 1.5,
        }}
      >
        {predefinedColors.map((color) => (
          <Box
            key={color}
            onClick={() => handleColorClick(color)}
            sx={{
              width: 36,
              height: 36,
              backgroundColor: color,
              borderRadius: "8px",
              cursor: "pointer",
              position: "relative",
              border: "2px solid white",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
              },
              ...(color === selectedColor && {
                boxShadow: "0 0 0 2px #4A90E2",
              }),
            }}
          >
            {color === selectedColor && (
              <Check size={16} color="white" strokeWidth={3} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
