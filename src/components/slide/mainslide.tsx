import React from 'react';

const MainSlide: React.FC = () => {
    return (
        <div>
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