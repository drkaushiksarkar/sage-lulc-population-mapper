"use client";
import { useState } from "react";

export function QueryPanel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
      <h2 className="mb-3 text-lg font-semibold">Query SAGE Lake</h2>
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="Search 40K+ indicators..."
          className="flex-1 rounded bg-gray-800 px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 outline-none"
        />
        <button
          onClick={search}
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>
      <div className="mt-4 max-h-96 overflow-y-auto space-y-2">
        {results.map((r, i) => (
          <div key={i} className="rounded bg-gray-800 p-3 text-sm">
            <div className="font-mono text-blue-300">{r.indicator_code}</div>
            <div className="text-gray-300">{r.indicator_name}</div>
            <div className="text-xs text-gray-500">{r.source_org} | {r.row_count?.toLocaleString()} rows</div>
          </div>
        ))}
      </div>
    </div>
  );
}
