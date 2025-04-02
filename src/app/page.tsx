'use client';
import { useColor } from '@/context/color-context';
import { colorConfig } from '@/config/colors';
import { motion } from 'framer-motion';
import { GitHub } from 'react-feather';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

const AboutPage = () => {
  const { colorScheme } = useColor();
  const colors = colorConfig[colorScheme];

  // Animation variants
  const floating = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut'
      }
    }
  };

  const gradientPulse = {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'linear'
      }
    }
  };

  const cardHover = {
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        type: 'spring' as const,
        stiffness: 300
      }
    }
  };

  const perpetualRotate = {
    animate: {
      rotate: [0, 0],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: 'linear' as const
      }
    }
  };

  const words = 'A passionate student exploring the realms of .NET development, cloud architectures, and DevOps practices. I specialize in building robust web applications with ASP.NET Core while dancing with modern frontend technologies like Next.js and Tailwind CSS.'
  return (

    <div className={`min-h-screen font-[family-name:var(--font-geist-sans)] bg-gradient-to-b ${colors.gradient} px-4 md:px-8`}>
      <main className="pt-20 md:pt-32">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: '10%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Modern Floating Header */}
          <motion.div
            className="mb-20 md:mb-25 text-center relative group"
            variants={floating}
            animate="animate"
          >
            {/* Animated gradient backdrop */}
            <motion.div
              className="absolute inset-0 -z-10 opacity-25"
              animate={{
                background: [
                  `conic-gradient(from 90deg at 40% -25%, ${colors.textGradient} 0%, ${colors.textGradient} 30%, transparent 60%)`,
                  `conic-gradient(from 270deg at 60% 125%, ${colors.textGradient} 0%, ${colors.textGradient} 30%, transparent 60%)`
                ],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            {/* Main Title */}
            <div className="relative inline-block overflow-hidden rounded-[2rem]">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            </div>

            {/* Subtitle with typed effect */}
            <motion.div
              className="mt-6 md:mt-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-xl md:text-2xl font-medium text-gray-300 space-y-2">
                <div className="inline-flex flex-wrap justify-center items-center gap-x-2">
                  <span>Crafting</span>
                  <motion.span
                    className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                    animate={{
                      opacity: [0.8, 1],
                      textShadow: [
                        '0 0 10px rgba(147,51,234,0)',
                        '0 0 15px rgba(147,51,234,0.3)',
                        '0 0 10px rgba(147,51,234,0)'
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                  >
                    Digital Experiences
                  </motion.span>
                  <span>with</span>
                  <motion.span
                    className="relative px-2 py-1 bg-white/5 rounded-lg"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }}
                  >
                    .NET Core
                  </motion.span>
                  <span>&</span>
                  <motion.span
                    className="font-medium bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%']
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity
                    }}
                  >
                    Modern Web
                  </motion.span>
                </div>
              </div>

              {/* Progress line animation */}
              <motion.div
                className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "circOut" }}
              />
            </motion.div>
          </motion.div>


          {/* Profile Section */}
          <motion.section className="mb-16 md:mb-24 flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            {/* Image Container */}
            <motion.div
              className="relative w-full md:w-4/12 lg:w-3/12 group"
              variants={floating}
              animate="animate"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 to-blue-500/30 rounded-2xl transform rotate-3 shadow-2xl backdrop-blur-sm" />
              <div className="absolute inset-0 border-2 border-white/10 rounded-2xl transform rotate-1" />
              <motion.img
                src="/images/ff.jpeg"
                alt="Akash Lamsal"
                className="relative z-10 rounded-2xl shadow-2xl w-full h-auto object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              className="w-full md:w-8/12 lg:w-9/12 space-y-5 md:space-y-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 120,
                damping: 20
              }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute -inset-3 md:-inset-4 -z-10 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-blue-500/20 blur-2xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                }}
              />


              {/* Text Container */}
              <motion.div
                className="text-white/90 leading-relaxed md:leading-loose backdrop-blur-lg p-6 md:p-8 rounded-2xl border-2 border-white/10 bg-gradient-to-br from-white/5 to-white/[0.01] relative overflow-hidden"
                variants={floating}
                animate="animate"
                transition={{
                  delay: 0.7,
                  type: "spring",
                  stiffness: 100
                }}
              >
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 -z-10 opacity-10 [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />

                <TextGenerateEffect
                  words={words}
                  className="text-white text-lg md:text-xl font-light tracking-wide"
                  duration={0.3}
                />

                {/* Geometric Decorations */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-white/10 rounded-full opacity-30" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-600/20 rounded-full blur-xl" />

                {/* Subtle Particles */}
                <motion.div
                  className="absolute inset-0 -z-10 opacity-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-0.5 h-0.5 bg-white rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20],
                        x: [0, (Math.random() - 0.5) * 15],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.section>
          {/* Content Cards Section */}
          <motion.section className="mb-24">
            <h2 className="text-4xl font-bold text-center text-gray-100 mb-16">
              What You'll Find Here
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: '.NET Mastery',
                  content: 'In-depth tutorials, best practices & performance optimization',
                  icon: '💻'
                },
                {
                  title: 'Modern Web',
                  content: 'Next.js 14, Tailwind CSS, Framer Motion deep dives',
                  icon: '🌐'
                },
                {
                  title: 'Cloud & DevOps',
                  content: 'Azure solutions, GitHub Actions CI/CD pipelines',
                  icon: '☁️'
                },
                {
                  title: 'Project Showcase',
                  content: 'Full-stack builds with architecture breakdowns',
                  icon: '🚀'
                },
                {
                  title: 'Tech Poetry',
                  content: 'Creative coding narratives & philosophical musings',
                  icon: '📜'
                },
                {
                  title: 'Innovation Lab',
                  content: 'AI experiments, IoT projects & bleeding-edge tech',
                  icon: '🧪'
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-xl transition-all border border-white/20"
                  variants={cardHover}
                  whileHover="hover"
                  animate={{
                    y: [0, -10, 0],
                    transition: { duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }
                  }}
                >
                  <motion.div className="flex items-center gap-3 mb-4">
                    <motion.span
                      className="text-3xl text-gray-100"
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    >
                      {item.icon}
                    </motion.span>
                    <h3 className="text-xl font-bold text-gray-100">{item.title}</h3>
                  </motion.div>
                  <p className="text-gray-200 text-base leading-relaxed">{item.content}</p>
                  <motion.div
                    className="mt-4"
                    variants={perpetualRotate}
                    animate="animate"
                  >
                    <div className={`w-full h-1 bg-gradient-to-r ${colors.gradient} rounded-full opacity-100`} />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Connect Section */}
          <motion.section className="text-center">
            <motion.div
              className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 py-12 rounded-2xl shadow-inner"
              animate={{
                background: [
                  'linear-gradient(45deg, rgba(168,85,247,0.1), rgba(59,130,246,0.1))',
                  'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))',
                  'linear-gradient(225deg, rgba(168,85,247,0.1), rgba(59,130,246,0.1))',
                  'linear-gradient(315deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))',
                ],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
              }}
            >
              <h2 className="text-3xl font-bold text-gray-100 mb-6">
                Let's Connect & Create!
              </h2>
              <motion.a
                href="https://github.com/MaHuAkash"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-10 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-gray-100 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 4px 14px rgba(79, 70, 229, 0.2)',
                    '0 6px 20px rgba(79, 70, 229, 0.3)',
                    '0 4px 14px rgba(79, 70, 229, 0.2)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <GitHub className="mr-2 text-gray-100" size={20} />
                Explore My GitHub
              </motion.a>
            </motion.div>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
};

export default AboutPage;