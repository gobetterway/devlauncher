import React, { createContext, FC, PropsWithChildren, useContext, useReducer, useState } from 'react';
// import { invoke } from "@tauri-apps/api/tauri";
import { createDir, writeTextFile, BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link as RouterLink, LinkProps as RouterLinkProps, Outlet, useLocation } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Drawer } from './components/organisms/Drawer';
import { AppBar } from './components/organisms/AppBar';

import { route as DashBoardPageRoute } from './components/pages/DashBoardPage';
import { route as ConfigurationPageRoute } from './components/pages/ConfigurationPage';
import { route as DockerPageRoute } from './components/pages/DockerPage';
import { route as NodePageRoute } from './components/pages/NodePage';

import "./App.css";

const ACTION_TYPE = 0;
const ACTION_DATA = 1;

createDir('users', { dir: BaseDirectory.AppConfig, recursive: true });

type ConfigState = {
  baseDir: string;
  serviceDir: string;
  dockerDir: string;
  nodeCommand: string;
}
type ActionType =
  ['loadConf', ConfigState] |
  ['setBaseDir', string] |
  ['setNodeCommand', string] |
  ['setServicesDir', string] |
  ['setDockerDir', string]
  ;
// type ActionType = { type: [string]; }
type Dispatch = (action: ActionType) => void

const emptyState: ConfigState = {
  baseDir: '',
  serviceDir: '',
  dockerDir: '',
  nodeCommand: '',
}

const ConfigStateContext = React.createContext<
  { state: ConfigState; dispatch: Dispatch } | undefined
>(undefined)

function configReducer(state: ConfigState, action: ActionType) {
  if (!action) return state;

  const save = (data: any) => {
    writeTextFile(
      { path: 'app.conf', contents: JSON.stringify(data) },
      { dir: BaseDirectory.AppConfig }
    )
  }

  let out: ConfigState;

  switch (action[ACTION_TYPE]) {
    case 'loadConf': {
      out = action[ACTION_DATA] as ConfigState
      break;
    }
    case 'setBaseDir': {
      out = { ...state, ...{ baseDir: action[ACTION_DATA] as string } }
      save(out)
      break;
    }
    case 'setNodeCommand': {
      out = { ...state, ...{ nodeCommand: action[ACTION_DATA] as string } }
      save(out)
      break;
    }
    case 'setServicesDir': {
      out = { ...state, ...{ serviceDir: action[ACTION_DATA] as string } }
      save(out)
      break;
    }
    case 'setDockerDir': {
      out = { ...state, ...{ dockerDir: action[ACTION_DATA] as string } }
      save(out)
      break;
    }
  }


  return out;
}

const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [savedConfig, setSavedConfig] = useState(emptyState)
  const [hasLoadedConf, setHasLoadedConf] = useState(false)
  const [state, dispatch] = React.useReducer(configReducer, emptyState)

  if (!hasLoadedConf) {
    readTextFile(
      'app.conf',
      { dir: BaseDirectory.AppConfig }
    )
      .then(JSON.parse)
      .then(v => {
        console.log(v);
        dispatch(['loadConf', v])
        setHasLoadedConf(true)
      })
  }

  return <ConfigStateContext.Provider value={{ state, dispatch }}>{children}</ConfigStateContext.Provider>
}

export const useConfig = (): [ConfigState, Dispatch] => {
  const config = useContext(ConfigStateContext)
  if (config === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return [config.state, config.dispatch]
}

const router = createBrowserRouter([
  DashBoardPageRoute,
  ConfigurationPageRoute,
  DockerPageRoute,
  NodePageRoute,
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
      <ConfigProvider>
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
      </ConfigProvider>
    </>
  );
}

export default App;
