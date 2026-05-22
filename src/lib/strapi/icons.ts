import { Wrench, Settings, Zap, Heart, Star, Shield, type LucideIcon } from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  wrench: Wrench,
  settings: Settings,
  zap: Zap,
  heart: Heart,
  star: Star,
  shield: Shield,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Wrench; // Wrench como fallback
}