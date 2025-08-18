import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Screen } from './types';
import { BACKGROUND_MUSIC_SRC } from './constants';
import StartScreen from './components/NameInputScreen';
import GreetingScreen from './components/GreetingScreen';
import CarouselScreen from './components/CarouselScreen';
import { VolumeUpIcon, VolumeOffIcon } from './components/icons';
import { ConfettiBlast, FallingConfetti } from './components/Confetti';
import FloatingShapes from './components/FloatingShapes';

const screenVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

const App: React.FC = () => {
    const [screen, setScreen] = useState<Screen>(Screen.START);
    const [name] = useState<string>('LAVANYA');
    const [isMuted, setIsMuted] = useState(true);
    const [showBlast, setShowBlast] = useState(false);
    const [showFalling, setShowFalling] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Create audio element programmatically to have more control
        if (!audioRef.current) {
            const audio = new Audio(BACKGROUND_MUSIC_SRC);
            audio.loop = true;
            (audioRef as React.MutableRefObject<HTMLAudioElement>).current = audio;
        }
    }, []);

    const handlePlayAudio = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(error => {
                console.log("Audio playback was prevented by the browser. A user interaction is needed.");
            });
            setIsMuted(false);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
            setIsMuted(audioRef.current.muted);
        }
    };

    const handleStart = () => {
        setShowBlast(true);
        setShowFalling(true);
        if (isMuted) { // Autoplay on first interaction
           handlePlayAudio();
        }
        
        // Hide the one-time blast effect after it's done
        setTimeout(() => setShowBlast(false), 2000);

        // Delay the transition to let the "blast" happen
        setTimeout(() => {
            setScreen(Screen.GREETING);
        }, 1200);
    };

    const handleGreetingComplete = () => {
        // Keep the falling confetti for the final screen for a cohesive festive feel
        setScreen(Screen.CAROUSEL);
    };

    const getScreenComponent = () => {
        switch (screen) {
            case Screen.START:
                return <StartScreen onStart={handleStart} />;
            case Screen.GREETING:
                return <GreetingScreen name={name} onComplete={handleGreetingComplete} />;
            case Screen.CAROUSEL:
                return <CarouselScreen name={name} />;
            default:
                return <StartScreen onStart={handleStart} />;
        }
    };
    
    return (
        <main className="relative h-screen w-screen transition-colors duration-1000 animated-gradient-background overflow-hidden">
            
            <FloatingShapes />
            
            <AnimatePresence>
              {showBlast && <ConfettiBlast />}
            </AnimatePresence>
            <AnimatePresence>
              {showFalling && <FallingConfetti />}
            </AnimatePresence>
            
            <button
                onClick={toggleMute}
                className="absolute top-4 right-4 z-50 p-2 bg-white/50 rounded-full text-pink-700 hover:bg-white transition-all"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
                {isMuted ? <VolumeOffIcon className="h-6 w-6" /> : <VolumeUpIcon className="h-6 w-6" />}
            </button>
            <AnimatePresence mode="wait">
                <motion.div
                    key={screen}
                    variants={screenVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 1.0 }}
                    className="h-full w-full"
                >
                    {getScreenComponent()}
                </motion.div>
            </AnimatePresence>
        </main>
    );
};

export default App;
