import React from 'react';
import Navbar from "@/components/navbar/navbar";
import HeroSection from "./hero-section";
import Footer from '@/components/footer';
import Section from "./section"
const LandingPage = () => {
    return (
          <div className="">
            <Navbar />
            <HeroSection />
            <Section />
            <Footer />
          </div>
    );
};

export default LandingPage;