import { Box } from "@mui/joy";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import {ReactComponent as Logo} from "../../assets/surefoot-logo.svg";

export const AppLayout = () => {
  return (
    <Fragment>
      <Box
        component="header"
        className="Header"
        sx={{
          p: 2,
          gap: 2,
          bgcolor: "background.surface",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gridColumn: "1 / -1",
          borderBottom: "1px solid",
          borderColor: "divider",
          position: "sticky",
          top: 0,
          zIndex: 1100,
        }}
      >
        <Logo height="100%"/>
      </Box>
      <Box component="main" className="Main">
        <Outlet />
      </Box>
    </Fragment>
  );
};
