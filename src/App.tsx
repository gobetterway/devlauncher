// import { invoke } from "@tauri-apps/api/tauri";
import React, { FC, PropsWithChildren, useState } from 'react';
import { motion } from "framer-motion"
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link as RouterLink, LinkProps as RouterLinkProps, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';

import { Drawer } from './components/organisms/Drawer';
import { AppBar } from './components/organisms/AppBar';
import { route as DashBoardPageRoute } from './components/pages/DashBoardPage';
import { route as ConfigurationPageRoute } from './components/pages/ConfigurationPage';
import { route as DockerPageRoute } from './components/pages/DockerPage';
import { route as NodePageRoute } from './components/pages/NodePage';

import "./App.css";
import { ErrorBoundary } from './ErrorBoundary';

const routesConfigs: {
  [routeName: string]: {
    path: string;
    element: JSX.Element;
  }
} = {
  DashBoardPageRoute,
  ConfigurationPageRoute,
  DockerPageRoute,
  NodePageRoute,
}

const routesElements: JSX.Element[] = []

for (const routeName in routesConfigs) {
  if (Object.prototype.hasOwnProperty.call(routesConfigs, routeName)) {
    const routeConf = routesConfigs[routeName];
    routesElements.push(<Route key={routeConf.path} path={routeConf.path} element={routeConf.path} />)
  }
}


const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  const drawerWidth: number = 240;
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const props = {
    drawerWidth, open, toggleDrawer
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar {...props} />
      <Drawer {...props} />
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
        {children}
      </Box>
    </Box >
  );
}

const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
    <PageLayout>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={{
          initial: {
            opacity: 0
          },
          in: {
            opacity: 1
          },
          out: {
            opacity: 0
          }
        }}
        transition={{
          type: 'tween',
          ease: 'linear',
          duration: 0.5
        }}
      >
        <Outlet />
      </motion.div>
    </PageLayout>
  );
};

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

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={mdTheme}>
        <ErrorBoundary>

          <Routes>
            <Route element={<AnimationLayout />}>
              {routesElements}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </ThemeProvider >
    </>
  );
}

export default App;
