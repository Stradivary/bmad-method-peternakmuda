'use client';
import React, { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    // Integrasi pengiriman pesan di sini
  };

  return (
    <section className="py-12 px-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4 text-green-700">Hubungi Kami</h2>
      {!sent ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nama"
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="border px-4 py-2 rounded"
          />
          <textarea
            placeholder="Pesan"
            required
            className="border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Kirim Pesan
          </button>
        </form>
      ) : (
        <div className="text-green-700 font-semibold">
          Pesan Anda telah terkirim. Terima kasih!
        </div>
      )}
    </section>
  );
}