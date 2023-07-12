import React, { useEffect } from 'react';
import { Card, Menu, Switch } from 'antd';
import { useState } from 'react';
import { Grid } from '@mui/material';
import Cards from './Card';
import QuickLook from './quickLook';

export default function MenuItems() {
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('');
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  useEffect(() => {
    const baseURL = 'https://dummyjson.com/products?limit=20&skip=30';

    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.products);
        setProducts(data.products);
      })
      .catch((error) => console.log(error.message));
  }, []);


  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    const baseURL = `https://dummyjson.com/products/category/${e.key}`;
    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.products);
        setProducts(data.products)
      })
      .catch((error) => console.log(error.message));
  };
  const [cates, setCates] = useState([]);

  const baseURL = 'https://dummyjson.com/products/categories';

  useEffect(() => {
    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCates(data);
      })
      .catch((error) => console.log(error.message));
  }, []);


  const handleQuickLook = (productId) => {
    setOpen(productId);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      <div style={{ flex: '1 0 22%' }}>
        <Switch
          checked={theme === 'dark'}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
          style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            transform: 'translateX(150%)',
            backgroundColor: 'grey',
          }}
        />
        <br />
        <br />
        {cates &&
          cates.map((cate) => (
            <Grid>
              <Menu
                theme={theme}
                onClick={onClick}
                style={{ width: 256, textAlign: 'left' }}
                defaultOpenKeys={[cate]}
                selectedKeys={[current]}
                mode="inline"
                items={[{ key: cate, label: cate.charAt(0).toUpperCase() + cate.slice(1) }]}
                key={cate}
              />
            </Grid>
          ))}
      </div>
      <div style={{ flex: '78%', marginTop: '35px' }}>
        <Grid container spacing={1}>
          {products.map((pro, index) => (
            <Grid style={{ marginTop: '15px' }} key={pro.id} item xs={12} sm={6} md={3}>
              <Cards pro={pro} handleQuickLook={handleQuickLook} />
            </Grid>
          ))}
        </Grid>
        <QuickLook
          open={open}
          products={products}
          handleClose={handleClose} />
      </div>
    </div>
  );
}