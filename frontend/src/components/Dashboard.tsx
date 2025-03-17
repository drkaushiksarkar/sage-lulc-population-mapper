"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface DomainSummary {
  domain: string;
  rows: number;
  sources: number;
  lastUpdated: string;
}

export function Dashboard() {
  const { data, error } = useSWR<DomainSummary[]>("/api/domains", fetcher, {
    refreshInterval: 30000,
  });

  if (error) return <div className="text-red-400">Failed to load data</div>;
  if (!data) return <div className="animate-pulse">Loading domains...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Data Domains</h2>
      <div className="grid grid-cols-3 gap-3">
        {data.map((d) => (
          <div key={d.domain} className="rounded-lg border border-gray-800 bg-gray-900 p-4">
            <div className="text-sm text-gray-400">{d.domain}</div>
            <div className="text-xl font-bold text-blue-400">
              {(d.rows / 1e6).toFixed(1)}M rows
            </div>
            <div className="text-xs text-gray-500">
              {d.sources} sources | Updated {d.lastUpdated}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
