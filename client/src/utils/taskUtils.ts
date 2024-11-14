export const getStatusColor = (status: string): string => {
  switch (status) {
    case "completed":
      return "#4caf50";
    case "in progress":
      return "#ff9800";
    default:
      return "#3c29f2";
  }
};

export const menuItemStyles = {
  p: "6px 16px",
  minHeight: "42px",
  borderRadius: 1,
  mx: "2px",
  borderBottom: "1px solid",
  borderColor: "divider",
  "&:last-child": { borderBottom: "none" },
  "&.Mui-selected": {
    backgroundColor: "primary.50",
    fontWeight: 500,
    color: "primary.main",
    "&:hover": { backgroundColor: "primary.100" },
  },
  "&:hover": { backgroundColor: "action.hover" },
};
