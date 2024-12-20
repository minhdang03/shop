import React from 'react';

const MenSlide: React.FC = () => {
    return (
        <div className="relative w-full aspect-[21/9] md:aspect-[21/7]">
            <img 
                src="/images/main/nam.jpg" 
                alt="Banner nước hoa nam" 
                loading="lazy"
                className="w-full h-full object-cover" 
            />
        </div>
    );
}

export default MenSlide;