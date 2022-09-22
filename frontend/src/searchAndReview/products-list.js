import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/product";
import { Link } from "react-router-dom";

import BlueBerryImage from '../images/local-farms-organic-mixed-berries-frozen.jpg'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Pagination from '@mui/material/Pagination';
import OutlinedInput from "@mui/material/OutlinedInput";

const RestaurantsList = props => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName ] = useState("");
  const [searchCuisine, setSearchCuisine ] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  const [value, setValue] = React.useState(3);
  const [productsPerPage, setProductsPerPage] = useState();
  const [productCount, setProductCount] = useState();
  const [page, setPage] = React.useState(1);

  const pageCount = Math.ceil(productCount / productsPerPage);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };
  
  useEffect(() => {
    handleFetchData();
    window.scrollTo(0, 0);
  }, [page]);

  const handleFetchData = async () => {
    retrieveRestaurants(page - 1);
  };

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
    
  };

  const retrieveRestaurants = (page) => {
    RestaurantDataService.getAll(page)
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
        setProductCount(response.data.total_restaurants);
        setProductsPerPage(response.data.entries_per_page);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(response => {
        console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name")
  };

  const findByCuisine = () => {
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine")
    }
  };

  return (
    <div>
      <div className="row pb-1 mb-2 mt-4">
        <div className="input-group col-lg">
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '40ch' },
          }}
        >
          <TextField
            sx={{ mt: 1 }}
            size="small"
            id="outlined-basic" 
            label="Product Name" 
            variant="outlined"
            type="text"
            placeholder="Search by product name"
            value={searchName}
            onChange={onChangeSearchName}
          />
        </Box>
          <div >
            <Button
              sx={{ ml: 1, mt: 1 }}
              style={{minHeight: '40px'}}
              variant="outlined"
              type="button"
              onClick={findByName}
            >
              Search
            </Button>
          </div>
        </div>
        
        <div className="input-group col-lg">
        <FormControl sx={{ mt: 1, ml: -17, minWidth: 190 }} size="small">
          <InputLabel id="demo-simple-select-helper-label">Search by cuisine</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            MenuProps={MenuProps}
            onChange={onChangeSearchCuisine}
            input={
              <OutlinedInput id="select-multiple-chip" label="Search by cuisine" />
            }
          >
            {cuisines.map(cuisine => {
                return (
                  <MenuItem value={cuisine}> {cuisine.substr(0, 18)} </MenuItem>
                )
              })}
          </Select>
          
      </FormControl>
          <div>
            <Button
              sx={{ ml: 2, mt: 1 }}
              style={{minHeight: '40px'}}
              variant="outlined"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </Button>
          </div>

        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant) => {
          return (
            <div className="col-lg-4 pb-1">
              <div>
                <div>
                  <Card sx={{ maxWidth: 400, mb: 4, mt: 3 }}>
                    <Link to={"/restaurants/"+restaurant._id} style={{ textDecoration: 'none', color: '#000' }}>
                      <CardActionArea>
                          <CardMedia
                            component="img"
                            alt="Products"
                            height="140"
                            image={BlueBerryImage}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {restaurant.name}
                            </Typography>
                            <Stack spacing={1}>
                              <Rating name="read-only" size="small" value={value} readOnly />
                            </Stack>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
                              A description of the bakery item
                            </Typography>
                            <Typography variant="body2"  sx={{ mb: 1 }} color="text.secondary">
                              Cuisine: {restaurant.cuisine}
                            </Typography>
                          </CardContent>
                          </CardActionArea>
                        </Link>

                        <CardActions>
                          <ShoppingCartIcon sx={{ mr: 1 }} color="primary"/>
                          <Button size="small">Add to Cart</Button>
                        </CardActions>        
                      </Card>
                </div>
              </div>
            </div>
          );
        })}

      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(event, value) => setPage(value)}
          size="large"
        />
      </div>
    </div>
  );
};

export default RestaurantsList;