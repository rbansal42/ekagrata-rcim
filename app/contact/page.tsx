import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";

// Static contact data from environment variables with defaults
const contactData = {
  whatsapp_number: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "+919667545342",
  instagram_handle:
    process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "project_ekagrata",
  contact_email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@ekagrata.com",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-rose-50">
        <Image
          fill
          priority
          alt="Artisan Crafts"
          className="object-cover"
          src="/img.avif"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-wide mb-6 text-center max-w-4xl">
            Connect With Us
          </h1>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-10 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {/* WhatsApp Card */}
          <Link
            className="group"
            href={`https://wa.me/${contactData.whatsapp_number.replace(/\D/g, "")}`}
            target="_blank"
          >
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <FaWhatsapp className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-light mb-4">WhatsApp</h2>
              <p className="text-gray-600 font-light group-hover:text-green-600 transition-colors duration-300">
                {contactData.whatsapp_number}
              </p>
            </div>
          </Link>

          {/* Instagram Card */}
          <Link
            className="group"
            href={`https://instagram.com/${contactData.instagram_handle}`}
            target="_blank"
          >
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-yellow-500 flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <FaInstagram className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-light mb-4">Instagram</h2>
              <p className="text-gray-600 font-light group-hover:text-pink-600 transition-colors duration-300">
                @{contactData.instagram_handle}
              </p>
            </div>
          </Link>

          {/* Email Card */}
          <Link className="group" href={`mailto:${contactData.contact_email}`}>
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-600 to-rose-700 flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <FaEnvelope className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-light mb-4">Email</h2>
              <p className="text-gray-600 font-light group-hover:text-rose-600 transition-colors duration-300">
                {contactData.contact_email}
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-24 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Let&apos;s Create Something Beautiful Together
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Have questions about our artisanal products or interested in
            collaborating? We&apos;d love to hear from you. Reach out through
            any of these channels and we&apos;ll get back to you soon.
          </p>
        </div>
      </div>
    </div>
  );
}
