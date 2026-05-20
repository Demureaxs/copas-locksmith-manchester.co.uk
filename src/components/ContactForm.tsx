'use client';

import React, { useState } from 'react';

interface ContactFormProps {
  email: string;
}

export function ContactForm({ email }: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent('New Website Enquiry');
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\n\nMessage:\n${message}`
    );
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <input
          type='text'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Full Name'
          className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all'
        />
      </div>
      <div>
        <input
          type='tel'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Phone Number'
          className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all'
        />
      </div>
      <div>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='How can we help?'
          rows={3}
          className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all resize-none'
        />
      </div>
      <button
        type='submit'
        className='w-full cursor-pointer rounded-xl bg-gray-900 hover:bg-black text-white font-bold h-12 transition-all ease-in-out duration-500'
      >
        Send Enquiry
      </button>
    </form>
  );
}
