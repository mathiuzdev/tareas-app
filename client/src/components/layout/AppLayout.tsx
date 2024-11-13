import React from "react";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";  
import { logout } from "../../services/auth";
import { LogOut } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Matías Pedro Ortega
          </Typography>
          {user && (
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogOut />}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        sx={{
          minWidth: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
          paddingTop: "100px",
          paddingBottom: "16px",
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default AppLayout;
