import React from 'react';

const WomenSlide: React.FC = () => {
    return (
        <div className="relative w-full aspect-[21/9] md:aspect-[21/7]">
            <img 
                src="/images/main/nu.jpg" 
                alt="Banner nước hoa nữ" 
                loading="lazy"
                className="w-full h-full object-cover"
            />
        </div>
    );
}

export default WomenSlide;