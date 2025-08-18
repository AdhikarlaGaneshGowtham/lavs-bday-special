import React, { useState, useEffect,useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_MESSAGES, GREETING_GIFS } from '../constants';

interface GreetingScreenProps {
    name: string;
    onComplete: () => void;
}

const useTypingEffect = (text: string, speed: number = 50) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayedText('');
    indexRef.current = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!text) return;

    intervalRef.current = setInterval(() => {
      indexRef.current += 1;
      setDisplayedText(text.slice(0, indexRef.current));

      if (indexRef.current >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed]);

  return displayedText;
};

const GreetingScreen: React.FC<GreetingScreenProps> = ({ name, onComplete }) => {
    const [messageIndex, setMessageIndex] = useState(0);
    const [gifIndex, setGifIndex] = useState(0);
    const typedMessage = useTypingEffect(BIRTHDAY_MESSAGES[messageIndex]);

    const handleNextMessage = () => {
        if (messageIndex < BIRTHDAY_MESSAGES.length - 1) {
            setMessageIndex(prev => prev + 1);
            setGifIndex(prev => (prev + 1) % GREETING_GIFS.length);
        } else {
            onComplete();
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center text-white">
            <AnimatePresence mode="wait">
                <motion.img
                    key={gifIndex}
                    src={GREETING_GIFS[gifIndex]}
                    alt="Cute animated character"
                    className="w-48 h-48 md:w-64 md:h-64 object-contain pointer-events-none rounded-xl"
                    initial={{ opacity: 0, y: -50, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.5 }}
                    transition={{ duration: 0.5 }}
                />
            </AnimatePresence>
            
            <h1 className="text-4xl md:text-5xl font-dancing-script text-indigo-900 drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)] my-4">
                Happy Birthday,<span className=' font-bold '> {name[0]+name.slice(1,).toLowerCase()}</span>💖
            </h1>
            
            <motion.div
                key={messageIndex}
                className="w-full max-w-md bg-black/50 p-6 rounded-2xl shadow-lg cursor-pointer backdrop-blur-sm"
                onClick={handleNextMessage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-lg md:text-xl min-h-[6rem] flex items-center justify-center">
                    {typedMessage}
                </p>
            </motion.div>
        </div>
    );
};

export default GreetingScreen;