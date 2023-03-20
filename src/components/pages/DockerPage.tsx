
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Container from '@mui/material/Container';
import { DockerIcon } from '../../assets/icons/DockerIcon';

export const DockerPage = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <h1>Docker</h1>
  </Container>
)

export const route =
{
  path: "/docker",
  element: <DockerPage />
}

export const MenuEntry = () => (
  <ListItemButton href='/docker'>
    <ListItemIcon>
      <DockerIcon />
    </ListItemIcon>
    <ListItemText primary="Docker" />
  </ListItemButton>
)