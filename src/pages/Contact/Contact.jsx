import React from "react";
import {
  FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram,
  FaPhoneAlt, FaMapMarkerAlt, FaEnvelope,
} from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import contactBg from "../../assets/images/wellness.png";

// CAPTCHA Component
function CaptchaImage({ text }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 20; i++) {
      ctx.strokeStyle = `rgba(220,50,50,${Math.random() * 0.5 + 0.2})`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.bezierCurveTo(
        Math.random() * canvas.width, Math.random() * canvas.height,
        Math.random() * canvas.width, Math.random() * canvas.height,
        Math.random() * canvas.width, Math.random() * canvas.height
      );
      ctx.stroke();
    }

    text.split("").forEach((char, i) => {
      ctx.save();
      ctx.font = `bold ${24 + Math.random() * 10}px serif`;
      ctx.fillStyle = i % 2 === 0 ? "#111" : "#333";
      ctx.translate(30 + i * 38, 45);
      ctx.rotate((Math.random() - 0.5) * 0.6);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      width={220}
      height={70}
      className="rounded border border-gray-200"
    />
  );
}

function generateCaptcha() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 5 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function Contact() {
  const [formData, setFormData] = React.useState({
    name: "", email: "", mobile: "", title: "", message: "", captcha: "",
  });

  const [captchaText, setCaptchaText] = React.useState(generateCaptcha);
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setFormData((prev) => ({ ...prev, captcha: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message) {
      setError("Please fill out the message field.");
      return;
    }
    if (formData.captcha !== captchaText) {
      setError("Incorrect CAPTCHA. Please try again.");
      refreshCaptcha();
      return;
    }
    setError("");
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", mobile: "", title: "", message: "", captcha: "" });
    refreshCaptcha();
  };

  const cards = [
    { type: "phone", title: "LET'S TALK", icon: FaPhoneAlt, value: "+91 98765 43210" },
    { type: "address", title: "VISIT OUR OFFICE", icon: FaMapMarkerAlt, value: "3rd Floor, Plama Center, Bejai-Kapikad Rd, Mangaluru, Karnataka" },
    { type: "email", title: "E-MAIL US", icon: FaEnvelope, value: "info@darshai.com", link: "mailto:info@darshai.com" },
  ];

  const inputClass =
    "w-full bg-transparent border-b-2 border-green-600 py-2 text-gray-700 placeholder-gray-400 outline-none focus:border-green-700 transition";

  return (
    <div>

    {/* Social Icons */}
<div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">

  {/* Facebook */}
  <div className="bg-[#1877F2] text-white p-3 rounded-full shadow-lg hover:scale-110 transition cursor-pointer">
    <FaFacebookF />
  </div>

  {/* LinkedIn */}
  <div className="bg-[#0A66C2] text-white p-3 rounded-full shadow-lg hover:scale-110 transition cursor-pointer">
    <FaLinkedinIn />
  </div>

  {/* Twitter */}
  <div className="bg-[#1DA1F2] text-white p-3 rounded-full shadow-lg hover:scale-110 transition cursor-pointer">
    <FaTwitter />
  </div>

  {/* Instagram */}
  <div className="bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white p-3 rounded-full shadow-lg hover:scale-110 transition cursor-pointer">
    <FaInstagram />
  </div>

</div>

      {/* Header */}
      {/* Background Image */}
      <section
  className="h-[260px] flex items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: `url(${contactBg})` }}
>
  <h1 className="text-5xl md:text-6xl font-extrabold text-white">
    Contact Us
  </h1>
</section>

      {/* Cards */}
      <div className="bg-gray-100 py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            return (
              <div
                key={card.type}
                className="group rounded-3xl p-8 text-center shadow-lg cursor-pointer 
                transition-all duration-300 ease-in-out
                bg-gray-50 text-gray-800
                hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-300
                hover:bg-green-500 hover:text-white"
              >
                {/* ICON */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 
                bg-green-50 text-green-600 
                transition-all duration-300 
                group-hover:bg-white/20 group-hover:text-white">
                  <card.icon className="text-3xl" />
                </div>

                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-sm">
  {card.type === "email" ? (
    <a
      href={card.link}
      className="transition duration-300 hover:text-green-200 hover:underline"
    >
      {card.value}
    </a>
  ) : (
    card.value
  )}
</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-10">

          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-1">
            Quick Contact
          </h2>
          <p className="text-center text-sm text-gray-500 mb-8">
            We Reply within 24 hours
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name*" className={inputClass} required />

            <div className="flex gap-6">
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email*" className={`${inputClass} w-1/2`} required />
              <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile*" className={`${inputClass} w-1/2`} required />
            </div>

            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title*" className={inputClass} />

            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message*" rows={4} className={`${inputClass} resize-y`} />

            {/* CAPTCHA */}
            <div className="flex items-center gap-4">
              <CaptchaImage text={captchaText} />
              <button type="button" onClick={refreshCaptcha} className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                <FiRefreshCw className="text-green-600 text-xl" />
              </button>
            </div>

            <input name="captcha" value={formData.captcha} onChange={handleChange} placeholder="Enter captcha text*" className={inputClass} required />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition shadow-sm">
              Submit
            </button>

          </form>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full h-[400px] md:h-[300px]">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.314429007816!2d74.8386864748658!3d12.887491987420226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a682812e959%3A0x7600d08ed0eb0778!2sK-tech%20Innovation%20Hub%2C(CIF)%20Mangalore!5e0!3m2!1sen!2sin!4v1774848619627!5m2!1sen!2sin"
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
        />
      </div>

    </div>
  );
}

export default Contact;