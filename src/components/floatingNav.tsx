'use client';
import React, { JSX } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useColor } from '@/context/color-context';
import { colorConfig } from '@/config/colors';
import { usePathname } from 'next/navigation';

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { colorScheme } = useColor();
  const colors = colorConfig[colorScheme];
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-[5000]", // Changed to fixed positioning
        "max-w-[90vw] w-fit rounded-lg shadow-xl backdrop-blur-xl",
        "transform-gpu", // Better performance for animations
        className
      )}
      style={{
        background: `${colors.headerBg}80`,
        border: `1px solid ${colors.border}`
      }}
    >
      <nav className="flex items-center px-4 py-2 gap-2 sm:gap-4">
        {navItems.map((navItem, idx) => {
          const isActive = pathname === navItem.link;
          return (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative flex items-center p-2 sm:p-3",
                "transition-all duration-300 text-white/90 hover:text-white",
                "text-sm sm:text-base" // Responsive text sizing
              )}
            >
              <span className="sm:hidden text-lg">
                {navItem.icon}
              </span>
              <span className="hidden sm:block font-medium tracking-tight">
                {navItem.name}
              </span>
              {isActive && (
                <motion.div
                  className="absolute inset-x-0 -bottom-1 h-0.5 bg-white/80"
                  layoutId="active-nav"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "relative px-4 py-2 sm:px-6 sm:py-2 text-sm font-medium rounded-md text-white",
            "backdrop-blur-lg border transition-all",
            "ml-2", // Add some separation from nav items
            colors.border
          )}
          style={{
            background: `${colors.headerBg}80`
          }}
        >
          <span className="whitespace-nowrap">Login</span>
          <span 
            className="absolute inset-x-0 w-full h-px mx-auto -bottom-px"
            style={{
              background: colors.textGradient,
              opacity: 0.8
            }}
          />
        </motion.button>
      </nav>
    </motion.div>
  );
};