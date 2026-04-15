import { type FC } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: FC<ButtonProps> = ({
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-heading font-medium transition-all duration-300 rounded-sm";

    const variants = {
        primary: "bg-sand-500 text-persian-900 hover:bg-sand-400 hover:shadow-[0_0_15px_rgba(197,160,89,0.3)]",
        outline: "border border-sand-500 text-sand-500 hover:bg-sand-500/10 hover:border-sand-400",
        ghost: "text-sand-400 hover:text-sand-300 hover:bg-white/5"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};
