import React from 'react';
import Hero from '../components/Hero';
import Positioning from '../components/Positioning';
import Products from '../components/Products';
import SolarSection from '../components/SolarSection';
import UserStories from '../components/UserStories';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <div>
            <Hero />
            <Positioning />
            <Products />
            <SolarSection />
            <UserStories />
            <Contact />
        </div>
    );
};

export default Home;
