import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Carousel.scss';


import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

const items = [
    {
        src: '/anh1.png',

    },
    {
        src: '/anhchay2.png',

    },
    {
        src: '/anh3.png',

    }
];

class NoCarouselIndicators extends CarouselIndicators {
    render() {
        return null; // Trả về null để không hiển thị số trang
    }
}


class Carouse extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img src={item.src} alt={item.altText}
                        className="d-block w-100"
                        style={{ width: "100%", height: "150px", objectFit: "cover", }}
                    />
                    {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
                </CarouselItem>
            );
        });

        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
                ride="carousel" // Sử dụng "carousel" để có chế độ tự động chuyển ảnh
                interval={3000} // Đặt giá trị interval ở đây 
                style={{
                    position: 'relative', height: "400px", overflow: "hidden", display: "flex"
                }}
                indicators={false}
                controls={false}


            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        );
    }
}


export default Carouse;