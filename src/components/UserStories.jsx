import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './UserStories.css';

const UserStories = () => {
    const stories = [
        {
            id: 1,
            name: "Rahul Sharma",
            role: "Plant Manager, ABC Industries",
            quote: "Lathey Weigh Trix provided us with a weighbridge solution that has significantly improved our logistics efficiency. The precision and durability are unmatched.",
            initials: "RS"
        },
        {
            id: 2,
            name: "Priya Patel",
            role: "Operations Head, Solar Tech Solutions",
            quote: "Their Solar EPC services are top-notch. From installation to maintenance, the team was professional and delivered ahead of schedule. Highly recommended!",
            initials: "PP"
        },
        {
            id: 3,
            name: "Vikram Singh",
            role: "Director, Green Fields Logistics",
            quote: "We've been using their industrial scales for over 5 years. The support and service are excellent, and the product quality speaks for itself.",
            initials: "VS"
        },
        {
            id: 4,
            name: "Amit Kumar",
            role: "CEO, TechBuild Construct",
            quote: "Outstanding service quality. The weighbridge installation was done in record time without disrupting our daily operations.",
            initials: "AK"
        },
        {
            id: 5,
            name: "Sarah Johnson",
            role: "Facility Manager, Global Exports",
            quote: "The solar installation has reduced our energy costs by 40%. The ROI calculation was accurate, and the system is performing perfectly.",
            initials: "SJ"
        },
        {
            id: 6,
            name: "Rajesh Verma",
            role: "MD, Verma Transport",
            quote: "Reliable, accurate, and robust. That's how I describe their weighing scales. Their after-sales support is also very responsive.",
            initials: "RV"
        },
        {
            id: 7,
            name: "Anita Desai",
            role: "Logistics Coordinator, FastTrack",
            quote: "We needed a custom weighing solution for our specific requirements, and LWT delivered exactly what we needed. Great customization capabilities.",
            initials: "AD"
        },
        {
            id: 8,
            name: "Mohd. Irfan",
            role: "Owner, Irfan Agro",
            quote: "Best solar water pump solution in the market. It has solved our irrigation problems completely. Thank you Lathey Weigh Trix team.",
            initials: "MI"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);

    // Responsive items per view
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerView(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerView(2);
            } else {
                setItemsPerView(3);
            }
        };

        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(stories.length / itemsPerView);
    const maxIndex = stories.length - itemsPerView;

    const nextSlide = () => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    };

    // Auto-slide
    useEffect(() => {
        const interval = setInterval(() => {
            if (window.innerWidth >= 768) { // Only auto-slide on larger screens if desired, or always
                nextSlide();
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [itemsPerView, maxIndex]);

    return (
        <section className="user-stories-section">
            <div className="user-stories-container">
                <div className="user-stories-header">
                    <h2 className="user-stories-title">Client Success Stories</h2>
                    <p className="user-stories-subtitle">
                        Discover how we help businesses streamline operations and achieve their goals through our weighing and solar solutions.
                    </p>
                </div>

                <div className="stories-slider-wrapper">
                    <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous story">
                        <ChevronLeft size={24} />
                    </button>

                    <div className="stories-track-container">
                        <div
                            className="stories-track"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / itemsPerView + (2 / itemsPerView))}%)`,
                                // Explanation: 100% / itemsPerView is the width of one item. 
                                // But we also have a gap of 2rem. 
                                // Simpler approach: translateX(-currentIndex * (100/itemsPerView)) if we account for gap in width calculation OR
                                // use a simpler calc.

                                // Actually, with gap it's tricky. 
                                // Let's simplify: translateX of ( -currentIndex * (100 / itemsPerView) ) % 
                                // and hope flex-basis takes care of gap.
                                // If we use gap: 2rem, the movement needs to include the gap.
                                // Let's rely on the card width calc in CSS being accurate.
                                // transform: `translateX(calc(-${currentIndex} * (100% / ${itemsPerView} + ${2/itemsPerView}rem)))` 
                                // But the rem unit is mixed with %.

                                // Alternate robust strategy: 
                                // Move by 100% of the item width (including gap).
                                // Width of item = (100% - (itemsPerView - 1) * 2rem) / itemsPerView.
                                // That is complicated.

                                // Easiest: Use specific % gap if possible, or just use 100% translation for single items.
                                // Here we are sliding one item at a time.
                                // Let's try to match the index.
                                // If we have 3 items:
                                // Item width ~ 31%. Gap ~ 2%.
                                // Move 1 item = 33.33%.
                                transform: `translateX(calc(-${currentIndex} * (100% / ${itemsPerView} + (2rem / ${itemsPerView}))))`
                            }}
                        >
                            {stories.map((story) => (
                                <div key={story.id} className="story-card">
                                    <div className="quote-icon">“</div>
                                    <p className="story-text">{story.quote}</p>
                                    <div className="client-info">
                                        <div className="client-avatar">
                                            {story.initials}
                                        </div>
                                        <div className="client-details">
                                            <h4>{story.name}</h4>
                                            <p>{story.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="slider-btn next" onClick={nextSlide} aria-label="Next story">
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className="slider-dots">
                    {[...Array(Math.max(0, stories.length - itemsPerView + 1))].map((_, idx) => (
                        <div
                            key={idx}
                            className={`dot ${currentIndex === idx ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UserStories;
