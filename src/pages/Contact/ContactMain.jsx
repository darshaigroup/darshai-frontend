import PageHeader from "../../components/common/PageHeader";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    interest: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://your-api-endpoint.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      alert("Message sent successfully!");

      // reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        interest: "",
        message: "",
      });

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]">

      {/* HERO */}
      <PageHeader
        tag="Get in Touch"
        title="Contact Darshai"
        subtitle="Have questions or want to know more about our services? We're here to help."
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000"
        overlay="bg-[#1F4D3E]/80"
      />

      {/* MAIN SECTION */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT */}
          <div>
            <h2 className="text-5xl md:text-6xl font-serif text-[#1E7A3A] mb-8">
              Let’s start a{" "}
              <span className="italic text-[#C6A75E]">conversation</span>
            </h2>

            <p className="text-[#1F4D3E]/70 text-lg mb-12 font-light">
              Reach out to us for program details, support, or any queries.
            </p>

            <div className="space-y-10">

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-[#1F4D3E]/5 rounded-2xl flex items-center justify-center">
                  <Mail className="text-[#1F4D3E]" />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-[#1F4D3E]">Email</h4>
                  <p className="text-[#1F4D3E]/50">info@darshaigroup.com</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-[#1F4D3E]/5 rounded-2xl flex items-center justify-center">
                  <Phone className="text-[#1F4D3E]" />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-[#1F4D3E]">Phone</h4>
                  <p className="text-[#1F4D3E]/50">+91-7349171511</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-[#1F4D3E]/5 rounded-2xl flex items-center justify-center">
                  <MapPin className="text-[#1F4D3E]" />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-[#1F4D3E]">Location</h4>
                  <p className="text-[#1F4D3E]/50">
                   K-tech Innovation Hub, (CIF), 3rd Floor, Plama Center, Bejai - Kapikad Rd, near Jayalakshmi Silks, Lalbagh, Mangaluru, Karnataka 575004
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#F7F3EA] p-10 rounded-[40px] shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NAME */}
              <div>
                <label className="text-xs tracking-widest text-[#C6A75E] uppercase mb-2 block">
                  Full Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full bg-[#EDE6DA] px-6 py-4 rounded-full outline-none"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-xs tracking-widest text-[#C6A75E] uppercase mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email"
                  className="w-full bg-[#EDE6DA] px-6 py-4 rounded-full outline-none"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="text-xs tracking-widest text-[#C6A75E] uppercase mb-2 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full bg-[#EDE6DA] px-6 py-4 rounded-full outline-none"
                />
              </div>

              {/* LOCATION */}
              <div>
                <label className="text-xs tracking-widest text-[#C6A75E] uppercase mb-2 block">
                  Location
                </label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full bg-[#EDE6DA] px-6 py-4 rounded-full outline-none"
                />
              </div>

              {/* INTEREST */}
              <div>
                <label className="text-xs tracking-widest text-[#C6A75E] uppercase mb-2 block">
                  Interest
                </label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full bg-[#EDE6DA] px-6 py-4 rounded-full outline-none"
                >
                  <option value="">Select Interest</option>
                  <option>Consultation & Treatment</option>
                  <option>Wellness Experience</option>
                  <option>Other</option>
                </select>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="text-xs tracking-widest text-[#C6A75E] uppercase mb-2 block">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your requirement..."
                  className="w-full bg-[#EDE6DA] px-6 py-4 rounded-[25px] outline-none"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1E7A3A] text-white py-4 rounded-full tracking-widest uppercase hover:bg-[#14532d] transition shadow-lg disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Inquiry"}
              </button>

            </form>
          </motion.div>

        </div>
      </section>

      {/* MAP */}
      <section className="px-6 md:px-20 pb-20 max-w-7xl mx-auto">
        <div className="rounded-[40px] overflow-hidden shadow-xl border border-[#1F4D3E]/10">
         <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.3143477900458!2d74.83868647683381!3d12.887497216713085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a682812e959%3A0x7600d08ed0eb0778!2sK-tech%20Innovation%20Hub%2C(CIF)%20Mangalore!5e0!3m2!1sen!2sin!4v1776771992219!5m2!1sen!2sin"
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="w-full"
      title="Darshai Location"
    ></iframe>
        </div>
      </section>

    </div>
  );
}