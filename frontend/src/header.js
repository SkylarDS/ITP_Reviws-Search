import * as React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { useHistory  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

import Login from "./searchAndReview/login";
import AddReview from "./searchAndReview/add-review";
import Restaurant from "./searchAndReview/products";

export default function ButtonAppBar() {

  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

//   const handleKeyPress = (event) => {
//     if(event.key === 'Enter'){
//         window.location.replace("/restaurants");
//     }
//   };

  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = `/restaurants`; 
    history.push(path);
  }

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed">
          <Toolbar>
            <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                // href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Don&Sons
              </Typography>
            </Link>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

              <Link to={"/restaurants"} style={{ textDecoration: 'none', color: '#fff' }}>
                  All Products
              </Link>
              
            </Typography>
              
              {/* <Search onKeyPress={handleKeyPress} sx={{ mr: 2 }}> */}
                {/* <SearchIconWrapper> */}
                  
                  <Button color="inherit" style={{borderRadius: '30px'}} >      
                    <SearchIcon fontSize='large' onClick={routeChange} />
                </Button> 
                {/* </SearchIconWrapper> */}
                {/* <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search> */}

              { user ? (
                <Button color="inherit">      
                  <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                    Logout {user.name}
                  </a>
                </Button> 
                
              ) : (     
                <Link to={"/login"} className="nav-link">
                  <Button color="inherit">   
                  Login (Dummy)
                  </Button> 
                </Link>
              )}
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>

    
      <div className="container mt-3">
        <Switch>
          {/* <Route exact path={["/", "/restaurants"]} component={RestaurantsList} /> */}
          <Route 
            path="/restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}
