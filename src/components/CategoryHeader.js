import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function CategoryHeader() {
    const [cates, setCates] = useState([]);
    const { type } = useParams();

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

    return (
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
                fontSize: '1rem'
            }}>
            {cates.slice(0, 13).map((cate) => (
                <div key={cate}>{cate.charAt(0).toUpperCase() + cate.slice(1)}</div>
            ))}
        </div>
    );
}