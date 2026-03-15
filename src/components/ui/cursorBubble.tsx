'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import React, { useEffect, useState, useCallback } from 'react';

interface CursorBubbleProps {
  selector?: string;
  offsetX?: number;
  offsetY?: number;
}

const CursorBubble: React.FC<CursorBubbleProps> = ({ selector, offsetX = 15, offsetY = 15 }) => {

	const [element, setElement] = useState<HTMLElement | null>(null);
	const [isHovering, setIsHovering] = useState(false);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const smoothX = useSpring(mouseX, { 
		stiffness: 100, 
		damping: 25,
	});
	const smoothY = useSpring(mouseY, { 
		stiffness: 100, 
		damping: 25,
	});

	const variants = {
		hidden: { 
			opacity: 0, 
			scale: 0.2, 
			transition: {
				duration: 0.3,
				ease: "easeOut"
			}
		},
		visible: { 
			opacity: 1, 
			scale: 1,
			transition: {
				duration: 0.3,
				ease: "easeOut"
			}
		},
	};

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			const newX = e.clientX + offsetX;
			const newY = e.clientY + offsetY;

			mouseX.set(newX);
			mouseY.set(newY);
		}
		window.addEventListener('mousemove', moveCursor);
		return () => {
			window.removeEventListener('mousemove', moveCursor);
		}
	}, [offsetX, offsetY]);

	useEffect(() => {
		if (selector) {
			const el = document.querySelector(selector) as HTMLElement;
			setElement(el);
		}
	}, [selector]);

	const handleMouseEnter = useCallback(() => {
		setIsHovering(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setIsHovering(false);
	}, []);

	useEffect(() => {
		if (!element) return;

		element.addEventListener('mouseenter', handleMouseEnter);
		element.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			element.removeEventListener('mouseenter', handleMouseEnter);
			element.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, [element, handleMouseEnter, handleMouseLeave]);
	

  return (
    <motion.div
      className="cursor-bubble"
      initial="hidden"
      animate={isHovering ? "visible" : "hidden"}
      variants={variants}
      style={{
        x: smoothX,
        y: smoothY,
		pointerEvents: 'none',
      }}
    >
      ver proyecto
    </motion.div>
  );
};

export default CursorBubble;
