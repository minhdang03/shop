import React from 'react';

const MainSlide: React.FC = () => {
    return (
        <div className="relative w-full aspect-[21/9] md:aspect-[21/7]">
            <img 
                src="https://scontent.fsyd11-2.fna.fbcdn.net/v/t39.30808-6/380540634_218204701240591_4171387187507845828_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dZZpR_CCQ8IQ7kNvgEvbpOu&_nc_zt=23&_nc_ht=scontent.fsyd11-2.fna&_nc_gid=AWX1D4qPdnyGaCSIf1IDIJN&oh=00_AYDaM5fqwA4skwqzV3yROZbyYPzDjlLTahUdx7FZLHdq6Q&oe=676702A5" 
                alt="Banner chính" 
                loading="lazy" 
                className="w-full h-full object-cover"
            />
        </div>
    );
}

export default MainSlide;