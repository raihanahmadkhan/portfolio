import { type FC } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
    hover?: boolean;
}

export const Card: FC<CardProps> = ({
    children,
    className = '',
    hover = false,
    ...props
}) => {
    return (
        <motion.div
            whileHover={hover ? { y: -5, boxShadow: '0 10px 30px -10px rgba(197, 160, 89, 0.15)' } : {}}
            className={`bg-persian-800/40 backdrop-blur-sm border border-sand-500/20 rounded-lg p-6 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};
