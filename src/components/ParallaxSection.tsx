import React from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ children, className = "" }) => {
  return (
    <section className={`w-full ${className}`}>
      {children}
    </section>
  );
};

export default ParallaxSection;
