import React from 'react';

const SkeletonLoading = () => {
    return (
        <div className={`bg-white h-full w-full absolute inset-0`}>
            <div className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-0.5`}>
                <div
                    className="animate-spin rounded-full border-t-transparent border-primary border w-10 aspect-square"></div>
            </div>
        </div>
    );
};

export default SkeletonLoading;
