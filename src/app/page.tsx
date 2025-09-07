"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import emailjs from "emailjs-com";
import ChatbotWidget from "./ChatbotWidget"; // ✅ Is line ko import karein

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [showSolutions, setShowSolutions] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Contact form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Hero Slideshow Texts
  const heroTexts = [
    "🚀 Grow Your Business with Qitechs",
    "⚡ Smart IT Solutions for Every Need",
    "🤖 AI & Automation for Future Businesses",
    "📊 Manage Sales, Finance & HR with Ease",
  ];

  // Auto change text every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Smooth Scroll
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  // ✅ Send Email Function (ENV variables use)
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string, // ✅ Service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string, // ✅ Template ID
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string // ✅ Public Key
      )
      .then(
        () => {
          alert("✅ Message sent successfully!");
          setForm({ name: "", email: "", message: "" });
          setLoading(false);
        },
        (err) => {
          alert("❌ Failed to send: " + err.text);
          setLoading(false);
        }
      );
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 border-b border-gray-300">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center text-3xl font-extrabold text-[#50A959] tracking-wide cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <motion.img
              src="/logo.jpg"
              alt="Qitechs Logo"
              className="h-14 w-auto mr-2"
              animate={{ y: [0, -5, 0] }} // up and down bounce
              whileHover={{ scale: 1.3, rotate: 15 }} // hover effect
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
          </motion.h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 font-medium text-[#56585A]">
            {["Home", "About", "Solutions", "Products", "Skills", "Contact"].map(
              (item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.1, color: "#50A959" }}
                  className="relative cursor-pointer transition"
                  onClick={() => {
                    if (item === "Solutions") {
                      setShowSolutions((prev) => !prev);
                    } else {
                      scrollToSection(item.toLowerCase());
                      setShowSolutions(false);
                    }
                  }}
                >
                  {item}
                  {item === "Solutions" && showSolutions && (
                    <motion.ul
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="absolute mt-3 bg-white shadow-xl rounded-xl p-4 space-y-3 w-64 border border-gray-300"
                    >
                      <li
                        className="hover:text-[#50A959]"
                        onClick={() => {
                          scrollToSection("ai-agents");
                          setShowSolutions(false);
                        }}
                      >
                        AI Agents & Automation
                      </li>
                      <li
                        className="hover:text-[#50A959]"
                        onClick={() => {
                          scrollToSection("billing");
                          setShowSolutions(false);
                        }}
                      >
                        Inventory & Billing
                      </li>
                      <li
                        className="hover:text-[#50A959]"
                        onClick={() => {
                          scrollToSection("attendance");
                          setShowSolutions(false);
                        }}
                      >
                        Attendance Systems
                      </li>
                      <li
                        className="hover:text-[#50A959]"
                        onClick={() => {
                          scrollToSection("finance");
                          setShowSolutions(false);
                        }}
                      >
                        Finance Solutions
                      </li>
                      <li
                        className="hover:text-[#50A959]"
                        onClick={() => {
                          scrollToSection("custom");
                          setShowSolutions(false);
                        }}
                      >
                        Custom Business Software
                      </li>
                    </motion.ul>
                  )}
                </motion.li>
              )
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#50A959]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white shadow-xl rounded-b-2xl p-6 space-y-4 font-medium text-[#50A959] border-t border-gray-300"
            >
              {["Home", "About", "Solutions", "Products", "Skills", "Contact"].map(
                (item, i) => (
                  <li key={i} className="cursor-pointer hover:text-[#3E8E41]">
                    {item === "Solutions" ? (
                      <>
                        <div
                          onClick={() => setShowSolutions((prev) => !prev)}
                          className="flex justify-between items-center"
                        >
                          <span>Solutions</span>
                          <span>{showSolutions ? "▲" : "▼"}</span>
                        </div>
                        {showSolutions && (
                          <ul className="pl-4 mt-2 space-y-2 text-gray-700">
                            <li
                              className="hover:text-[#50A959]"
                              onClick={() => {
                                scrollToSection("ai-agents");
                                setMenuOpen(false);
                                setShowSolutions(false);
                              }}
                            >
                              AI Agents & Automation
                            </li>
                            <li
                              className="hover:text-[#50A959]"
                              onClick={() => {
                                scrollToSection("billing");
                                setMenuOpen(false);
                                setShowSolutions(false);
                              }}
                            >
                              Inventory & Billing
                            </li>
                            <li
                              className="hover:text-[#50A959]"
                              onClick={() => {
                                scrollToSection("attendance");
                                setMenuOpen(false);
                                setShowSolutions(false);
                              }}
                            >
                              Attendance Systems
                            </li>
                            <li
                              className="hover:text-[#50A959]"
                              onClick={() => {
                                scrollToSection("finance");
                                setMenuOpen(false);
                                setShowSolutions(false);
                              }}
                            >
                              Finance Solutions
                            </li>
                            <li
                              className="hover:text-[#50A959]"
                              onClick={() => {
                                scrollToSection("custom");
                                setMenuOpen(false);
                                setShowSolutions(false);
                              }}
                            >
                              Custom Business Software
                            </li>
                          </ul>
                        )}
                      </>
                    ) : (
                      <span
                        onClick={() => {
                          scrollToSection(item.toLowerCase());
                          setMenuOpen(false);
                        }}
                      >
                        {item}
                      </span>
                    )}
                  </li>
                )
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </header>
      {/* Hero Section */}
      <section id="home" className="pt-48 pb-24 text-center max-w-4xl mx-auto px-6 relative">
        <AnimatePresence mode="wait">
          <motion.h2
            key={index}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-[#56585A] mb-6"
          >
            {heroTexts[index]}
          </motion.h2>
        </AnimatePresence>

        <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
          At <span className="text-[#50A959] font-semibold">Qitechs</span>, we
          build{" "}
          <span className="text-[#50A959] font-semibold">
            futuristic business solutions
          </span>{" "}
          to make your work smarter, faster & more profitable.
        </p>

        <motion.div
          className="mt-10 flex justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => scrollToSection("products")}
            className="px-8 py-3 rounded-2xl bg-[#50A959] text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            🚀 Explore Products
          </button>
          <a
            href="https://wa.me/923198251617"
            target="_blank"
            className="px-8 py-3 rounded-2xl bg-[#50A959] text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            📞 WhatsApp Us
          </a>
        </motion.div>
      </section>
      {/* Products Section */}
      <section
        id="products"
        className="py-24 bg-white text-center relative"
      >
        <h3 className="text-4xl font-bold text-[#56585A] mb-14">
          Our Products
        </h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
          {/* Gym / Attendance System */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#f9f9f9] p-6 rounded-2xl shadow-xl border border-[#50A959]/30"
          >
            <h4 className="text-2xl font-semibold text-[#50A959] mb-3">
              Gym / Attendance System
            </h4>
            <p className="text-[#56585A]">
              Smart member management, payments & attendance tracking.
            </p>

            {/* YouTube Video Embed */}
            <div className="mt-5 rounded-xl overflow-hidden shadow-lg border border-[#50A959]/30 aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/TmyQ9leoIOs"
                title="Gym / Attendance System Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Features List */}
            <div className="mt-6 text-left text-[#56585A]">
              <p className="font-semibold text-[#50A959] mb-3">
                ✅ Features Included:
              </p>
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li>Member Registration with Photo</li>
                <li>Daily Attendance Tracking</li>
                <li>Monthly Payments & Auto Dues Insertion</li>
                <li>WhatsApp Integration (Auto reminders to members)</li>
                <li>Custom Packages & Plans</li>
                <li>Admin Panel & Staff Login</li>
                <li>Printable Slips & Reports</li>
                <li>Fingerprint Login (optional)</li>
                <li>Export to Excel for Payments & Reports</li>
                <li>User-Friendly Dashboard</li>
              </ul>
            </div>
          </motion.div>

          {/* Billing System */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#f9f9f9] p-6 rounded-2xl shadow-xl border border-[#50A959]/30"
          >
            <h4 className="text-2xl font-semibold text-[#50A959] mb-3">
              Billing System
            </h4>
            <p className="text-[#56585A]">
              Track inventory, manage sales & automate finances.
            </p>

            {/* YouTube Video Embed */}
            <div className="mt-5 rounded-xl overflow-hidden shadow-lg border border-[#50A959]/30 aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/QA5MNxE23dM"
                title="Billing System Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Features List */}
            <div className="mt-6 text-left text-[#56585A]">
              <p className="font-semibold text-[#50A959] mb-3">
                ✅ Features Included:
              </p>
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li>AI Agent (Roman Urdu ➝ Urdu)</li>
                <li>Customer & Due Management</li>
                <li>Smart Sales Reports & Discounts</li>
                <li>Employee Salary Module</li>
                <li>Item Stock Tracking & Management</li>
              </ul>
            </div>

          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="py-24 bg-white text-center relative"
      >
        <h3 className="text-4xl font-bold text-[#56585A] mb-10">
          About Us
        </h3>

        <div className="max-w-4xl mx-auto bg-[#f9f9f9] p-8 rounded-2xl shadow-xl border border-[#50A959]/30 text-left">
          <h4 className="text-2xl font-semibold text-[#50A959] mb-4">
            CEO & Founder – Mr. Iqbal Ahmed
          </h4>
          <p className="text-[#56585A] leading-relaxed mb-6">
            Mr. Iqbal Ahmed, the visionary behind{" "}
            <span className="text-[#50A959] font-semibold">
              Quality Intelligence Tech (SMC Pvt.) Ltd.
            </span>
            , has always believed in innovation and excellence. With years of
            dedication and leadership, he has built a company focused on
            delivering smart technological solutions, ensuring customer
            satisfaction, and shaping the future of digital transformation in
            Pakistan.
          </p>

          {/* Address Box */}
          <div className="bg-[#f9f9f9] border border-[#50A959]/30 rounded-xl p-5 text-[#56585A] text-sm">
            <p className="font-semibold text-[#50A959]">
              QUALITY INTELLIGENCE TECH (SMC PVT.) LTD.
            </p>
            <p className="mt-2">
              Suit #A1/62, Rizwan Cooperative, Housing Society, <br />
              Sector-38/A, Scheme-33, Karachi East, Gulshan Town. <br />
              Phone: 0213 4490046
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-white text-center relative">
        <h3 className="text-4xl font-bold text-[#56585A] mb-12">
          Our Skills & Solutions
        </h3>

        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {[
            { id: "ai-agents", title: "AI Agents & Automation" },
            { id: "billing", title: "Inventory & Billing" },
            { id: "attendance", title: "Attendance Systems" },
            { id: "finance", title: "Finance Solutions" },
            { id: "custom", title: "Custom Business Software" },
          ].map((skill, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#50A959",
                color: "#fff",
              }}
              onClick={() => scrollToSection(skill.id)}
              className="px-8 py-4 bg-[#f9f9f9] rounded-xl shadow-md cursor-pointer border border-[#50A959] text-[#56585A] transition"
            >
              {skill.title}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Solutions Detail Sections */}
      <section id="ai-agents" className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-2xl shadow-xl border border-gray-200">
          <h3 className="text-3xl font-bold text-[#56585A] mb-6">
            🤖 AI Agents & Automation
          </h3>
          <p className="text-[#56585A] leading-relaxed mb-6">
            Qitechs AI Agents help businesses automate daily workflows,
            handle repetitive tasks, and provide 24/7 smart support.
            Our automation ensures higher productivity and reduced costs.
          </p>
          <ul className="space-y-2 text-[#56585A] list-disc list-inside text-left">
            <li>Voice & Chat AI Assistants</li>
            <li>Task & Workflow Automation</li>
            <li>Custom AI Integrations</li>
            <li>Multi-language Support</li>
          </ul>
        </div>
      </section>

      <section id="billing" className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-2xl shadow-xl border border-gray-200">
          <h3 className="text-3xl font-bold text-[#56585A] mb-6">
            💳 Inventory & Billing System
          </h3>
          <p className="text-[#56585A] leading-relaxed mb-6">
            Manage sales, track inventory, and generate bills with ease.
            Our billing system keeps your business finances clear and efficient.
          </p>
          <ul className="space-y-2 text-[#56585A] list-disc list-inside text-left">
            <li>Smart Sales & Purchase Reports</li>
            <li>Customer Due & Payment Tracking</li>
            <li>Stock Alerts & Auto Updates</li>
            <li>One-Click Excel Export</li>
          </ul>
        </div>
      </section>

      <section id="attendance" className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-2xl shadow-xl border border-gray-200">
          <h3 className="text-3xl font-bold text-[#56585A] mb-6">
            Attendance Systems
          </h3>
          <p className="text-[#56585A] leading-relaxed mb-6">
            From gyms to offices, track attendance easily.
            Our smart system integrates payments, memberships, and biometric login.
          </p>
          <ul className="space-y-2 text-[#56585A] list-disc list-inside text-left">
            <li>Fingerprint / Face Recognition Login</li>
            <li>Daily Attendance Reports</li>
            <li>Auto Payment Reminders via WhatsApp</li>
            <li>Custom Membership Plans</li>
          </ul>
        </div>
      </section>

      <section id="finance" className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-2xl shadow-xl border border-gray-200">
          <h3 className="text-3xl font-bold text-[#56585A] mb-6">
            📊 Finance Solutions
          </h3>
          <p className="text-[#56585A] leading-relaxed mb-6">
            Powerful finance software that automates salary, invoices,
            and expense management. Perfect for SMEs & Enterprises.
          </p>
          <ul className="space-y-2 text-[#56585A] list-disc list-inside text-left">
            <li>Employee Salary Module</li>
            <li>Expense & Income Reports</li>
            <li>Invoice Generation</li>
            <li>Tax & Profit Calculations</li>
          </ul>
        </div>
      </section>

      <section id="custom" className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-2xl shadow-xl border border-gray-200">
          <h3 className="text-3xl font-bold text-[#56585A] mb-6">
            ⚡ Custom Business Software
          </h3>
          <p className="text-[#56585A] leading-relaxed mb-6">
            We design tailor-made business software solutions according
            to your company needs — scalable, secure, and future-ready.
          </p>
          <ul className="space-y-2 text-[#56585A] list-disc list-inside text-left">
            <li>Customized ERP Solutions</li>
            <li>CRM Development</li>
            <li>HR & Payroll Systems</li>
            <li>Industry-Specific Automation</li>
          </ul>
        </div>
      </section>


      {/* ✅ Contact Section */}
      <section
        id="contact"
        className="py-24 bg-white text-center relative"
      >
        <h3 className="text-4xl font-bold text-[#56585A] mb-10">
          Contact Us
        </h3>

        <form
          onSubmit={sendEmail}
          className="max-w-lg mx-auto space-y-5 bg-gray-100/60 p-8 rounded-2xl shadow-lg border border-[#56585A]"
        >
          {/* Name Field */}
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full px-5 py-3 rounded-xl bg-white border border-[#56585A] focus:ring-2 focus:ring-blue-500 outline-none text-[#56585A]"
          />

          {/* Email Field */}
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-5 py-3 rounded-xl bg-white border border-[#56585A] focus:ring-2 focus:ring-blue-500 outline-none text-[#56585A]"
          />

          {/* Message Field */}
          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            className="w-full px-5 py-3 rounded-xl bg-white border border-[#56585A] focus:ring-2 focus:ring-blue-500 outline-none text-[#56585A]"
            rows={4}
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-3 bg-[#56585A] hover:opacity-90 rounded-xl font-semibold shadow-lg text-white"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
      {/* Footer */}
      <footer className="py-8 text-center text-[#56585A] text-sm bg-white border-t border-gray-300 transition hover:text-gray-800">
        © {new Date().getFullYear()} Qitechs. Crafted with 💙 by Qitechs Team
      </footer>
      {/* ✅ Yahan par ChatbotWidget component ko render karein */}
      <ChatbotWidget />
    </div>
  );
}
