import { motion } from 'framer-motion';
import {SparklesCore} from '../ui/sparkles';


export default function HeroSection() {
  return (
    <section className="relative h-96 flex items-center justify-center ">
      {/* Core component */}
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-white px-4"
      >
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to the Blog</h1>
        <p className="text-xl md:text-2xl font-light">Insights, tutorials, and latest news</p>
      </motion.div>
    </section>
    
  );
}