import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

import { useHistory  } from "react-router-dom";

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
  mt: 1,
};

function AppAppBar() {
  const history = useHistory();

  const routeChange = () =>{ 
    let path = `/restaurants`; 
    history.push(path);
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="#"
            sx={{ fontSize: 24 }}
          >
            {'Don & Sons'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button color="inherit" style={{borderRadius: '30px'}} >      
              <SearchIcon fontSize='large' onClick={routeChange} />
            </Button> 

            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/premium-themes/onepirate/sign-in/"
              sx={rightLink}
            >
              {'Sign In'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/premium-themes/onepirate/sign-up/"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {'Sign Up'}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{mb:-10}} />
    </div>
  );
}

export default AppAppBar;