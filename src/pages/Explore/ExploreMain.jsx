import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { motion, AnimatePresence } from 'motion/react';
import { Play, BookOpen, Image as ImageIcon, FileText, Newspaper, Monitor, MessageSquare } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'All', icon: null, img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000" },
  { id: 'journal', name: 'Journal', icon: BookOpen, img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=2000" },
  { id: 'media', name: 'Media', icon: Monitor, img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000" },
  { id: 'magazine', name: 'Magazine', icon: Newspaper, img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2000" },
  { id: 'video', name: 'Video', icon: Play, img: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&q=80&w=2000" },
  { id: 'image', name: 'Image', icon: ImageIcon, img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2000" },
  { id: 'brochure', name: 'Brochure', icon: FileText, img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=2000" },
  { id: 'blog', name: 'Blog', icon: MessageSquare, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" },
];

const CONTENT = [
  { 
    id: 1,
    title: "The Science of Ojas", 
    category: "journal", 
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
    desc: "A peer-reviewed exploration of vitality markers in Ayurvedic protocols."
  },
  { 
    id: 2,
    title: "Bio-Luxury Retreat 2026", 
    category: "image", 
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    desc: "Visual highlights from our latest Sovereign Protocol intervention."
  },
  { 
    id: 3,
    title: "The Digital Brain", 
    category: "video", 
    img: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&q=80&w=800",
    desc: "Watch how our AI monitors biomarkers to optimize human longevity."
  },
  { 
    id: 4,
    title: "Protocol Dossier v2", 
    category: "brochure", 
    img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
    desc: "Download the complete technical guide to our multi-gear ecosystem."
  },
  { 
    id: 5,
    title: "Quarterly Longevity", 
    category: "magazine", 
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    desc: "The Spring 2026 issue focusing on Environmental Correction."
  },
  { 
    id: 6,
    title: "CEO Burnout Crisis", 
    category: "blog", 
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    desc: "How Darshai is reversing decision fatigue for tech leaders."
  }
];

export default function Explore() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(category || 'all');

  useEffect(() => {
    if (category) {
      setActiveCategory(category);
    } else {
      setActiveCategory('all');
    }
  }, [category]);

  const currentCat = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];

  const filteredContent = activeCategory === 'all' 
    ? CONTENT 
    : CONTENT.filter(item => item.category === activeCategory);

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Hero Image Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img 
              src={currentCat.img} 
              alt={currentCat.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-forest/60 backdrop-blur-[2px]" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            key={activeCategory + "-text"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-luxury text-brand-gold mb-6 block uppercase tracking-[4px]">
              {activeCategory === 'all' ? 'The Global Archive' : activeCategory}
            </span>
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[0.9] capitalize tracking-tighter">
              {currentCat.name}
            </h1>
            <p className="text-2xl text-white/70 font-light max-w-2xl mx-auto italic">
              {activeCategory === 'all' 
                ? "A curated collection of precision research, cinematic media, and biological insights."
                : `Scientific artifacts and curated ${activeCategory} documentation for human evolution.`}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 sm:px-10 md:px-20 max-w-7xl mx-auto">
        {/* Content Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredContent.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5.5] rounded-[40px] md:rounded-[60px] overflow-hidden mb-6 md:mb-10 shadow-2xl transition-all duration-700">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                  
                  <div className="absolute top-6 md:top-10 left-6 md:left-10">
                    <span className="bg-brand-gold text-white px-4 md:px-6 py-1.5 md:py-2.5 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-[2px] md:tracking-[3px] shadow-lg">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 transform translate-y-4 md:translate-y-6 group-hover:translate-y-0 transition-all duration-700">
                    <h3 className="text-2xl md:text-4xl font-serif text-white mb-4 md:mb-6 leading-[1.1] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredContent.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-56"
          >
            <p className="text-brand-forest/30 font-serif italic text-3xl">This artifact is being curated...</p>
          </motion.div>
        )}
      </section>
    </div>
  );
}
