import {
  AppBar,
  Avatar,
  Badge,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";

import Logo from "../assets/icons/logo.png";
import AvatarPic from "../assets/icons/avatar-370-456322.webp";
import React from "react";
import { theme } from "../styles/theme";
import { Mail, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
}));

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: theme.palette.background.main,
        color: "grey",
      }}
    >
      <StyledToolBar>
        <Stack direction={"row"} alignItems="center">
          <Link to={"/"}>
            <img src={Logo} alt="logo" height="25px" />
          </Link>
          <Typography marginLeft={'5px'} color={theme.palette.primary.main} variant="h6">
            DPhi
          </Typography>
        </Stack>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={AvatarPic}
            alt="av"
            // onClick={(e) => setOpen(true)}
          />
        </Icons>
      </StyledToolBar>
    </AppBar>
  );
};

export default Navbar;
