import { Button } from "./ui/button";
import hero from "../assets/hero-placeholder.png";

export default function ContactHero() {
	const heroSrc = typeof hero === "string" ? hero : hero.src;

	return (
		<div className="h-[50vh] flex-col items-center justify-center p-4 text-center">
			<div className="relative h-full w-full overflow-hidden rounded-3xl">
				<img
					className="w-full object-contain object-center"
					src={heroSrc}
					alt="D'acosta labs"
					loading="lazy"
				/>
				<div className="pointer-events-none absolute inset-0 z-10 rounded-3xl bg-gradient-to-t from-black/40 to-transparent" />
			</div>
		</div>
	);
}
