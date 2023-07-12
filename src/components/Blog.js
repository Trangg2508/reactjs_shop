import React from 'react'

export default function Blog() {
    return (
        <div>
            <section className="from-blog spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title from-blog__title">
                                <h2>From The Blog</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="blog__item">
                                <div className="blog__item__pic">
                                    <img src="https://www.ballarddesigns.com/howtodecorate/wp-content/uploads/2019/02/how-to-space-furniture-1.jpg" alt="" />
                                </div>
                                <div className="blog__item__text">
                                    <ul>
                                        <li><i class="fas fa-calendar-alt"></i>
                                            {new Date().getDate()} {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
                                        </li>
                                    </ul>
                                    <h5><a href="#">Transform Your Space</a></h5>
                                    <p>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="blog__item">
                                <div className="blog__item__pic">
                                    <img src="https://images.squarespace-cdn.com/content/v1/5e5485588b139b114f096da2/1628210549061-PBTETTA8GVO9EOUCZW2X/unsplash-image-O1DhTK0_1iQ.jpg" alt="" />
                                </div>
                                <div className="blog__item__text">
                                    <ul>
                                        <li><i class="fas fa-calendar-alt"></i>
                                            {new Date().getDate()} {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
                                        </li>
                                    </ul>
                                    <h5><a href="#">Accessorize to Elevate</a></h5>
                                    <p>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="blog__item">
                                <div className="blog__item__pic">
                                    <img src="https://blog.trendalytics.co/hs-fs/hubfs/copenhagen-fashion-week-street-style-spring-summer-2023-301747-1660167146432-main.700x0c.jpg?width=700&name=copenhagen-fashion-week-street-style-spring-summer-2023-301747-1660167146432-main.700x0c.jpg" alt="" />
                                </div>
                                <div className="blog__item__text">
                                    <ul>
                                        <li><i class="fas fa-calendar-alt"></i>
                                            {new Date().getDate()} {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
                                        </li>
                                    </ul>
                                    <h5><a href="#"> Fashion Trends for the Summer Season</a></h5>
                                    <p>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
