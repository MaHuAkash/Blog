export type ColorScheme = keyof typeof colorConfig;

export const colorConfig = {
  midnightPurple: {
    // Backgrounds
    gradient: 'from-gray-900 via-purple-900/80 to-gray-900',
    headerBg: 'bg-purple-900/90 backdrop-blur-xl',
    footerBg: 'bg-purple-950/95',
    skillCard: 'bg-gradient-to-br from-purple-900/20 to-amber-900/10',
    
    // Text & Typography
    textGradient: 'bg-gradient-to-r from-purple-300 to-amber-300',
    textPrimary: 'text-purple-100',
    textSecondary: 'text-purple-300',
    textMuted: 'text-purple-400/80',
    
    // Interactive Elements
    accent: 'amber-300',
    accentHover: 'hover:bg-amber-400',
    
    // Borders & Dividers
    border: 'border-purple-400/30',
    borderHover: 'hover:border-purple-200/50',
    
    // Icons & Graphics
    iconColor: 'text-purple-300',
    iconHover: 'hover:text-amber-300',
    methodologyGradient: 'from-purple-900/40 to-amber-900/20',
    
    // Social & Footer
    socialBg: 'bg-purple-800/40',
    socialHover: 'hover:bg-purple-700/60',
    footerText: 'text-purple-300/80',
    footerLink: 'text-purple-200 hover:text-amber-300'
  },
  emeraldGreen: {
    gradient: 'from-gray-900 via-emerald-900/80 to-gray-900',
    headerBg: 'bg-emerald-900/90 backdrop-blur-xl',
    footerBg: 'bg-emerald-950/95',
    skillCard: 'bg-gradient-to-br from-emerald-900/20 to-amber-900/10',
    textGradient: 'bg-gradient-to-r from-emerald-300 to-amber-300',
    textPrimary: 'text-emerald-100',
    textSecondary: 'text-emerald-300',
    textMuted: 'text-emerald-400/80',
    accent: 'amber-300',
    accentHover: 'hover:bg-amber-400',
    border: 'border-emerald-400/30',
    borderHover: 'hover:border-emerald-200/50',
    iconColor: 'text-emerald-300',
    iconHover: 'hover:text-amber-300',
    methodologyGradient: 'from-emerald-900/40 to-amber-900/20',
    socialBg: 'bg-emerald-800/40',
    socialHover: 'hover:bg-emerald-700/60',
    footerText: 'text-emerald-300/80',
    footerLink: 'text-emerald-200 hover:text-amber-300'
  },
  crimsonRed: {
    gradient: 'from-gray-900 via-red-900/80 to-gray-900',
    headerBg: 'bg-red-900/90 backdrop-blur-xl',
    footerBg: 'bg-red-950/95',
    skillCard: 'bg-gradient-to-br from-red-900/20 to-amber-900/10',
    textGradient: 'bg-gradient-to-r from-red-300 to-amber-300',
    textPrimary: 'text-red-100',
    textSecondary: 'text-red-300',
    textMuted: 'text-red-400/80',
    accent: 'amber-300',
    accentHover: 'hover:bg-amber-400',
    border: 'border-red-400/30',
    borderHover: 'hover:border-red-200/50',
    iconColor: 'text-red-300',
    iconHover: 'hover:text-amber-300',
    methodologyGradient: 'from-red-900/40 to-amber-900/20',
    socialBg: 'bg-red-800/40',
    socialHover: 'hover:bg-red-700/60',
    footerText: 'text-red-300/80',
    footerLink: 'text-red-200 hover:text-amber-300'
  },
  sapphireBlue: {
    gradient: 'from-gray-900 via-blue-900/80 to-gray-900',
    headerBg: 'bg-blue-900/90 backdrop-blur-xl',
    footerBg: 'bg-blue-950/95',
    skillCard: 'bg-gradient-to-br from-blue-900/20 to-amber-900/10', // Changed to amber
    textGradient: 'bg-gradient-to-r from-blue-300 to-amber-300', // Changed to amber
    textPrimary: 'text-blue-100',
    textSecondary: 'text-blue-300',
    textMuted: 'text-blue-400/80',
    accent: 'amber-300', // Changed to amber
    accentHover: 'hover:bg-amber-400', // Changed to amber
    border: 'border-blue-400/30',
    borderHover: 'hover:border-blue-200/50',
    iconColor: 'text-blue-300',
    iconHover: 'hover:text-amber-300', // Changed to amber
    methodologyGradient: 'from-blue-900/40 to-amber-900/20', // Changed to amber
    socialBg: 'bg-blue-800/40',
    socialHover: 'hover:bg-blue-700/60',
    footerText: 'text-blue-300/80',
    footerLink: 'text-blue-200 hover:text-amber-300' // Changed to amber
  },
  aquaCyan: {
    gradient: 'from-gray-900 via-cyan-900/80 to-gray-900',
    headerBg: 'bg-cyan-900/90 backdrop-blur-xl',
    footerBg: 'bg-cyan-950/95',
    skillCard: 'bg-gradient-to-br from-cyan-900/20 to-amber-900/10', // Changed to amber
    textGradient: 'bg-gradient-to-r from-cyan-300 to-amber-300', // Changed to amber
    textPrimary: 'text-cyan-100',
    textSecondary: 'text-cyan-300',
    textMuted: 'text-cyan-400/80',
    accent: 'amber-300', // Changed to amber
    accentHover: 'hover:bg-amber-400', // Changed to amber
    border: 'border-cyan-400/30',
    borderHover: 'hover:border-cyan-200/50',
    iconColor: 'text-cyan-300',
    iconHover: 'hover:text-amber-300', // Changed to amber
    methodologyGradient: 'from-cyan-900/40 to-amber-900/20', // Changed to amber
    socialBg: 'bg-cyan-800/40',
    socialHover: 'hover:bg-cyan-700/60',
    footerText: 'text-cyan-300/80',
    footerLink: 'text-cyan-200 hover:text-amber-300' // Changed to amber
  }
} as const;