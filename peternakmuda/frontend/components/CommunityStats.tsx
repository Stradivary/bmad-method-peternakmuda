import React from "react";

const stats = [
  { label: "Anggota", value: 1200 },
  { label: "Proyek", value: 35 },
  { label: "Mitra", value: 12 },
];

export default function CommunityStats() {
  return (
    <section className="flex flex-wrap justify-center gap-8 py-8 bg-blue-50">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center bg-white shadow rounded-lg px-8 py-6"
        >
          <span className="text-3xl font-bold text-blue-700">{stat.value}</span>
          <span className="text-lg text-gray-600">{stat.label}</span>
        </div>
      ))}
    </section>
  );
}