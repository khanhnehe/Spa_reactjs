import React from 'react';
import './Carousel.scss'
const MyCardComponent = () => {
    return (
        <>
            <div className='row mt-5'>
                <div className="container col-9">
                    {/* <div className='row'>
                    <svg className="relax-img-1"></svg>
                </div> */}
                    <div className="row mt-3">
                        <div className='text-one display-4 fst-italic  border-2 border-bottom'>Trãi nghiệm thư giản tuyệt vời!</div>
                        <div className="col-custom">
                            <div className="img-custom me-3 card shadow-sm" >
                                <svg className="relax-img-1" width="100%" height={225}>
                                </svg>
                                <div className="card-body">
                                    <div className="col d-flex flex-column position-static">
                                        <h4 >Featured post</h4>
                                        <div><h>
                                            "This is a wider card with supporting text below as a natural lead-in to additional content."
                                        </h></div>
                                        <a href="#" className="stretched-link">Xem thêm</a>
                                    </div>
                                </div>
                            </div>
                            <div className="img-custom card me-3 shadow-sm">
                                <svg className="relax-img-2 " width="100%" height={225} >
                                </svg>
                                <div className="card-body">
                                    <div className="col d-flex flex-column position-static">
                                        <h4 >Featured post</h4>
                                        <h>
                                            "This is a wider card with supporting text below as a natural lead-in to additional content."
                                        </h>
                                        <a href="#" className="stretched-link">Xem thêm</a>
                                    </div>
                                </div>
                            </div>
                            <div className="img-custom card shadow-sm">
                                <svg className="relax-img-3" width="100%" height={225} >

                                </svg>
                                <div className="card-body">
                                    <div className="col d-flex flex-column position-static">
                                        <h4 >Featured post</h4>
                                        <h >
                                            "This is a wider card with supporting text below as a natural lead-in to additional content."
                                        </h>
                                        <a href="#" className="stretched-link">Xem thêm</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col">
                        <div className="img-custom">
                            <svg className="relax-img-4 " width="100%" height={225} >
                                <title>Placeholder</title>
                                <text className='text-child'>Massage</text>
                            </svg>
                            <div className="card-body">
                                <p className="card-text">
                                    "Card 4 content goes here."
                                </p>

                            </div>
                        </div>
                    </div> */}
                    </div>
                </div>
            </div>

        </>

    );
};

export default MyCardComponent;
