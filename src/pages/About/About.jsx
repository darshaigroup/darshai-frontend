import { motion } from "framer-motion";
import bg from "../../assets/images/bg.png";

const slides = [
  {
    title: "Our Story",
    subtitle: "Why we started",
    text: "Darshai was born from the idea of combining ancient Ayurvedic wisdom with modern AI technology.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    title: "Who We Are",
    subtitle: "Our Team",
    text: "We are a team of developers, health experts, and visionaries passionate about building intelligent solutions.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    title: "Our Journey",
    subtitle: "Growth & Evolution",
    text: "From idea to product, we evolved through challenges and innovation to create something impactful.",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  },
  {
    title: "Mission & Vision",
    subtitle: "Future Goals",
    text: "Our mission is to transform healthcare using AI and make preventive care accessible to everyone.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
];

const About = () => {
  return (
  <div className="w-full snap-y snap-mandatory">

      {slides.map((slide, i) => {
        const isReverse = i % 2 !== 0;

        return (
         <section
  key={i}
  className={`min-h-screen snap-start flex items-center px-6 md:px-16 py-16 ${
    i % 2 === 0 ? "bg-white" : "bg-primary text-white"
  }`}
>
           <div
  className={`max-w-7xl mx-auto flex flex-col md:flex-row ${
    isReverse ? "md:flex-row-reverse" : ""
  } items-center justify-between gap-12 md:gap-16`}
>

              {/* IMAGE */}
              <motion.div
  className="w-full md:w-1/2 flex justify-center"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <img
    src={slide.image}
    alt=""
    className="w-full max-w-md md:max-w-lg h-[280px] md:h-[380px] object-cover rounded-xl shadow-lg"
  />
</motion.div>

              {/* CONTENT */}
              <motion.div
  className="w-full md:w-1/2 text-center md:text-left"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <h4
    className={`font-semibold mb-3 ${
      i % 2 === 0 ? "text-primary" : "text-white/80"
    }`}
  >
    {slide.subtitle}
  </h4>

  <h2 className="font-heading text-3xl md:text-5xl mb-4 leading-tight">
    {slide.title}
  </h2>

  <p
    className={`leading-relaxed max-w-md mx-auto md:mx-0 ${
      i % 2 === 0 ? "text-gray-600" : "text-white/90"
    }`}
  >
    {slide.text}
  </p>
</motion.div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default About;