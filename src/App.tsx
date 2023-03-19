// import { invoke } from "@tauri-apps/api/tauri";
import React, { useState } from 'react';
import { motion } from "framer-motion"
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link as RouterLink, LinkProps as RouterLinkProps, Outlet, useLocation } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';

import { Drawer } from './components/organisms/Drawer';
import { AppBar } from './components/organisms/AppBar';
import {
  createBrowserRouter,
  isRouteErrorResponse,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { DashBoardPage, route as DashBoardPageRoute } from './components/pages/DashBoardPage';
import { TestPage, route as TestPageRoute } from './components/pages/Test';

import "./App.css";

const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
    <PageLayout>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
    </PageLayout>
  );
};

const router = createBrowserRouter([
  DashBoardPageRoute,
  TestPageRoute,
]);

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

const mdTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

const drawerWidth: number = 240;


function App() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <AppBar open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} />
          <Drawer open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <RouterProvider router={router} />
          </Box>
        </Box >
      </ThemeProvider >
    </>
  );
}

export default App;
