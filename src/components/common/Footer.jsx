import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const brandGreen = "#1E7A3A";
const gold = "#C6A75E";

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#F5F1E8] text-[#2A4A3A] px-6 md:px-20 py-16 relative overflow-hidden">

      <div className="grid md:grid-cols-4 gap-10">

        {/* 🔹 BRAND */}
       <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
>
  <h2
    className="text-3xl font-serif tracking-wide mb-4"
    style={{ color: brandGreen }}
  >
    DARSHAI
  </h2>

  <p className="text-sm text-[#5F756B]">
    Geo-Wellness Platform <br />
    AI-Native Longevity Protocols
  </p>

  <h2
    className="text-1xl font-serif tracking-wide mt-4"
    style={{ color: brandGreen }}
  >
    ADDRESS
  </h2>
  {/* LOCATION (CLICKABLE → MAPS) */}
  <a
    href="https://maps.google.com/?q=K-tech Innovation Hub Mangalore"
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm text-[#5F756B] block hover:text-[#1E7A3A]"
  >
    K-tech Innovation Hub, (CIF), 3rd Floor, Plama Center, Bejai - Kapikad Rd,
      near Jayalakshmi Silks, Lalbagh, Mangaluru, Karnataka 575004
  </a>

  {/* EMAIL (CLICKABLE) */}
  <a
    href="mailto:info@darshaigroup.com"
    className="text-sm mt-2 block hover:text-[#C6A75E]"
  >
    info@darshaigroup.com
  </a>

  {/* PHONE (CLICKABLE) */}
  <a
    href="tel:+917349171511"
    className="text-sm block hover:text-[#C6A75E]"
  >
    +91-7349171511
  </a>

  {/* SOCIAL */}
  <div className="flex gap-3 mt-5">
    {[
      {
        Icon: FaLinkedinIn,
        link: "https://www.linkedin.com/company/darshai/",
      },
      {
        Icon: FaInstagram,
        link: "https://www.instagram.com/darshaiofficial?igsh=a3dwZnQwY3R1ejU2",
      },
      {
        Icon: FaFacebookF,
        link: "https://www.facebook.com/share/1AoFJHjYes/",
      },
      {
        Icon: FaTwitter,
        link: "https://twitter.com/DarshaiOffcial",
      },
    ].map(({ Icon, link }, i) => (
      <motion.a
        key={i}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2, rotate: 5 }}
        className="p-2 border border-[#D6D0C4] rounded-full hover:bg-[#1E7A3A] hover:text-white transition"
      >
        <Icon size={14} />
      </motion.a>
    ))}
  </div>
</motion.div>

        {/* 🔥 QUICK LINKS */}
        <FooterColumn title="Quick Links">
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/story">Our Story</FooterLink>
          <FooterLink to="/program">Our Program</FooterLink>
          <FooterLink to="/explore">Explore</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
        </FooterColumn>

        {/* 🔥 PROGRAMS */}
        <FooterColumn title="Programs">
          <FooterLink to="/program">
            Wellness Programmes
          </FooterLink>
          <FooterLink to="/program/geo-wellness-center">
            Geo-Wellness Center
          </FooterLink>
        </FooterColumn>

        {/* 🔥 ARCHIVE */}
        <FooterColumn title="Archive">
          <FooterLink to="/explore/video">Video</FooterLink>
          <FooterLink to="/explore/image">Image</FooterLink>
          <FooterLink to="/explore/blog">Blog</FooterLink>
          <FooterLink to="/explore/brochure">Brochure</FooterLink>
        </FooterColumn>
      </div>

      {/* 🔻 BOTTOM */}
      <div className="mt-16 border-t border-[#D6D0C4] pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-[#7A8F84]">
        <p>© {new Date().getFullYear()} Darshai. All rights reserved.</p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <Link to="/privacy-policy" className="footer-link">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="footer-link">
            Terms & Conditions
          </Link>
        </div>
      </div>

      {/* 🔺 SCROLL TOP */}
      <motion.button
        onClick={scrollTop}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#1E7A3A] text-white flex items-center justify-center shadow-lg"
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
};

export default Footer;





/* 🔥 REUSABLE COMPONENTS */

const FooterColumn = ({ title, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <h3
        className="text-sm tracking-[4px] mb-4 uppercase font-semibold"
        style={{ color: "#1E7A3A", letterSpacing: "3px" }}
      >
        {title}
      </h3>

      <ul className="space-y-3 text-sm">{children}</ul>
    </motion.div>
  );
};



const FooterLink = ({ to, children }) => {
  return (
    <li>
      <Link
        to={to}
        className="relative inline-block group text-[#2A4A3A]"
      >
        {/* TEXT */}
        <span className="transition-all duration-300 group-hover:text-[#C6A75E] group-hover:translate-x-1 inline-block">
          {children}
        </span>

        {/* GOLD SLIDE + GLOW */}
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#C6A75E] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#C6A75E]"></span>
      </Link>
    </li>
  );
};