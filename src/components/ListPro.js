import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';


import Cards from './Card';
import QuickLook from './quickLook';



export default function ListPro() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=42&skip=52')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching products. Status: ' + response.status);
        }
      })
      .then((pro) => {
        setProducts(pro.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuickLook = (productId) => {
    setOpen(productId);
  };




  return (
    <div style={{ margin: '4em' }}>

      <div className="col-lg-12">
        <div className="section-title from-blog__title">
          <h2>Chosen for you</h2>
        </div>
      </div>
      <Grid container spacing={3}>
        {products &&
          products.map((pro) => (
            <Grid key={pro.id} item xs={12} sm={4} md={2}>
              <Cards pro={pro} handleQuickLook={handleQuickLook} />
            </Grid>
          ))}
      </Grid>

      <QuickLook
        open={open}
        products={products}
        handleClose={handleClose}
      />
    </div>
  );
}