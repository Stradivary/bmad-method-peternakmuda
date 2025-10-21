"use client";
import { motion } from "framer-motion";
import React from "react";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center py-16 bg-gradient-to-r from-green-100 to-blue-50 rounded-xl shadow-md"
    >
      <h1 className="text-5xl md:text-6xl font-extrabold text-green-700 mb-4 drop-shadow">
        Peternak Muda
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-6 max-w-2xl">
        Platform kolaborasi dan edukasi untuk generasi peternak masa depan.
      </p>
      <a
        href="/register"
        className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow"
      >
        Daftar Sekarang
      </a>
    </motion.section>
  );
}