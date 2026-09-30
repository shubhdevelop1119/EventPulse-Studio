import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Ticket,
  CheckCircle2,
  X,
  ExternalLink,
  Download,
  Share2,
  User,
  Mail,
  Sparkles,
  QrCode,
} from 'lucide-react';
import { EventFormData } from '../types/event';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: EventFormData;
  onSuccessToast: (msg: string) => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({
  isOpen,
  onClose,
  formData,
  onSuccessToast,
}) => {
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [ticketTier, setTicketTier] = useState('General Admission');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName.trim() || !attendeeEmail.trim()) return;

    const generatedId = `EP-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    setIsConfirmed(true);
    onSuccessToast(`🎉 Registration confirmed for ${attendeeName}! Pass ID: ${generatedId}`);
  };

  const handleDownloadCalendar = () => {
    // Generate .ics calendar file
    const title = formData.title || 'EventPulse Event';
    const description = `${formData.description || ''}\n\nVenue: ${formData.location || 'TBA'}`;
    const location = formData.location || 'Online';
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//EventPulse Studio//Event//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
      `LOCATION:${location}`,
      'DTSTART:20261114T180000Z',
      'DTEND:20261114T210000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    onSuccessToast('Calendar (.ics) invite downloaded!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!isConfirmed ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-2.5 mb-1">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-xs"
                style={{ backgroundColor: formData.accentColor || '#4f46e5' }}
              >
                <Ticket className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {formData.callToAction || 'Register for Event'}
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {formData.eventType || 'Official Event RSVP'}
                </span>
              </div>
            </div>

            {/* Event Summary Pill Card */}
            <div className="my-4 rounded-xl border border-slate-100 bg-slate-50 p-3.5 space-y-1.5">
              <div className="font-bold text-sm text-slate-900 leading-snug">
                {formData.title || 'Your Event'}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>
                    {formData.date || 'Date TBA'} {formData.time ? `· ${formData.time}` : ''}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span className="truncate max-w-[180px]">{formData.location || 'Venue TBA'}</span>
                </span>
              </div>

              {formData.eventLinkUrl && (
                <div className="pt-1.5 border-t border-slate-200/60 mt-1.5">
                  <a
                    href={formData.eventLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"
                  >
                    <span>Visit External Ticket / Info Page</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={attendeeEmail}
                    onChange={(e) => setAttendeeEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ticket Tier / Pass Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'General Admission', label: 'General Pass (Free)' },
                    { id: 'VIP Early-Bird', label: 'VIP Pass (Exclusive)' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTicketTier(t.id)}
                      className={`rounded-xl border p-2 text-left text-xs font-semibold transition-all ${
                        ticketTier === t.id
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-2xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  style={{ backgroundColor: formData.accentColor || '#4f46e5' }}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Confirm Registration & Get Pass</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Pass Screen */
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">You're Registered!</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pass confirmed for <strong className="text-slate-800">{attendeeName}</strong> ({ticketTier})
              </p>
            </div>

            {/* Virtual Ticket Badge */}
            <div className="rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 p-4 text-left space-y-2">
              <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                  {formData.eventType || 'Official Event Pass'}
                </span>
                <span className="font-mono text-xs font-bold text-slate-700">{ticketId}</span>
              </div>

              <div className="font-bold text-sm text-slate-900 leading-snug">
                {formData.title}
              </div>

              <div className="text-xs text-slate-600 space-y-0.5">
                <div>🗓️ {formData.date || 'Upcoming'} {formData.time ? `· ${formData.time}` : ''}</div>
                <div>📍 {formData.location || 'Online Venue'}</div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-indigo-700 font-semibold border-t border-indigo-100">
                <span>Attendee: {attendeeName}</span>
                <span className="text-emerald-700 font-bold">✓ Verified RSVP</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleDownloadCalendar}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
              >
                <Download className="h-4 w-4 text-indigo-600" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={onClose}
                className="flex items-center justify-center rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
