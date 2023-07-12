import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import logo from '../assets/logo.png';
import { FavoriteBorder, LoginOutlined, Logout, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../reducer/handleCart';
import { clearList } from '../reducer/handleLove';
import Profile from './Profile';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Nav() {

  const [searchResults, setSearchResults] = useState([]);
  const [input, setInput] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  const [profileModal, setProfileModal] = useState(false);
  const handleCloseModal = () => {
    setProfileModal(false);
  }


  const cartItems = useSelector((state) => state.cart.cartItems);
  const loveItems = useSelector((state) => state.love.loveItem)

  // Calculate the total quantity of products in the cart
  useEffect(() => {
    let totalCount = 0;
    cartItems.forEach((item) => {
      totalCount += item.quantity;
    });
    setCartItemCount(totalCount);
  }, [cartItems]);



  useEffect(() => {
    if (input) {
      fetch(
        `https://dummyjson.com/products/search?q=${input}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.products);
          setSearchResults(data.products);
        });
    } else {
      setSearchResults(null);
    }
  }, [input]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const clearSearch = () => {
    setInput("");
    setSearchResults(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogIn = () => {
    navigate('/login');
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    dispatch(clearCart(cartItems));
    dispatch(clearList(loveItems));
    window.location.reload();
  };


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem onClick={() => setProfileModal(true)}>Profile</MenuItem>
      {profileModal && <Profile profileModal={profileModal} handleCloseModal={handleCloseModal} />}
      <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {localStorage.getItem('token') ? (
        <>
          <MenuItem onClick={() => setProfileModal(true)}>
            <p>Profile</p>
          </MenuItem>
          {profileModal && <Profile profileModal={profileModal} handleCloseModal={handleCloseModal} />}
          <MenuItem onClick={handleLogOut}>
            <p>LogOut</p>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={() => navigate('/login')}>
            <p>Login</p>
          </MenuItem>
          <MenuItem onClick={() => navigate('/signUp')}>
            <p>Sign up</p>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <a href='/'>
              <img src={logo} alt="Logo" style={{ width: '80px', height: '80px' }} />
            </a>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onChange={handleInputChange}
              value={input}
            />
            <SearchResults
              results={searchResults}
              input={input}
              clearSearch={clearSearch} />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <a href='/love'>
                <FavoriteBorder style={{ color: 'red' }} />
              </a>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <a href='/cart' style={{ color: 'black' }}>
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCart />
                </Badge>
              </a>
            </IconButton>
            {localStorage.getItem('token') ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>)
              : (
                <IconButton
                  size="medium"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleLogIn}
                  color="inherit"
                >
                  <LoginOutlined />
                </IconButton>
              )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div
        style=
        {{
          backgroundColor: 'black',
          display: 'flex',
          flexDirection: 'row',
          gap: '1.7rem',
          color: 'white',
          padding: '10px',
          justifyContent: 'center',
          fontFamily: 'inherit',
          fontSize: '1rem',
          color: 'white'
        }}>

        <a href='/' style={{ color: 'white' }}>Home</a>
        <a href='/category' style={{ color: 'white' }}>Categories</a>
        <a href='/contact' style={{ color: 'white' }}>Contact</a>
      </div>
    </Box>

  );
}