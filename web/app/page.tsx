"use client";

import Image from "next/image";
import Resorts from "./data/resorts.json";
import { json } from "stream/consumers";
import { useState } from "react";
import { count } from "console";

export default function Home() {

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("all");

  return (
   <main className="flex min-h-screen bg-[#0A0F1A] text-[#E8EEF8]">

    <div className="flex flex-col mx-auto">
      <header>
        <div className="flex flex-col">
          <h1 className="font-display text-4xl font-bold p-3">Ski day-pass prices</h1>
          <p className="font-body p-3">adult daypass, high season. Grouped by country, cheapest first.</p>
        </div>
      </header>

      <section className="flex justify-start">
        <div className="flex p-3">
          <input
          className="bg-[#121A2B] border border-[#33425E] rounded-full px-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a resort"
          />
        </div>
        <div className="flex p-3 justify-evenly">
          <button onClick={() => setSelected('All')} className="searchButtons">All countries</button>
          {
            Object.keys(Resorts).map((country) => (
              <button key={country} onClick={() => setSelected(country)} className="searchButtons"> {country} </button>
            ))

          }
        </div>
      </section>
      
      {Object.entries(Resorts).map(([country, list]) => {
        const max = Math.max(...list.map((r) => r.day_price));

        if (selected !== "All" && selected !== country) return null;

        const visible = list
          .filter((r) => r.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
          .sort((a,b) => a.day_price - b.day_price);

        if (visible.length === 0) return null;
        

        return (
          <section key={country} className="p-3">
            <h2>{country}</h2>
            {visible.map((r) => (
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
    </div>
   </main>
  );
}
