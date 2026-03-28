import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

const Tilt3D = ({ children, intensity = 8, scale = 1.03, style, className }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 280, damping: 22 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), springConfig);
    const scaleSpring = useSpring(1, springConfig);

    const glossX = useTransform(x, [-0.5, 0.5], ['10%', '90%']);
    const glossY = useTransform(y, [-0.5, 0.5], ['10%', '90%']);
    const glossBg = useMotionTemplate`radial-gradient(circle at ${glossX} ${glossY}, rgba(255,255,255,0.18) 0%, transparent 60%)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
        scaleSpring.set(scale);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        scaleSpring.set(1);
    };

    return (
        <div style={{ perspective: '1000px', ...style }} className={className}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    scale: scaleSpring,
                    transformStyle: 'preserve-3d',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    willChange: 'transform',
                }}
            >
                {children}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 'inherit',
                        background: glossBg,
                        pointerEvents: 'none',
                        zIndex: 10,
                    }}
                />
            </motion.div>
        </div>
    );
};

export default Tilt3D;
