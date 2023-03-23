import { open } from '@tauri-apps/api/dialog';
import { appDataDir } from '@tauri-apps/api/path';
import { Button, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SettingsIcon from '@mui/icons-material/Settings';
import { useConfig } from '../../App';

export const ConfigurationPage = () => {
  const [config, dispatch] = useConfig()


  const selectBaseDirEmplacement = async () => {
    const selected = await open({
      directory: true,
      multiple: false,
      defaultPath: await appDataDir(),
    });

    dispatch(['setBaseDir', selected as string])

    // if (Array.isArray(selected)) {
    //   // user selected multiple directories
    // } else if (selected === null) {
    //   // user cancelled the selection
    // } else {
    //   // user selected a single directory
    // }
  }


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <h1>Configuration Page</h1>
          <Button onClick={() => selectBaseDirEmplacement()}>Select Folder</Button> {config.baseDir}
        </Paper>
      </Grid>
    </Container>
  )
}

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