
import React from 'react';
import { motion } from 'framer-motion';

const colors = ["#ffc700", "#ff6b6b", "#f77f00", "#d62828", "#fcbf49", "#eae2b7", "#ec4899", "#8b5cf6"];

interface PieceProps {
    i: number;
}

// --- ConfettiBlast ---
const BlastPiece: React.FC<PieceProps> = ({ i }) => {
    const angle = Math.random() * 360;
    const distance = Math.random() * 250 + 50; // How far it travels
    const startX = '50vw';
    const startY = '50vh';
    const endX = `calc(${startX} + ${Math.cos(angle * Math.PI / 180) * distance}px)`;
    const endY = `calc(${startY} + ${Math.sin(angle * Math.PI / 180) * distance}px)`;

    return (
        <motion.div
            className="absolute"
            style={{
                width: Math.random() > 0.4 ? '12px' : '8px',
                height: Math.random() > 0.4 ? '20px' : '8px',
                background: colors[i % colors.length],
                borderRadius: Math.random() > 0.5 ? '50%' : '4px',
                left: 0,
                top: 0,
            }}
            initial={{ x: startX, y: startY, opacity: 1, scale: 0.5, rotate: 0 }}
            animate={{
                x: endX,
                y: endY,
                opacity: 0,
                scale: 1,
                rotate: Math.random() * 720 - 360,
                transition: {
                    duration: Math.random() * 1 + 0.8,
                    ease: "easeOut",
                    delay: Math.random() * 0.2,
                }
            }}
        />
    );
};

export const ConfettiBlast: React.FC = () => {
    const numParticles = 200;
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-50">
            {Array.from({ length: numParticles }).map((_, i) => (
                <BlastPiece key={i} i={i} />
            ))}
        </div>
    );
};

// --- FallingConfetti ---
const FallingPiece: React.FC<PieceProps> = ({ i }) => {
    const startX = `${Math.random() * 100}vw`;
    const endX = `${Math.random() * 100}vw`;

    return (
        <motion.div
            className="absolute"
            style={{
                width: Math.random() > 0.4 ? '10px' : '6px',
                height: Math.random() > 0.4 ? '15px' : '6px',
                background: colors[i % colors.length],
                borderRadius: Math.random() > 0.5 ? '50%' : '4px',
                left: 0,
                top: 0,
            }}
            initial={{ x: startX, y: '-10vh', opacity: 1 }}
            animate={{
                x: endX,
                y: '110vh',
                rotate: Math.random() * 360,
                opacity: [1, 1, 0],
            }}
            transition={{
                duration: Math.random() * 5 + 8,
                ease: 'linear',
                repeat: Infinity,
                delay: Math.random() * 7,
            }}
        />
    );
};

export const FallingConfetti: React.FC = () => {
    const numParticles = 100;
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-40">
            {Array.from({ length: numParticles }).map((_, i) => (
                <FallingPiece key={i} i={i} />
            ))}
        </div>
    );
};
