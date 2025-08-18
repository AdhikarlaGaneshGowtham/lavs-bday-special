import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, Variants } from 'framer-motion';

const GiftBox = ({ isClicked, className }: { isClicked: boolean, className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="lidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#f87171', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: '#ef4444', stopOpacity:1}} />
            </linearGradient>
            <linearGradient id="boxGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#ef4444', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: '#dc2626', stopOpacity:1}} />
            </linearGradient>
             <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#fde047', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: '#facc15', stopOpacity:1}} />
            </linearGradient>
        </defs>
        
        {/* Box Base */}
        <path d="M15 42 H85 V90 H15 Z" fill="url(#boxGradient)" stroke="#b91c1c" strokeWidth="1"/>
        <path d="M46 42 V90 H54 V42 Z" fill="url(#ribbonGradient)" />
        
        <motion.g 
            animate={{ y: isClicked ? -25 : 0, rotate: isClicked ? -15 : 0, x: isClicked ? -5 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 10, delay: 0.1 }}
        >
            <path d="M10 30 H90 V42 H10 Z" fill="url(#lidGradient)" stroke="#b91c1c" strokeWidth="1"/>
            <path d="M46 30 V42 H54 V30 Z" fill="url(#ribbonGradient)" />
            <g>
                <path d="M50 30 C 30 30, 30 10, 50 15" fill="url(#ribbonGradient)" stroke="#eab308" strokeWidth="0.5" />
                <path d="M50 30 C 70 30, 70 10, 50 15" fill="url(#ribbonGradient)" stroke="#eab308" strokeWidth="0.5" />
                <circle cx="50" cy="18" r="5" fill="#fde047" stroke="#eab308" strokeWidth="0.5" />
            </g>
        </motion.g>
    </svg>
);

interface StartScreenProps {
    onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
    const [isClicked, setIsClicked] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-200, 200], [25, -25]);
    const rotateY = useTransform(x, [-200, 200], [-25, 25]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isClicked) {
            const rect = event.currentTarget.getBoundingClientRect();
            x.set(event.clientX - rect.left - rect.width / 2);
            y.set(event.clientY - rect.top - rect.height / 2);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleClick = () => {
        if (!isClicked) {
            setIsClicked(true);
            onStart();
        }
    };

    const titleText = "A Surprise for Lavanya💖".split(" ");
    const titleContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
    };
    const wordVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1, y: 0,
            transition: { type: 'spring', damping: 12, stiffness: 100 },
        },
    };

    return (
        <motion.div 
            className="relative flex flex-col items-center justify-center h-full text-center p-4 cursor-pointer overflow-hidden"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 800 }} 
        >
            <motion.h2
                className="text-5xl md:text-7xl font-dancing-script text-pink-500 mb-8 drop-shadow-lg pointer-events-none z-20"
                variants={titleContainerVariants}
                initial="hidden"
                animate="visible"
            >
                {titleText.map((word, index) => (
                    <motion.span
                        key={index}
                        className="inline-block mr-4"
                        variants={wordVariants}
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.h2>

            <motion.div
                style={{ rotateX, rotateY, scale: 1 }}
                whileHover={{ scale: !isClicked ? 1.05 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative w-48 h-48 md:w-64 md:h-64 z-20"
            >
                <GiftBox isClicked={isClicked} className="w-full h-full drop-shadow-xl" />
            </motion.div>

            <motion.p 
                className="mt-8 text-2xl text-gray-600 font-semibold pointer-events-none z-20"
                initial={{ opacity: 1 }}
                animate={{ opacity: isClicked ? 0 : 1 }}
                transition={{ duration: 0.3 }}
            >
                Tap the gift to open!
            </motion.p>
        </motion.div>
    );
};

export default StartScreen;
