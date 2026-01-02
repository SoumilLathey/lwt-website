import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import './UserStories.css';

const UserStories = () => {
    const stories = [
        {
            id: 8,
            name: "Vijay Sharma",
            role: "G.M, Delhi Electric Company",
            quote: "A robust and precise weighing solution that supports our daily cable production and logistics efficiently.",
            initials: "VS",
            image: "/images/testimonials/vijay-sharma.png"
        },
        {
            id: 2,
            name: "Mahesh Chand Gupta",
            role: "Retired IAS",
            quote: "The solar plant is operating reliably, and the performance metrics are in line with the estimates provided at the time of installation.",
            initials: "MG",
            image: "/images/testimonials/mahesh-chand-gupta.jpg"
        },
        {
            id: 9,
            name: "Kanti Prasad",
            role: "Directorate of Veterinary Services",
            quote: "Reliable products and great service. The team at Lathey Weigh Trix is very professional and helpful.",
            initials: "KP",
            image: "/images/testimonials/kanti-prasad.jpg"
        },

        {
            id: 5,
            name: "Rajat Bhattar",
            role: "Architect",
            quote: "The solar installation has reduced our energy costs by nearly 40%. The ROI calculation was accurate, and the system is performing perfectly.",
            initials: "RB",
            image: "/images/testimonials/rajat-bhattar.jpg"
        },
        {
            id: 6,
            name: "K.B. Sharma",
            role: "VP Cane LH Sugar Factories, Pilibhit",
            quote: "We have been using LWT’s weighing solutions in our sugar industry operations since 2007. Their equipment has consistently delivered accuracy and dependable performance.",
            initials: "KS",
            image: "/images/testimonials/kb-sharma.jpg"
        },
        {
            id: 7,
            name: "Umakant Agrawal",
            role: "Charted Accountant",
            quote: "We are extremely pleased with the quality of service and the performance of the products delivered by Lathey Weigh Trix.",
            initials: "U",
            image: "/images/testimonials/umakant.jpg"
        },
        {
            id: 1,
            name: "Modi Sugar Industries",
            role: "Public Limited Company",
            quote: "The products are reliable, accurate, and well-engineered. The team provides professional service and dependable long-term support.",
            initials: "MS",
            image: "/images/testimonials/modi-sugar.png"
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
                        Our clients choose us for engineering expertise, dependable service, and long-term value creation across weighing systems and solar EPC projects.
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
                                transform: `translateX(calc(-${currentIndex} * (100% / ${itemsPerView} + (2rem / ${itemsPerView}))))`
                            }}
                        >
                            {stories.map((story) => (
                                <div key={story.id} className="story-card">
                                    <div className="quote-icon">“</div>
                                    <div className="stars" style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                                        ))}
                                    </div>
                                    <p className="story-text">{story.quote}</p>
                                    <div className="client-info">
                                        <div className="client-avatar">
                                            {story.image ? (
                                                <img src={story.image} alt={story.name} />
                                            ) : (
                                                story.initials
                                            )}
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
