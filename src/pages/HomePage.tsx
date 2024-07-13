import React from 'react';
import exteriorBookCafe from '../assets/videos/book-cafe/Exterior+-+Day.mp4';
import CustomVideo from '../components/video/CustomVideo';

const HomePage: React.FC = () => {
    return (
        <div>
            <CustomVideo src={exteriorBookCafe}/>
        </div>
    );
};

export default HomePage;
