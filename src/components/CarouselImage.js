import React from 'react';

function CarouselImage({ src, alt, text }) {
    return (

        <>
            <div classNames='home-banner'>
                <img src={src} alt={alt} />
                {text && <p>{text}</p>}
            </div>
        </>
    );
}

export default CarouselImage;
