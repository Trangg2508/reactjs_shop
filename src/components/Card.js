import React from 'react'
import { Card, Modal } from 'antd';
const { Meta } = Card;

export default function Cards({ pro, handleQuickLook }) {

    return (
        <div>
            <a href={`/detail/${pro.id}`}>
                <Card className="product_card" hoverable cover={<img className="product_card_img" alt={pro.title} src={pro.thumbnail} />}>
                    <div className="product_card_overplay">
                        <h6 onClick={(e) => {
                            e.preventDefault();
                            handleQuickLook(pro.id);
                        }}
                            style={{ marginTop: '3px' }}
                        >Quicklook</h6>
                    </div>
                    <Meta className='product_card_info' title={pro.brand} description={pro.title} />
                </Card>
            </a>


        </div>
    )
}
