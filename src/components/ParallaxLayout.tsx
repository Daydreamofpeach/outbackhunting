import React from 'react';

interface ParallaxLayoutProps {
  children: React.ReactNode;
  darkMode?: boolean;
}

const ParallaxLayout: React.FC<ParallaxLayoutProps> = ({ children, darkMode = false }) => {
  return (
    <div className="w-full">
      {children}
    </div>
  );
};

export default ParallaxLayout;
