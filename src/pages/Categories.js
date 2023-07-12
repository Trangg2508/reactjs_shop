import React from 'react'
import MenuItems from '../components/MenuItems'
import { Breadcrumb } from 'antd';
import { Row } from 'antd';

export default function Categories() {
  return (
    <div>
      <Breadcrumb
        style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}
        items={[
          {
            title: <a href="/">Home</a>,
          },
          {
            title: 'Categories',
          },
        ]}
      />
      <Row>
        <div style={{ marginLeft: '20px' }} s>
          <MenuItems />
        </div>
      </Row>
    </div>
  )
}
