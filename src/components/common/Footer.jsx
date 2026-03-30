import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import logo from "../../assets/logo.png";

function Footer() {
  return (
    <footer className="w-full bg-lightBg mt-10">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full bg-primary text-white py-10 md:py-12 px-6 md:px-16"
      >

        {/* 🔹 Top Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* 🌿 Brand */}
          <div>
            {/* <img src={logo} alt="Darshai" className="h-10 mb-4" /> */}

            <p className="text-white/80 text-sm leading-relaxed font-light tracking-wide max-w-xs">
              AI-native longevity protocols rooted in Ayurvedic heritage,
              designed for a healthier future.
            </p>
             {/* Social */}
            <div className="flex gap-4 mt-5">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition cursor-pointer">
                ln
              </div>
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition cursor-pointer">
                x
              </div>
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition cursor-pointer">
                f
              </div>
            </div>
          </div>
          

          {/* 🔗 Quick Links */}
          <div>
            <h3 className="text-lg font-heading mb-4 tracking-wide">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-white/80 hover:text-white transition tracking-wide font-light hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 📞 Contact */}
          <div>
            <h3 className="text-lg font-heading mb-4 tracking-wide">
              Contact
            </h3>

            <div className="space-y-2 text-sm text-white/80 font-light">
              <p>📞 +91 98765 43210</p>
              <p>📧 support@darshai.com</p>
              <p>📍 India</p>
            </div>

            <button className="mt-4 border border-white/40 px-5 py-2 rounded-full text-sm hover:bg-white hover:text-primary transition">
              View More →
            </button>
          </div>
        </div>

        {/* 🔹 Bottom Section */}
        <div className="max-w-7xl mx-auto mt-8 border-t border-white/20 pt-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs md:text-sm text-white/70">

          <p className="font-light tracking-wide">
            © 2026 Darshai. All rights reserved.
          </p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Terms & Conditions
            </span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;