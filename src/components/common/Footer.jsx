import { motion } from "framer-motion";
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F5F1E8] text-[#2A4A3A] px-6 md:px-20 py-16">

      <div className="grid md:grid-cols-4 gap-10">

        {/* 🔹 BRAND + ADDRESS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-serif tracking-wide mb-4">
            DARSHAI
          </h2>

          <p className="text-sm leading-relaxed text-[#5F756B]">
            Geo-Wellness Platform <br />
            AI-Native Longevity Protocols
          </p>

          <p className="text-sm mt-4 text-[#5F756B]">
            India
          </p>

          <p className="text-sm mt-2 text-[#2A4A3A]">
            info@darshaigroup.com
          </p>

          <p className="text-sm mt-1 text-[#2A4A3A]">
            +91-7349171511
          </p>

          {/* Social */}
          <div className="flex gap-3 mt-5">
            {[FaLinkedinIn, FaInstagram, FaFacebookF, FaTwitter].map((Icon, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.1 }}
                className="p-2 border border-[#D6D0C4] rounded-full hover:bg-[#2A4A3A] hover:text-white transition"
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* 🔹 PROGRAMMES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-sm tracking-widest mb-4 text-[#7A8F84]">
            PROGRAMMES
          </h3>

          <ul className="space-y-3 text-sm text-[#2A4A3A]">
            <li>Longevity Protocols</li>
            <li>Detox Programs</li>
            <li>Weight Optimization</li>
            <li>Fitness & Recovery</li>
            <li>Rest & Rejuvenation</li>
          </ul>
        </motion.div>

        {/* 🔹 SERVICES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-sm tracking-widest mb-4 text-[#7A8F84]">
            SERVICES
          </h3>

          <ul className="space-y-3 text-sm text-[#2A4A3A]">
            <li>Wellness Consulting</li>
            <li>Corporate Wellness</li>
            <li>Personalized Plans</li>
            <li>AI Monitoring</li>
          </ul>
        </motion.div>

        {/* 🔹 ABOUT / LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-sm tracking-widest mb-4 text-[#7A8F84]">
            ABOUT
          </h3>

          <ul className="space-y-3 text-sm text-[#2A4A3A]">
            <li>Our Vision</li>
            <li>Our Mission</li>
            <li>Careers</li>
            <li>Media</li>
          </ul>
        </motion.div>
      </div>

      {/* 🔻 BOTTOM LINE */}
      <div className="mt-16 border-t border-[#D6D0C4] pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-[#7A8F84]">
        <p>© {new Date().getFullYear()} Darshai. All rights reserved.</p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <span className="hover:text-[#2A4A3A] cursor-pointer">Privacy Policy</span>
          <span className="hover:text-[#2A4A3A] cursor-pointer">Terms & Conditions</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;