import Image from "next/image";
import Resorts from "./data/resorts.json";
import { json } from "stream/consumers";

export default function Home() {
    console.log(Object.entries);
  return (
   <main className="min-h-screen bg-[#0A0F1A] text-[#E8EEF8] p-6">
    {Object.entries(Resorts).map(([country, list])=> (
      <section key={country}>
        <h2>{country}</h2>
        
        {
          [...list]
          .sort((a, b) => a.day_price - b.day_price)
          .map((r) => (
            <p key={r.name}>{r.name}: {r.day_price} {r.currency}</p>
          ))
        }
      </section>
    ))}
   </main>
  );
}
