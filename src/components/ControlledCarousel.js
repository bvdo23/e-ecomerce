import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage';
import Banner from '../assets/Banner.png';
import Banner2 from '../assets/Banner2.png';
function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };


    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <CarouselImage src={Banner} />
            </Carousel.Item>
            <Carousel.Item>
                <CarouselImage src={Banner2} />
            </Carousel.Item>
            <Carousel.Item>
                <CarouselImage src={Banner2} />
            </Carousel.Item>
        </Carousel>
    );
}

export default ControlledCarousel;