'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-20">
      <h1 className="text-3xl font-bold text-primary mb-2">Contact</h1>
      <p className="text-secondary mb-10">Want to get in touch? Drop me a message.</p>

      {status === 'success' ? (
        <div className="p-6 rounded-xl border border-accent/20 bg-accent/5 text-accent text-center">
          <p className="font-medium">Message sent!</p>
          <p className="text-sm mt-1 text-accent/70">I&apos;ll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-secondary mb-1.5">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-primary text-sm placeholder:text-muted focus:border-accent/40 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm text-secondary mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-primary text-sm placeholder:text-muted focus:border-accent/40 transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-secondary mb-1.5">Message</label>
            <textarea
              required
              rows="5"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-primary text-sm placeholder:text-muted focus:border-accent/40 transition-colors resize-none"
              placeholder="What's on your mind?"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover disabled:opacity-50 transition-all"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'error' && (
            <p className="text-red-500 text-sm mt-2">Something went wrong. Try again.</p>
          )}
        </form>
      )}
    </div>
  );
}
