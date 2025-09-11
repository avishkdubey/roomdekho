import React, { useEffect, useRef } from 'react';

interface FadeInUpBoxProps {
    children: React.ReactNode;
}

const FadeInUpBox: React.FC<FadeInUpBoxProps> = ({ children }) => {
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    observer.unobserve(entry.target);
                }
            }, { threshold: 0.2 }
        );

        if (boxRef.current) {
            observer.observe(boxRef.current);
        }

        return () => { if (boxRef.current) observer.disconnect(); };
    }, []);

    return (
        <div ref={boxRef} className="opacity-0 transform translate-y-10 transition-all duration-1000 ease-out">
            {children}
        </div>
    );
};

export default FadeInUpBox;
