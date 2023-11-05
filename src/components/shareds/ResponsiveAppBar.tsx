import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/globalContext";
import { ProfileDialog } from "../pages/ProfileDialog";
import { useSession } from "../hooks/useSession";

const pages = [
  { title: "Shop", target: "/shop", isUser: true },
  { title: "Callback", target: "/callback", isUser: true },
  { title: "Produkte", target: "/products", isAdmin: true },
  { title: "Kunden", target: "/customers", isAdmin: true },
  { title: "Rechnungen", target: "/invoices", isAdmin: true },
];
const settings = [
  { title: "Profil", id: "profile" },
  { title: "Locale", id: "locale" },
  { title: "Logout", id: "logout" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigate = useNavigate();
  const { logout } = useSession();

  const { state } = useGlobalState();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: { title: string; id: string }) => {
    if (setting.id === "logout") {
      logout();
    } else if (setting.id === "invoice") {
      navigate("/customer/invoice");
    } else if (setting.id === "profile") {
      setShowDialog(true);
    }

    setAnchorElUser(null);
  };

  const [showDialog, setShowDialog] = React.useState(false);

  const onCancel = () => {
    setShowDialog(false);
  };

  const afterProfileSubmitted = () => {
    setShowDialog(false);
  };

  return (
    <>
      <ProfileDialog
        afterSubmit={afterProfileSubmitted}
        open={showDialog}
        onCancel={onCancel}
        profile={state.userInfo}
        showDeleteButton={false}
        showPassword={state.userInfo?.isAdmin}
      ></ProfileDialog>
      <AppBar position="static" sx={{ bgcolor: "secondary.main" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <ShoppingCart sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                ":hover": {
                  color: "#B8122A",
                },
              }}
            >
              FAK73
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages
                  .filter((page) => page.isUser && !state.userInfo?.isAdmin)
                  .map((page) => (
                    <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
            <ShoppingCart sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages
                .filter(
                  (page) =>
                    (page.isAdmin && state.userInfo?.isAdmin) ||
                    (page.isUser && !state.userInfo?.isAdmin)
                )
                .map((page) => (
                  <Button
                    key={page.title}
                    onClick={() => navigate(page.target)}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      ":hover": {
                        color: "#B8122A",
                      },
                    }}
                  >
                    {page.title}
                  </Button>
                ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={state.userInfo?.firstName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.title}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
