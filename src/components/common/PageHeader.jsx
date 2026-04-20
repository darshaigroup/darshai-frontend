import { motion } from 'motion/react';

export default function PageHeader({ title, subtitle, tag, image }) {
  const defaultImage = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000";
  
  return (
    <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={image || defaultImage} 
          alt={title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-forest/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] uppercase font-bold tracking-[6px] text-white bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-8 inline-block">
            {tag}
          </span>
          <h1 className="text-5xl md:text-[80px] font-serif text-white mb-8 leading-[0.9] font-normal tracking-tighter drop-shadow-2xl">
            {title}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light italic drop-shadow-md"
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
