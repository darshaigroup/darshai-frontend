import { motion, useScroll } from 'motion/react';
import { useRef } from 'react';
import PageHeader from '../../components/common/PageHeader';

export default function OurStory() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="bg-brand-cream min-h-screen overflow-hidden">
      <PageHeader 
        tag="The Genesis"
        title="Why DARSHAI Exists"
        subtitle="Bridging 5,000 years of wisdom with 21st-century biomarker science."
        image="https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="py-24 md:py-32 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 items-center mb-24 md:mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-6 md:space-y-10"
          >
            <span className="text-luxury text-brand-gold uppercase tracking-[2px] text-xs md:text-sm">The Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-forest leading-tight">The Science of Sovereignty</h2>
            <p className="text-brand-forest/70 leading-relaxed text-lg md:text-xl font-light">
              Most wellness companies ask you to "relax." <span className="font-semibold text-brand-forest">DARSHAI asks you to reclaim.</span>
            </p>
            <p className="text-brand-forest/70 leading-relaxed text-lg md:text-xl font-light">
              We founded DARSHAI because we noticed a dangerous gap in modern health: the more "connected" our technology became, the more disconnected we became from our biological foundations.
            </p>
            <p className="text-brand-forest/70 leading-relaxed text-lg md:text-xl font-light">
              We saw high-performers—CEOs, founders, and innovators—burnout not because they lacked ambition, but because their environments (Bio-Ecology) were working against their biology.
            </p>
            <div className="pt-8 md:pt-10 border-t border-brand-forest/10">
              <div className="flex gap-12 md:gap-16">
                <div>
                  <span className="block text-3xl md:text-4xl font-serif text-brand-gold mb-2">Bio-Luxury</span>
                  <span className="text-luxury tracking-[3px] md:tracking-[4px] text-[10px] md:text-xs">A New Category</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="rounded-[40px] md:rounded-[60px] overflow-hidden h-[400px] sm:h-[500px] md:h-[700px] shadow-[0_50px_100px_rgba(0,0,0,0.15)]"
            >
              <img 
                src="https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&q=80&w=1000" 
                alt="Clinical Clarity" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl opacity-50" />
          </div>
        </div>

        {/* The Brain Trust Section */}
        <div className="mb-24 md:mb-40">
          <div className="text-center mb-16 md:mb-24 px-4">
            <span className="text-luxury text-brand-gold mb-4 md:mb-6 block uppercase tracking-[2px]">The Architects</span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-forest">The Brain Trust</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {[
              {
                name: "Veekshitha V",
                role: "Founder & CEO",
                desc: "A Science and Journalism post-graduate and MCJ Silver Jubilee Year Awardee. She leads the brand's vision, ensuring the bridge between clinical data and human storytelling remains unbreakable.",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
              },
              {
                name: "Dr. Renjith",
                role: "Head of Wellness & Curation",
                desc: "The guardian of our protocols, specializing in translating 5,000 years of Ayurvedic tradition into measurable, clinical interventions.",
                img: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=800"
              },
              {
                name: "The Technical Core",
                role: "AI & Engineering",
                desc: "Our team of Full-Stack Developers and AI Engineers build the 'Digital Brain'—the proprietary AI that monitors biomarkers in real-time.",
                img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
              },
              {
                name: "Luxury Experience",
                role: "Operations & Growth",
                desc: "Ensuring the luxury experience is as precise as the science behind it, from concierge bio-butlers to exclusive retreat logistics.",
                img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
              }
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1, ease: [0.19, 1, 0.22, 1] }}
                className="group"
              >
                <div className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-[40px] md:rounded-[60px] overflow-hidden mb-6 md:mb-10 shadow-2xl">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-10 md:bottom-12 left-10 md:left-12 right-10 md:right-12">
                    <h3 className="text-2xl md:text-4xl font-serif text-white mb-2">{member.name}</h3>
                    <p className="text-brand-gold font-bold text-[8px] md:text-[10px] uppercase tracking-[4px] md:tracking-[5px]">{member.role}</p>
                  </div>
                </div>
                <p className="text-brand-forest/50 leading-relaxed font-light text-base md:text-[18px] px-4 max-w-xl">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Statement - Immersive Forest */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="relative bg-brand-forest rounded-[40px] md:rounded-[80px] p-10 sm:p-24 md:p-40 text-brand-cream text-center overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute inset-0 opacity-15">
            <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2000" alt="Background" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="relative z-10">
            <span className="text-luxury text-brand-gold mb-8 md:mb-12 block uppercase tracking-[2px]">Our North Star</span>
            <h2 className="text-3xl sm:text-5xl md:text-8xl font-serif mb-8 md:mb-16 max-w-6xl mx-auto leading-tight md:leading-[0.9] tracking-tighter">
              To restore biological sovereignty through the <span className="italic">fusion of ancient ecology and modern AI.</span>
            </h2>
            <div className="w-16 md:w-32 h-px bg-brand-gold/30 mx-auto mb-8 md:mb-16" />
            <p className="text-brand-cream/60 text-lg md:text-3xl max-w-4xl mx-auto font-light leading-relaxed">
              We solve the crisis of modern burnout by recalibrating the human system at its architectural foundation.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
