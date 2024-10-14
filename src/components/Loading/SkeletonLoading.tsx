

const SkeletonLoading = () => {
    return (
        <div className={`bg-black h-full w-full absolute inset-0`}>
            <div className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}>
                <div
                    className="animate-spin rounded-full border-t-transparent border-primary border w-10 aspect-square"></div>
            </div>
        </div>
    );
};

export default SkeletonLoading;
