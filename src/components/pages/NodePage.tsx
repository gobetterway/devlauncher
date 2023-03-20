
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Container from '@mui/material/Container';
import { NodeDotJsIcon } from '../../assets/icons/NodeDotJs';

export const NodePage = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <h1>Node</h1>
  </Container>
)

export const route =
{
  path: "/node",
  element: <NodePage />
}

export const MenuEntry = () => (
  <ListItemButton href='/node'>
    <ListItemIcon>
      <NodeDotJsIcon />
    </ListItemIcon>
    <ListItemText primary="Node" />
  </ListItemButton>
)