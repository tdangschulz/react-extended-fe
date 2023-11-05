import LockOutlinedIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import theme from "../../commons/theme";
import { useSession } from "../../hooks/useSession";
import { ProfileDialog } from "../ProfileDialog";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://bredex.de/">
        bredex
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const LoginPage: React.FC = () => {
  const { login } = useSession();
  const [showDialog, setShowDialog] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userId = data.get("id");
    const password = data.get("password");

    login(userId?.toString(), password?.toString());
  };

  const onCancel = () => {
    setShowDialog(false);
  };

  const afterProfileSubmitted = () => {
    setShowDialog(false);
  };

  return (
    <>
      <ProfileDialog
        registerDialog
        open={showDialog}
        afterSubmit={afterProfileSubmitted}
        onCancel={onCancel}
        showPassword={false}
        showDeleteButton={false}
        submitTitle="Registrieren"
      ></ProfileDialog>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Versand 73!
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="id"
                label="User Id"
                name="id"
                autoComplete="id"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
              >
                Sign In
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                onClick={() => {
                  localStorage.removeItem("userId");
                  setShowDialog(true);
                }}
              >
                Registrieren
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};
