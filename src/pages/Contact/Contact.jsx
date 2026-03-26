import React from 'react'

function Contact() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
     const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

     const handleSubmit = (e) => {
      e.preventDefault();
      
      console.log(formData);
      alert("Message sent Successfully");
    };

  return (
    <div className="min-h-screen bg-lightBg px-6 md:px-16 py-12">
      
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Connect with Our Team 
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            Contact our excellence-driven experts today to bring your vision to life.
          </p>

          <div className="space-y-3 text-gray-700">
            <p>📞 +91 98765 43210</p>
            <p>📧 support@darshai.com</p>
            <p> India</p>
          </div>

          <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Want to Join Our Team?
            </h3>
            <p className="text-gray-600 mb-3">
              We are always looking for talented individuals.
            </p>
            <button className="text-primary font-bold hover:underline">
              Visit Careers →
            </button>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-primary text-white p-8 rounded-2xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <input name="name" placeholder="Full Name" onChange={handleChange} className="p-3 rounded-lg text-black w-full" required />
              <input name="email" type="email" placeholder="Email Address" onChange={handleChange} className="p-3 rounded-lg text-black w-full" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input name="phone" placeholder="Phone Number" onChange={handleChange} className="p-3 rounded-lg text-black w-full" />
              <input name="location" placeholder="Location" onChange={handleChange} className="p-3 rounded-lg text-black w-full" />
            </div>

            <select name="service" onChange={handleChange} className="p-3 rounded-lg text-black w-full">
              <option value="">Select Service</option>
              <option>Consultation</option>
              <option>Health Analysis</option>
              <option>Training Plan</option>
            </select>

            <textarea name="message" rows="5" placeholder="Tell us about your project..." onChange={handleChange} className="p-3 rounded-lg text-black w-full" required></textarea>

            <button type="submit" className="bg-white text-primary px-6 py-3 rounded-full font-bold hover:scale-105 transition">
              Submit →
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Contact