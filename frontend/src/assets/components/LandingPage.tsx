// LandingPage.tsx
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

// Import the CSS file
import './LandingPage.css';

// Define the team member data structure with a type
type TeamMember = {
  name: string;
  role: string;
  imgSrc: string;
};

// Array of team members
const teamMembers: TeamMember[] = [
  {
    name: 'Daniel Criss',
    role: 'CEO & Founder',
    imgSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'David Milan',
    role: 'UI/UX Designer',
    imgSrc: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Angelina',
    role: 'Head of Marketing',
    imgSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <main>
        <section className="hero container">
          <div className="hero-content">
            <h1>Our Story, the Journey That's Shaped <span>Our</span> Success</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="hero-image-wrapper">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1170&q=80" alt="Team discussion" />
            <div className="hero-card">
              <div className="hero-card-icon">65</div>
              <div>
                <p className="font-semibold">Projects Done</p>
                <p className="text-sm">Successfully Completed</p>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="container">
            <h2>Our agency knows work dominates our lives</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <p className="stat-value">10+</p>
                <p>Years of Experience</p>
              </div>
              <div className="stat-card">
                <p className="stat-value">30</p>
                <p>Agency experts</p>
              </div>
              <div className="stat-card">
                <p className="stat-value">7+</p>
                <p>Award Winnings</p>
              </div>
              <div className="stat-card">
                <p className="stat-value">25</p>
                <p>Projects completed</p>
              </div>
            </div>
          </div>
        </section>

        <section className="team-section container">
            <h2>Engage with Our <span>Creative Team</span></h2>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div className="team-member" key={member.name}>
                  <img src={member.imgSrc} alt={member.name}/>
                  <div className="team-member-info">
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
        </section>

        <section className="testimonial-section">
            <div className="container">
                <h4>TESTIMONIAL</h4>
                <img className="testimonial-avatar" src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&w=200&q=80" alt="David G. Hance"/>
                <div className="testimonial-quote-wrapper">
                     <FaQuoteLeft className="quote-icon" />
                    <p className="testimonial-quote">"Working with this agency was a game-changer for our business. Their strategic approach and creative execution delivered results beyond our expectations. Highly recommended!"</p>
                </div>
                <p className="testimonial-name">David G. Hance</p>
                <p className="testimonial-title">CEO, Tech Solutions</p>
            </div>
        </section>

        <section className="cta-section">
            <div className="container cta-content">
                <h2>Transform your Business with us. Let's talk for a Free Consultation</h2>
                <button className="btn btn-primary btn-cta">
                    Get a quote <FiArrowRight />
                </button>
            </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;