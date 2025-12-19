import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';
import SolarSection from '../components/SolarSection';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <div>
            <Hero />
            <Products />
            <SolarSection />
            <Contact />
        </div>
    );
};

export default Home;
