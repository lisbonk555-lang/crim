import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { founderData } from '../data/founderData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showNotification } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showNotification('Your message has been delivered to the Royal Secretariat.');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="font-royal text-3xl sm:text-4xl font-extrabold text-stone-900">
            CONNECT WITH THE ROYAL SANCTUARY
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Reach our international secretariat, prayer lines, and pastoral bureaus in Accra and London.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Headquarters Sanctuary
              </span>
              <h3 className="font-royal font-bold text-lg text-stone-900 mb-3">
                Church of Royals International Ministry
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-stone-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#581C87] shrink-0 mt-0.5" />
                  <span>Cathedral of Royals, Independence Avenue, Ridge, Accra, Ghana</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#581C87] shrink-0" />
                  <span>+233 30 223 9988 / +233 24 555 7770</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#581C87] shrink-0" />
                  <span>info@churchofroyals.com / prayers@churchofroyals.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#581C87] shrink-0" />
                  <span>Prayer Lines Open 24 Hours · Sanctuary Office 8:00 AM - 5:00 PM GMT</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <span className="text-xs font-serif italic text-stone-800 block mb-1">
                "{founderData.slogan}"
              </span>
              <p className="text-[11px] text-stone-500">
                General Overseer: Reverend Listowel Sarsah Adentwi-EdIi (Prophet Do All)
              </p>
            </div>
          </div>

          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h3 className="font-royal font-bold text-lg text-stone-900 mb-1">
              Send a Direct Message or Prayer Petition
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Every message is placed before the altar during midnight prayer decrees.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-royal text-lg font-bold text-emerald-950">
                  Message Successfully Received
                </h4>
                <p className="text-xs text-emerald-800">
                  Our pastoral care team and intercessory council have received your message. May the peace of God rest upon you!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="His/Her Royal Majesty..."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:border-[#581C87]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:border-[#581C87]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Subject / Ministry Department
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:border-[#581C87]"
                  >
                    <option value="Prayer Request">Prophetic Prayer Request</option>
                    <option value="General Inquiry">General Church Inquiry</option>
                    <option value="Royals TV Broadcast">The Royals TV Broadcast & Media</option>
                    <option value="Royal Ambassador Network">Royal Ambassador Chapters</option>
                    <option value="Philanthropy & Seed">Philanthropy & Free Will Partnerships</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Message / Petition *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:border-[#581C87]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#581C87] hover:bg-[#6B21A8] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit to Royal Secretariat</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
