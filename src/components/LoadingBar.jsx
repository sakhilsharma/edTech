import React, { useEffect, useState } from 'react';

const LoadingBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 100;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 200);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <div className="h-1 bg-gray-200">
                <div
                    className="h-full bg-blue-600 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default LoadingBar;