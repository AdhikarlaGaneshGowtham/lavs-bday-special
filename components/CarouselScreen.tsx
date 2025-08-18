
import React from 'react';
import { CAROUSEL_IMAGES } from '../constants';

interface CarouselScreenProps {
    name: string;
}

const CarouselScreen: React.FC<CarouselScreenProps> = ({ name }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full overflow-hidden">
            <div className="carousel-container mt-16 mb-24">
                <div className="carousel">
                    {CAROUSEL_IMAGES.map((src, index) => (
                        <div key={index} className="carousel-item">
                            <img src={src} alt={`Birthday memory ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="absolute bottom-1/4 transform -translate-y-1/2 text-center">
                <h2 className="text-5xl md:text-7xl font-dancing-script text-indigo-900 drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)]">
                    Happy Birthday, {name}!
                </h2>
            </div>
        </div>
    );
};

export default CarouselScreen;