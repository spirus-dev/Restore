import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { DarkMode, LightMode} from '@mui/icons-material';

type Props = {
  darkMode: boolean;
  toogleDarkMode: () => void;
}

export default function NavBar({darkMode, toogleDarkMode}: Props) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">RE-STORE</Typography>
        <IconButton onClick={() => toogleDarkMode()}>
          {darkMode ? <DarkMode/> : <LightMode sx={{color: "yellow"}}/>}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}