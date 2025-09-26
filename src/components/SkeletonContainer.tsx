import React from 'react';

interface SkeletonContainerProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

const SkeletonContainer: React.FC<SkeletonContainerProps> = ({ 
  title = "Section Title", 
  description = "This is a placeholder section that can be customized with your content.",
  children,
  className = ""
}) => {
  return (
    <div className={`h-screen bg-white flex items-center justify-center ${className}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          {title}
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          {description}
        </p>
        
        {children ? (
          children
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Feature 1</h3>
              <p className="text-gray-600">
                This is a placeholder for your content. Replace this with your actual content.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Feature 2</h3>
              <p className="text-gray-600">
                This is a placeholder for your content. Replace this with your actual content.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Feature 3</h3>
              <p className="text-gray-600">
                This is a placeholder for your content. Replace this with your actual content.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkeletonContainer;
