import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { FC } from 'react';

import { MenuEntry as DashboardMenuEntry } from '../pages/DashBoardPage';
import { MenuEntry as ConfigMenuEntry } from '../pages/ConfigurationPage';
import { MenuEntry as DockerMenuEntry } from '../pages/DockerPage';
import { MenuEntry as NodeMenuEntry } from '../pages/NodePage';

export const Drawer: FC<{
  drawerWidth: number;
  open: boolean;
  toggleDrawer: () => void;
}> = ({
  drawerWidth,
  open,
  toggleDrawer,
}) => {
    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
      ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
          position: 'relative',
          whiteSpace: 'nowrap',
          width: drawerWidth,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          boxSizing: 'border-box',
          ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
              width: theme.spacing(7),
            },
          }),
        },
      }),
    );

    return (
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <DashboardMenuEntry />
          <ConfigMenuEntry />
          <DockerMenuEntry />
          <NodeMenuEntry />
        </List>
      </Drawer>
    )
  }