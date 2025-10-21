"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import React from "react";

// Local JSX declaration to satisfy the TypeScript checker in this file
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

type GalleryItem = {
  id: number;
  title: string;
  image: string;
  description: string;
};

export default function Gallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const openLightbox = (item: GalleryItem) => {
    setActiveItem(item);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setActiveItem(null);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
    }
    if (lightboxOpen) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, closeLightbox]);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery");
        if (!res.ok) throw new Error("Gagal mengambil data gallery");
        const data = await res.json();
        setGallery(data);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  if (loading) return <div className="text-center py-8">Memuat galeri...</div>;
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-green-700 mb-8 text-center">
        Galeri Peternak Muda
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
          >
            <button
              onClick={() => openLightbox(item)}
              aria-label={`Buka ${item.title}`}
              className="w-full"
            >
              <motion.img
                src={item.image}
                alt={item.title}
                loading="lazy"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = '/gallery/fallback.jpg';
                }}
                className="w-full h-48 object-cover rounded mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              />
            </button>
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-600 text-center">{item.description}</p>
          </div>
        ))}
      </div>

      {lightboxOpen && activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <div
            className="bg-white rounded max-w-3xl w-full p-4"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              aria-label="Tutup"
              className="float-right text-gray-600"
            >
              ✕
            </button>
            <motion.img
              src={activeItem.image}
              alt={activeItem.title}
              className="w-full h-auto object-contain mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <h3 className="font-semibold text-xl mb-2">{activeItem.title}</h3>
            <p className="text-gray-700">{activeItem.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}