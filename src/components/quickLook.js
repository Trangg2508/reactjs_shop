
import React, { useState } from 'react'
import { Modal } from 'antd';
import { Alert, AlertTitle, Box, Grid, Snackbar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Breadcrumbs, Typography } from '@mui/material';
import { StarOutlined } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, DialogContentText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToList, removeFromList } from '../reducer/handleLove';
import { addToCart } from '../reducer/handleCart';
import { message } from 'antd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';



export default function QuickLook({ open, products, handleClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [require, setRequire] = useState(false);
  const [openLove, setOpenLove] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Add To Cart successfully!',
      duration: 3,
    });
  };



  const listLove = useSelector((state) => state.love.loveItem);




  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    console.log('Item added to cart successfully:', product)

  };

  const handleClickOpen = (pro) => {
    if (localStorage.getItem('token') !== null) {
      handleAddToCart(pro);
      success();
      console.log('Item added to cart successfully:', pro)
    } else {
      setRequire(true);
    }
  };

  const handleClickClose = () => {
    setRequire(false);
  };

  const handleClickLove = (product) => {
    if (localStorage.getItem('token') !== null) {
      dispatch(addToList(product));
      setOpenLove(true);
      console.log('Movie added to list successfully:', product);
    } else {
      setRequire(true);
    }
  }
  const handleClickRemoveLove = product => {
    dispatch(removeFromList(product.id));
    console.log('Removed from like list successfully:', product);
  };


  const handleCloseLoveMess = () => {
    setOpenLove(false);
  };

  return (
    <Modal width={1000} visible={open !== false} centered onCancel={handleClose} footer={null}>
      {products &&
        products.map((pro) => {
          if (pro.id === open) {
            return (
              <div key={pro.id} >
                <section className="text-gray-600 body-font">
                  <div className="container px-0 py-0 mx-auto flex flex-col">
                    <div className="lg:w-4/8 mx-auto">
                      <div className="flex flex-col sm:flex-row mt-10">
                        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                          <div className="w-250 h-250 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                            <img style={{ width: '500px', height: '250px', objectFit: 'cover' }} src={pro.thumbnail} alt={pro.title} />
                          </div>
                          <div className="flex justify-center items-center pt-8">
                            <div className="font-medium">
                              {pro.rating && pro.rating > 4.7 ?
                                <div>
                                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                                </div>
                                : ""}
                              {pro.rating && (4 < pro.rating && pro.rating < 4.7) ?
                                <div>
                                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarHalfIcon />
                                </div>
                                : ""}

                              {pro.rating && pro.rating === 4 ?
                                <div>
                                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarOutlined />
                                </div>
                                : ""}
                              {pro.rating && pro.rating < 4 ?
                                <div>
                                  <StarIcon /><StarIcon /><StarIcon /><StarOutlined /><StarOutlined />
                                </div>
                                : ""}
                            </div>
                            <span className="text-base font-medium pl-4" >
                              Rating: {pro.rating}
                            </span>
                          </div>
                        </div>
                        <div className="sm:w-2/3 sm:pl-8 sm:py-6 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-left sm:text-left">
                          <p className="leading-relaxed text-gray-600 text-base mb-4">
                            <Breadcrumbs aria-label="breadcrumb">
                              <a className="proLook_breadcrumb_cate text-gray-500 hover:text-indigo-500" href="/category">
                                {pro.category && pro.category.charAt(0).toUpperCase() + pro.category.slice(1)}
                              </a>
                              <Typography color="text.primary" className="text-gray-500">{pro.brand}</Typography>
                            </Breadcrumbs>
                          </p>
                          <a className="text-xl text-gray-900 hover:text-indigo-500 hover:underline font-semibold" href={`/detail/${pro.id}`}>
                            {pro.title && pro.title.charAt(0).toUpperCase() + pro.title.slice(1)}
                          </a>
                          <p className="leading-relaxed text-gray-700 text-sm mb-6">{pro.description}</p>
                          <p className=" font-medium text-xl text-grey-600">Price: $ {pro.price}</p>
                          <a className="text-green-800 inline-flex items-center text-sm font-semibold mt-12" href={`/detail/${pro.id}`}>
                            See product details
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                              <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                          </a><br></br><br></br><br></br>
                          <div class="flex">
                            <button
                              class="flex ml-auto text-white bg-green-700 border-0 py-2 px-6 focus:outline-none hover:bg-green-800 rounded"
                              onClick={() => {
                                handleClickOpen(pro);
                              }}
                            >
                              Add to cart
                            </button>

                            {listLove.find(liked => liked.id === pro.id) ? (
                              <button
                                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                                onClick={() => handleClickRemoveLove(pro)}
                              >

                                <FavoriteIcon style={{ fill: 'red' }} />
                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                              </button>
                            ) : (
                              <button
                                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                                onClick={() => handleClickLove(pro)}
                              >

                                <FavoriteBorderIcon className="heart-icon outlined" />
                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                              </button>

                            )}
                            <Snackbar open={openLove} autoHideDuration={6000} onClose={handleCloseLoveMess}>
                              <Alert onClose={handleCloseLoveMess} severity="success" sx={{ width: '100%' }}>
                                Add to watch list successfully!
                              </Alert>
                            </Snackbar>
                            {contextHolder}
                          </div>
                        </div>
                        <Dialog
                          open={require}
                          onClose={handleClickClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title" >
                            Login Required
                          </DialogTitle>

                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Please log in to add products to cart and love list.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClickClose}>Cancel</Button>
                            <Button onClick={() => navigate('/login')} autoFocus>
                              Log In
                            </Button>
                          </DialogActions>
                        </Dialog>

                      </div>

                    </div>

                  </div>

                </section>
              </div>
            );
          }
          return null;
        })}
    </Modal>
  )
}
