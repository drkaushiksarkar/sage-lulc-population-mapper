import { Suspense } from "react";
import { Dashboard } from "@/components/Dashboard";
import { QueryPanel } from "@/components/QueryPanel";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4">
        <h1 className="text-xl font-bold">Sage Lulc Population Mapper</h1>
        <p className="text-sm text-gray-400">
          Powered by SAGE Lake -- 1.78B observations, 268M embeddings, 33M KG triples
        </p>
      </header>
      <div className="grid grid-cols-12 gap-4 p-6">
        <div className="col-span-8">
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        </div>
        <div className="col-span-4">
          <QueryPanel />
        </div>
      </div>
    </main>
  );
}
