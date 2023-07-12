import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { useNavigate, useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { StarOutline } from '@mui/icons-material';
import { yellow } from '@mui/material/colors';
import { addToCart } from '../reducer/handleCart';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, DialogContentText, Snackbar, Alert } from '@mui/material';
import { addToList, removeFromList } from '../reducer/handleLove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function DetailPro() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});

  const [require, setRequire] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const listLove = useSelector((state) => state.love.loveItem);
  const [openLove, setOpenLove] = useState(false);


  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Add To Cart successfully!',
      duration: 3,
    });
  };




  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching products. Status: ' + response.status);
        }
      })
      .then((data) => {
        setDetail(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!detail.title) {
    return <div>Loading...</div>;
  };

  const handleClickOpen = (pro) => {
    if (localStorage.getItem('token') !== null) {
      dispatch(addToCart(pro));
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


  const handleClose = () => {
    setOpenLove(false);
  };

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            {detail.images && detail.images.length > 0 && (
              <div className="lg:w-1/2 w-full lg:pr-5 lg:py-3 mt-3 lg:mt-0 object-cover">
                <ImageGallery
                  thumbnailPosition="left"
                  showPlayButton={false}
                  showNav={false}
                  thumbnailHeight={200}
                  originalHeight={200}
                  items={detail.images.map((image) => ({ original: image, thumbnail: image }))}
                />
              </div>
            )}

            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{detail.brand.toUpperCase()}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{detail.title.charAt(0).toUpperCase() + detail.title.slice(1)}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <span className="text-gray-600 ml-3">Rating: {detail.rating}</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  {detail.rating && detail.rating >= 4.7 ? (
                    <div>
                      <StarIcon sx={{ color: yellow[700] }} />
                      <StarIcon sx={{ color: yellow[700] }} />
                      <StarIcon sx={{ color: yellow[700] }} />
                      <StarIcon sx={{ color: yellow[700] }} />
                      <StarIcon sx={{ color: yellow[700] }} />
                    </div>
                  ) : detail.rating && (4 < detail.rating && detail.rating < 4.7) ? (
                    <div>
                      <StarIcon sx={{ color: yellow[700] }} />
                      <StarIcon sx={{ color: yellow[700] }} />
                      <StarIcon sx={{ color: yellow[700] }} />
                      <StarIcon sx={{ color: yellow[700] }} />
                      <StarHalfIcon sx={{ color: yellow[700] }} />
                    </div>
                  ) : detail.rating && detail.rating === 4 ? (
                    <div>
                      <StarIcon sx={{ color: yellow[700] }} />
                      <StarIcon sx={{ color: yellow[700] }} />
                      <StarIcon sx={{ color: yellow[700] }} />
                      <StarIcon sx={{ color: yellow[700] }} />
                      <StarOutline />
                    </div>
                  ) : detail.rating && detail.rating < 4 ? (
                    <div>
                      <StarIcon sx={{ color: yellow[700] }} />
                      <StarIcon sx={{ color: yellow[700] }} />
                      <StarIcon sx={{ color: yellow[700] }} />
                      <StarOutline />
                      <StarOutline />
                    </div>
                  ) : null}
                </span>
              </div>
              <p className="leading-relaxed">{detail.description}</p>
              <div className=" mt-6 items-center pb-2 border-gray-100 mb-5">
                <div class="flex border-t border-gray-200 py-2">
                  <span class="text-gray-500">Category</span>
                  <span class="ml-auto text-gray-900">{detail.category.charAt(0).toUpperCase() + detail.category.slice(1)}</span>
                </div>
                <div class="flex border-t border-gray-200 py-2">
                  <span class="text-gray-500">Discount (%)</span>
                  <span class="ml-auto text-gray-900">{detail.discountPercentage}</span>
                </div>
                <div class="flex border-t border-b mb-2 border-gray-200 py-2">
                  <span class="text-gray-500">Stock</span>
                  <span class="ml-auto text-gray-900">{detail.stock}</span>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">$ {detail.price}</span>
                <button
                  class="flex ml-auto text-white bg-green-700 border-0 py-2 px-6 focus:outline-none hover:bg-green-800 rounded"
                  onClick={() => {
                    handleClickOpen(detail);
                  }}
                >
                  Add to cart
                </button>

                {listLove.find(liked => liked.id === detail.id) ? (
                  <button
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                    onClick={() => handleClickRemoveLove(detail)}
                  >

                    <FavoriteIcon style={{ fill: 'red' }} />
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </button>
                ) : (
                  <button
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                    onClick={() => handleClickLove(detail)}
                  >

                    <FavoriteBorderIcon className="heart-icon outlined" />
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </button>

                )}
                <Snackbar open={openLove} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
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
                  Please log in to add products to cart.
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
      </section>
    </div>
  );
}
