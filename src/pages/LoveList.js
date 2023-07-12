import React, { useState } from 'react'
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../components/Card';
import { Grid } from '@mui/material';
import QuickLook from '../components/quickLook';
import { useNavigate } from 'react-router-dom';


export default function LoveList() {
  const lovePro = useSelector((state) => state.love.loveItem);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();


  const handleQuickLook = (productId) => {
    setOpen(productId);
  };


  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <h2 className='list__title' style={{ margin: '20px' }}>FAVORITES</h2>
      <div className="list__cards">
        {lovePro.length === 0 ? (
          <div className="centered__container">
            <div className="empty__message">
              <p>You have not loved any product yet.</p>
              <br />
              <Button onClick={() => navigate('/')} className="add__movies__button">Explore more products</Button>
            </div>
          </div>
        ) : (
          <Grid container spacing={3}>
            {lovePro &&
              lovePro.map((love) => (
                <Grid key={love.id} item xs={12} sm={6} md={2}>
                  <Cards pro={love} handleQuickLook={handleQuickLook} />
                </Grid>
              ))}
          </Grid>

        )}
        <QuickLook
          open={open}
          products={lovePro}
          handleClose={handleClose}
        />
      </div>

    </div>
  )
}
