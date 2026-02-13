'use client';

import React, { useState } from 'react';

import { metricsService } from '@/src/lib/services/metricsService';

export default function MetricsForm() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await metricsService.create({
        name,
        value: Number(value),
      });
      alert('Metric saved successfully! 🎉');
      setName('');
      setValue('');
    } catch (error) {
      console.error(error);
      alert('Error saving metric. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 border rounded-lg shadow-sm bg-white max-w-md'>
      <div className='mb-4'>
        <label className='block text-sm font-medium mb-1 text-slate-700'>Metric Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full p-2 border rounded text-slate-900 focus:ring-2 focus:ring-[#ff585d] outline-none'
          placeholder='e.g. Daily Active Users'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium mb-1 text-slate-700'>Value</label>
        <input
          type='number'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='w-full p-2 border rounded text-slate-900 focus:ring-2 focus:ring-[#ff585d] outline-none'
          placeholder='0'
          required
        />
      </div>
      <button
        type='submit'
        disabled={loading}
        className='w-full bg-[#ff585d] text-white py-2 rounded font-bold hover:bg-[#e54f54] transition-colors disabled:opacity-50'
      >
        {loading ? 'Saving...' : 'Add Metric'}
      </button>
    </form>
  );
}
