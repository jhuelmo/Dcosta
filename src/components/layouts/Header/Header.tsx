import React, { useEffect, useRef } from 'react';
import { motion, animate, scroll, delay, stagger } from 'motion/react';
import { HeaderLink } from './HeaderLink';
import { Button } from '@/components/ui/button';
import logoUrl from '@/assets/logo-placeholder.png';

export function Header() {
	const headerRef = useRef<HTMLElement>(null);

	const variants = {
		hidden: { opacity: 0, display: 'none' 
		},
		visible: { 
			opacity: 1, 
			display: 'flex',
			transition:{
				opacity: {
					duration: 0.5,
					ease: "easeOut",
					delay: 0.1
				},
				display: {
					duration: 0
				},
				staggerChildren: 0.15
			}
		},
		
	};

	const headerVariants = {
		hidden: { opacity: 0, scale: 0.95, width: 'auto', top: '32px' },
		visible: {
			opacity: 1,
			scale: 1,
			width: '1200px',
			top: '32px',
			transition: {
				opacity: {
					duration: 1,
					ease: "easeOut",
					delay: 0,
				},
				scale: {
					duration: 1,
					ease: "easeOut",
					delay: 0,
				},
				width: {
					duration: 0.6,
					ease: "easeOut",
					delay: 0.6,
				},
				top: {
					duration: 0,
				},
				delayChildren: 1,
			},
		},
	};

	return (
		<motion.header
			initial="hidden"
			animate="visible"
			variants={headerVariants}
			ref={headerRef}
			className="header fixed left-1/2 top-8 z-999 flex h-16 w-300 -translate-x-1/2 items-center justify-between rounded-full bg-neutral p-2"
		>
			<motion.a 
				className="logo ml-2 h-auto w-32" 
				href="/"
			>
				<img className="h-auto w-32 object-cover" src={typeof logoUrl === 'string' ? logoUrl : logoUrl.src} alt="Logo" />
			</motion.a>
			<motion.nav 
				className="flex flex-row items-center gap-6"
				variants={variants}
			>
				<motion.div variants={{hidden: { opacity: 0 }, visible: { opacity: 1 }}} transition={{ duration: 0.5, ease: "easeOut" }}>
					<HeaderLink className="text-base letter-spacing-animation" href="/">Home</HeaderLink>
				</motion.div>
				<motion.div variants={{hidden: { opacity: 0 }, visible: { opacity: 1 }}} transition={{ duration: 0.5, ease: "easeOut" }}>
					<HeaderLink className="text-base letter-spacing-animation" href="/">Servicios</HeaderLink>
				</motion.div>
				<motion.div variants={{hidden: { opacity: 0 }, visible: { opacity: 1 }}} transition={{ duration: 0.5, ease: "easeOut" }}>
					<HeaderLink className="text-base letter-spacing-animation" href="/">Galeria</HeaderLink>
				</motion.div>
				<motion.div variants={{hidden: { opacity: 0 }, visible: { opacity: 1 }}} transition={{ duration: 0.5, ease: "easeOut" }}>
					<HeaderLink className="text-base letter-spacing-animation" href="/">Tecnología</HeaderLink>
				</motion.div>
				<motion.div variants={{hidden: { opacity: 0 }, visible: { opacity: 1 }}} transition={{ duration: 0.5, ease: "easeOut" }}>
					<HeaderLink className="text-base letter-spacing-animation" href="/">Equipo</HeaderLink>
				</motion.div>
			</motion.nav>
			<motion.div variants={variants} transition={{ duration: 0.2, ease: "easeOut" }}>
				<Button className="cursor-pointer letter-spacing-animation" size="lg">Concreta una cita</Button>
			</motion.div>
		</motion.header>
	);
}
