
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SettingsIcon from '@mui/icons-material/Settings';

export const ConfigurationPage = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <h1>Configuration</h1>
  </Container>
)

export const route =
{
  path: "/configuration",
  element: <ConfigurationPage />
}

export const MenuEntry = () => (
  <ListItemButton href='/configuration'>
    <ListItemIcon>
      <SettingsIcon />
    </ListItemIcon>
    <ListItemText primary="Configuration" />
  </ListItemButton>
)