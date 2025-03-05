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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "sticky top-[4%] z-[5000] mx-auto flex max-w-fit rounded-lg shadow-xl backdrop-blur-xl",
        className
      )}
      style={{
        background: `${colors.headerBg}80`,
        border: `1px solid ${colors.border}`
      }}
    >
      <nav className="flex items-center justify-between px-6 py-3 space-x-6">
        {navItems.map((navItem, idx) => {
          const isActive = pathname === navItem.link;
          return (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative flex items-center space-x-2 p-2",
                "transition-all duration-300 text-white/90 hover:text-white"
              )}
            >
              <span className="block sm:hidden text-lg">
                {navItem.icon}
              </span>
              <span className="hidden text-sm sm:block font-semibold tracking-tight">
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
          className={cn(
            "relative px-6 py-2 text-sm font-semibold rounded-md text-white",
            "backdrop-blur-lg border transition-all",
            colors.border
          )}
          style={{
            background: `${colors.headerBg}80`
          }}
        >
          <span>Login</span>
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