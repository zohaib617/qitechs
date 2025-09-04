"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import emailjs from "emailjs-com";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans overflow-hidden">
      {/* Navbar */}
<header className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-md shadow-lg z-50 border-b border-gray-700/40">
  <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
    {/* Logo */}
    <motion.h1
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-wide cursor-pointer"
      onClick={() => scrollToSection("home")}
    >
      Qitechs
    </motion.h1>

    {/* Desktop Menu */}
    <ul className="hidden md:flex space-x-8 font-medium text-gray-300">
      {["Home", "About", "Solutions", "Products", "Skills", "Contact"].map(
        (item, i) => (
          <motion.li
            key={i}
            whileHover={{ scale: 1.1, color: "#60a5fa" }}
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
                className="absolute mt-3 bg-gray-900/95 backdrop-blur-md shadow-xl rounded-xl p-4 space-y-3 w-64 border border-gray-700/50"
              >
                <li
                  className="hover:text-blue-400"
                  onClick={() => {
                    scrollToSection("ai-agents");
                    setShowSolutions(false);
                  }}
                >
                  AI Agents & Automation
                </li>
                <li
                  className="hover:text-blue-400"
                  onClick={() => {
                    scrollToSection("billing");
                    setShowSolutions(false);
                  }}
                >
                  Inventory & Billing
                </li>
                <li
                  className="hover:text-blue-400"
                  onClick={() => {
                    scrollToSection("attendance");
                    setShowSolutions(false);
                  }}
                >
                  Attendance Systems
                </li>
                <li
                  className="hover:text-blue-400"
                  onClick={() => {
                    scrollToSection("finance");
                    setShowSolutions(false);
                  }}
                >
                  Finance Solutions
                </li>
                <li
                  className="hover:text-blue-400"
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
      className="md:hidden text-gray-300"
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
        className="md:hidden bg-gray-900/95 backdrop-blur-md shadow-xl rounded-b-2xl p-6 space-y-4 font-medium text-gray-300 border-t border-gray-700/40"
      >
        {["Home", "About", "Solutions", "Products", "Skills", "Contact"].map(
          (item, i) => (
            <li key={i} className="cursor-pointer hover:text-blue-400">
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
                    <ul className="pl-4 mt-2 space-y-2 text-gray-400">
                      <li
                        className="hover:text-blue-400"
                        onClick={() => {
                          scrollToSection("ai-agents");
                          setMenuOpen(false);
                          setShowSolutions(false);
                        }}
                      >
                        AI Agents & Automation
                      </li>
                      <li
                        className="hover:text-blue-400"
                        onClick={() => {
                          scrollToSection("billing");
                          setMenuOpen(false);
                          setShowSolutions(false);
                        }}
                      >
                        Inventory & Billing
                      </li>
                      <li
                        className="hover:text-blue-400"
                        onClick={() => {
                          scrollToSection("attendance");
                          setMenuOpen(false);
                          setShowSolutions(false);
                        }}
                      >
                        Attendance Systems
                      </li>
                      <li
                        className="hover:text-blue-400"
                        onClick={() => {
                          scrollToSection("finance");
                          setMenuOpen(false);
                          setShowSolutions(false);
                        }}
                      >
                        Finance Solutions
                      </li>
                      <li
                        className="hover:text-blue-400"
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
      <section
        id="home"
        className="pt-48 pb-24 text-center max-w-4xl mx-auto px-6 relative"
      >
        {/* Floating background shapes */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
        ></motion.div>

        <AnimatePresence mode="wait">
          <motion.h2
            key={index}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6"
          >
            {heroTexts[index]}
          </motion.h2>
        </AnimatePresence>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          At <span className="text-blue-400 font-semibold">Qitechs</span>, we
          build{" "}
          <span className="text-purple-400">
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
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold shadow-lg hover:scale-105 transition"
          >
            🚀 Explore Products
          </button>
          <a
            href="https://wa.me/923198251617"
            target="_blank"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 font-semibold shadow-lg hover:scale-105 transition"
          >
            📞 WhatsApp Us
          </a>
        </motion.div>
      </section>

      {/* Products Section */}
      <section
        id="products"
        className="py-24 bg-gradient-to-b from-gray-800 to-gray-900 text-center relative"
      >
        <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-14">
          Our Products
        </h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
          {/* Gym / Attendance System */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-700/40"
          >
            <h4 className="text-2xl font-semibold text-blue-400 mb-3">
              Gym / Attendance System
            </h4>
            <p className="text-gray-400">
              Smart member management, payments & attendance tracking.
            </p>

            {/* YouTube Video Embed */}
            <div className="mt-5 rounded-xl overflow-hidden shadow-lg border border-gray-700 aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/TmyQ9leoIOs"
                title="Gym / Attendance System Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Features List */}
            <div className="mt-6 text-left text-gray-300">
              <p className="font-semibold text-blue-400 mb-3">
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
            className="bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-700/40"
          >
            <h4 className="text-2xl font-semibold text-blue-400 mb-3">
              Billing System
            </h4>
            <p className="text-gray-400">
              Track inventory, manage sales & automate finances.
            </p>

            {/* YouTube Video Embed */}
            <div className="mt-5 rounded-xl overflow-hidden shadow-lg border border-gray-700 aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/QA5MNxE23dM"
                title="Billing System Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Features List */}
            <div className="mt-6 text-left text-gray-300">
              <p className="font-semibold text-blue-400 mb-3">
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

            <p className="mt-4 text-gray-400 text-xs italic">
              Here’s a demo link of our work 👆
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-center relative"
      >
        <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-10">
          About Us
        </h3>

        <div className="max-w-4xl mx-auto bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-700/40 text-left">
          <h4 className="text-2xl font-semibold text-blue-400 mb-4">
            CEO & Founder – Mr. Iqbal Ahmed
          </h4>
          <p className="text-gray-300 leading-relaxed mb-6">
            Mr. Iqbal Ahmed, the visionary behind{" "}
            <span className="text-blue-400 font-semibold">
              Quality Intelligence Tech (SMC Pvt.) Ltd.
            </span>
            , has always believed in innovation and excellence. With years of
            dedication and leadership, he has built a company focused on
            delivering smart technological solutions, ensuring customer
            satisfaction, and shaping the future of digital transformation in
            Pakistan.
          </p>

          {/* Address Box */}
          <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-5 text-gray-300 text-sm">
            <p className="font-semibold text-blue-400">
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
<section id="skills" className="py-24 text-center relative">
  <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-12">
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
          scale: 1.15,
          backgroundColor: "#3b82f6",
          color: "#fff",
        }}
        onClick={() => scrollToSection(skill.id)} // ✅ Click -> scroll karega detail section pe
        className="px-8 py-4 bg-gray-800/80 backdrop-blur-md rounded-xl shadow-md cursor-pointer border border-gray-700/40 transition"
      >
        {skill.title}
      </motion.div>
    ))}
  </div>
</section>

{/* Solutions Detail Sections */}
<section id="ai-agents" className="py-24 bg-gray-900 text-center">
  <h3 className="text-3xl font-bold text-blue-400 mb-6">
    🤖 AI Agents & Automation
  </h3>
  <p className="max-w-3xl mx-auto text-gray-300 leading-relaxed">
    Qitechs AI Agents help businesses automate daily workflows, 
    handle repetitive tasks, and provide 24/7 smart support. 
    Our automation ensures higher productivity and reduced costs.
  </p>
  <ul className="mt-6 space-y-2 text-gray-400 list-disc list-inside max-w-2xl mx-auto text-left">
    <li>Voice & Chat AI Assistants</li>
    <li>Task & Workflow Automation</li>
    <li>Custom AI Integrations</li>
    <li>Multi-language Support</li>
  </ul>
</section>

<section id="billing" className="py-24 bg-gray-800 text-center">
  <h3 className="text-3xl font-bold text-purple-400 mb-6">
    💳 Inventory & Billing System
  </h3>
  <p className="max-w-3xl mx-auto text-gray-300 leading-relaxed">
    Manage sales, track inventory, and generate bills with ease. 
    Our billing system keeps your business finances clear and efficient.
  </p>
  <ul className="mt-6 space-y-2 text-gray-400 list-disc list-inside max-w-2xl mx-auto text-left">
    <li>Smart Sales & Purchase Reports</li>
    <li>Customer Due & Payment Tracking</li>
    <li>Stock Alerts & Auto Updates</li>
    <li>One-Click Excel Export</li>
  </ul>
</section>

<section id="attendance" className="py-24 bg-gray-900 text-center">
  <h3 className="text-3xl font-bold text-green-400 mb-6">
     Attendance Systems
  </h3>
  <p className="max-w-3xl mx-auto text-gray-300 leading-relaxed">
    From gyms to offices, track attendance easily. 
    Our smart system integrates payments, memberships, and biometric login.
  </p>
  <ul className="mt-6 space-y-2 text-gray-400 list-disc list-inside max-w-2xl mx-auto text-left">
    <li>Fingerprint / Face Recognition Login</li>
    <li>Daily Attendance Reports</li>
    <li>Auto Payment Reminders via WhatsApp</li>
    <li>Custom Membership Plans</li>
  </ul>
</section>

<section id="finance" className="py-24 bg-gray-800 text-center">
  <h3 className="text-3xl font-bold text-yellow-400 mb-6">
    📊 Finance Solutions
  </h3>
  <p className="max-w-3xl mx-auto text-gray-300 leading-relaxed">
    Powerful finance software that automates salary, invoices, 
    and expense management. Perfect for SMEs & Enterprises.
  </p>
  <ul className="mt-6 space-y-2 text-gray-400 list-disc list-inside max-w-2xl mx-auto text-left">
    <li>Employee Salary Module</li>
    <li>Expense & Income Reports</li>
    <li>Invoice Generation</li>
    <li>Tax & Profit Calculations</li>
  </ul>
</section>

<section id="custom" className="py-24 bg-gray-900 text-center">
  <h3 className="text-3xl font-bold text-pink-400 mb-6">
    ⚡ Custom Business Software
  </h3>
  <p className="max-w-3xl mx-auto text-gray-300 leading-relaxed">
    We design tailor-made business software solutions according 
    to your company needs — scalable, secure, and future-ready.
  </p>
  <ul className="mt-6 space-y-2 text-gray-400 list-disc list-inside max-w-2xl mx-auto text-left">
    <li>Customized ERP Solutions</li>
    <li>CRM Development</li>
    <li>HR & Payroll Systems</li>
    <li>Industry-Specific Automation</li>
  </ul>
</section>

{/* ✅ Contact Section */}
<section
  id="contact"
  className="py-24 bg-gradient-to-b from-gray-900 to-black text-center relative"
>
  <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-10">
    Contact Us
  </h3>

  <form
    onSubmit={sendEmail}
    className="max-w-lg mx-auto space-y-5 bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-700/40"
  >
    {/* Name Field */}
    <input
      type="text"
      placeholder="Your Name"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
      required
      className="w-full px-5 py-3 rounded-xl bg-gray-900/80 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
    />

    {/* Email Field */}
    <input
      type="email"
      placeholder="Your Email"
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
      required
      className="w-full px-5 py-3 rounded-xl bg-gray-900/80 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
    />

    {/* Message Field */}
    <textarea
      placeholder="Your Message"
      value={form.message}
      onChange={(e) => setForm({ ...form, message: e.target.value })}
      required
      className="w-full px-5 py-3 rounded-xl bg-gray-900/80 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
      rows={4}
    ></textarea>

    {/* Submit Button */}
    <button
      type="submit"
      disabled={loading}
      className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 rounded-xl font-semibold shadow-lg"
    >
      {loading ? "Sending..." : "Send Message"}
    </button>
  </form>
</section>
      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm bg-black border-t border-gray-800 hover:text-gray-300 transition">
        © {new Date().getFullYear()} Qitechs. Crafted with 💙 by Qitechs Team
      </footer>
    </div>
  );
}
