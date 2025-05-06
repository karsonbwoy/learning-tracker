import React from 'react';

const LoadingComponent = () => {
    return (
        <div className='flex justify-center mt-8'>
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-gray-500"></div>
        </div>
    );
};

export default LoadingComponent;