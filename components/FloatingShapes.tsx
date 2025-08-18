import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon } from './icons';

const shapes = Array.from({ length: 25 });

const colors = [
    'rgba(255, 182, 193, 0.7)', // light pink
    'rgba(255, 105, 180, 0.7)', // hot pink
    'rgba(255, 240, 245, 0.9)', // almost white pink
];

const FloatingShapes: React.FC = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {shapes.map((_, i) => {
                const size = Math.random() * 50 + 20;
                const duration = Math.random() * 20 + 15;
                const delay = Math.random() * 10;
                
                return (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            color: colors[i % colors.length],
                        }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                            y: -20,
                            opacity: [0, 1, 0],
                            scale: [1, 1.2, 1],
                            rotate: Math.random() * 40 - 20,
                        }}
                        transition={{
                            duration,
                            delay,
                            ease: 'easeInOut',
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                    >
                         <HeartIcon style={{ width: size, height: size, filter: `blur(${Math.random() * 3}px)` }} />
                    </motion.div>
                );
            })}
        </div>
    );
};

export default FloatingShapes;
