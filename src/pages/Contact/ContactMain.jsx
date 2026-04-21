import PageHeader from "../../components/common/PageHeader";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">

      {/* HERO */}
      <PageHeader
        tag="Get in Touch"
        title="Connect with Darshai"
        subtitle="Whether you have questions about our program or want to explore a partnership, we're here to listen."
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000"
        overlay="bg-[#1F4D3E]/80" // ✅ strong green overlay
      />

      {/* MAIN SECTION */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT CONTENT */}
          <div>

            <h2 className="text-5xl md:text-6xl font-serif text-[#1F4D3E] mb-8">
              Let's initiate a{" "}
              <span className="italic text-[#C6A75E]">
                conversation.
              </span>
            </h2>

            <p className="text-[#1F4D3E]/70 text-lg mb-12 font-light">
              Our clinical architects and bio-luxury concierges are available to
              discuss your biological sovereignty roadmap.
            </p>

            {/* CONTACT ITEMS */}
            <div className="space-y-10">

              {/* EMAIL */}
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-[#1F4D3E]/5 rounded-2xl flex items-center justify-center">
                  <Mail className="text-[#1F4D3E]" />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-[#1F4D3E]">
                    Direct Communication
                  </h4>
                  <p className="text-[#1F4D3E]/50">
                    concierge@darshai.com
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-[#1F4D3E]/5 rounded-2xl flex items-center justify-center">
                  <Phone className="text-[#1F4D3E]" />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-[#1F4D3E]">
                    Global Concierge
                  </h4>
                  <p className="text-[#1F4D3E]/50">
                    +1 (888) DARSHAI
                  </p>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-[#1F4D3E]/5 rounded-2xl flex items-center justify-center">
                  <MapPin className="text-[#1F4D3E]" />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-[#1F4D3E]">
                    The Sanctuary
                  </h4>
                  <p className="text-[#1F4D3E]/50">
                    72 Wellness Way, Sedona, AZ
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl p-10 rounded-[40px] shadow-xl border border-[#1F4D3E]/10"
          >

            <form className="space-y-6">

              {/* NAME */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="First Name"
                  className="input-style"
                />
                <input
                  placeholder="Last Name"
                  className="input-style"
                />
              </div>

              {/* EMAIL */}
              <input
                placeholder="Email Address"
                className="input-style"
              />

              {/* MESSAGE */}
              <textarea
                rows={4}
                placeholder="Describe your biological objectives..."
                className="input-style"
              />

              {/* BUTTON */}
              <button className="w-full bg-[#1F4D3E] text-white py-4 rounded-full tracking-widest uppercase hover:bg-[#16382d] transition">
                Send Inquiry
              </button>

            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
}