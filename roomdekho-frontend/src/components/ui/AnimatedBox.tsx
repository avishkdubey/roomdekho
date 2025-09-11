import React, { useEffect, useRef } from 'react';

interface AnimatedBoxProps {
    children: React.ReactNode;
    direction: 'left' | 'right';
}

const AnimatedBox: React.FC<AnimatedBoxProps> = ({ children, direction }) => {
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-x-full', '-translate-x-full');
                    entry.target.classList.add('opacity-100', 'translate-x-0');
                    observer.unobserve(entry.target);
                }
            }, { threshold: 0.1 }
        );

        if (boxRef.current) {
            observer.observe(boxRef.current);
        }

        return () => { if (boxRef.current) observer.disconnect(); };
    }, []);

    const initialTransform = direction === 'left' ? '-translate-x-full' : 'translate-x-full';

    return (
        <div ref={boxRef} className={`w-11/12 md:w-4/5 mx-auto my-8 opacity-0 transform transition-all duration-1000 ease-in-out ${initialTransform}`}>
            {children}
        </div>
    );
};

export default AnimatedBox;
