import React from 'react';

const MainSlide: React.FC = () => {
    return (
        <div className="relative h-[600px]">
            <img 
                src="/images/main/main.jpg" 
                alt="Banner chính" 
                loading="lazy" 
                className="w-full h-full object-cover"
            />
            
        </div>
    );
}

export default MainSlide;