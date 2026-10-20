"use client";

import Image from "next/image";
import Resorts from "./data/resorts.json";
import { json } from "stream/consumers";
import { useState } from "react";

export default function Home() {

  const [search, setSearch] = useState("");

  return (
   <main className="min-h-screen bg-[#0A0F1A] text-[#E8EEF8] p-6">

    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search a resort"
    />
    
    {Object.entries(Resorts).map(([country, list]) => {
      const max = Math.max(...list.map((r) => r.day_price));

      const visible = list
        .filter((r) => r.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        .sort((a,b) => a.day_price - b.day_price);

      if (visible.length === 0) return null;

      return (
        <section key={country}>
          <h2>{country}</h2>
          {[...list]
            .filter((r) => r.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            .sort((a, b) => a.day_price - b.day_price)
            .map((r) => (
              <div key={r.name} className="grid grid-cols-4 gap-6 py-3 border-b border-[#1E2A42]">
                <span>{r.name}</span>
                  {
                    <div className="h-2.5 rounded bg-[#1E2A42]">
                      <div
                        className="h-full rounded bg-[#5CE1E6]"
                        style={{ width: `${(r.day_price / max) * 100}%` }}
                        />
                    </div>
                  }
                <span>{r.day_price} {r.currency}</span>
              </div>
            ))}
        </section>
      );
    })}
   </main>
  );
}
