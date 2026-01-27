import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    delayBetweenWords?: number;
}

export const useTypewriter = ({
    words,
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetweenWords = 2000
}: UseTypewriterOptions) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const currentWord = words[currentWordIndex];

        if (isPaused) {
            const pauseTimer = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, delayBetweenWords);
            return () => clearTimeout(pauseTimer);
        }

        if (!isDeleting && currentText === currentWord) {
            setIsPaused(true);
            return;
        }

        if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            if (isDeleting) {
                setCurrentText(currentWord.substring(0, currentText.length - 1));
            } else {
                setCurrentText(currentWord.substring(0, currentText.length + 1));
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, isPaused, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

    return { text: currentText, isTyping: !isPaused };
};
