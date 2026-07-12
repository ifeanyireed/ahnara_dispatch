"use client";

import React from "react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";
import { useDispatch } from "../layout";

export default function FleetPage() {
  const { ambulances } = useDispatch();

  return (
    <div className="flex flex-col gap-4 text-left">
      <div className="text-left">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-display">Fleet Registry</h2>
        <p className="text-slate-500 font-medium mt-1">
          Monitor the maintenance, telemetry logs, and active status of all transit vehicles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-12">
          <AhnaraCard variant="flat" padding="none" className="bg-white border border-slate-100 p-6 flex flex-col gap-4 shadow-xs text-left">
            <h3 className="font-extrabold text-lg text-slate-900 tracking-tight text-display border-b border-slate-100 pb-3">Fleet Inventory &amp; Logs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {ambulances.map((amb) => (
                <div key={amb.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-[#0089C1]">{amb.id}</span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${amb.status === "active" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                      {amb.status}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 mb-1">Driver: {amb.driver}</div>
                  <div className="text-[10px] text-slate-500 font-semibold mb-3">{amb.telemetry}</div>
                  
                  <div className="flex justify-between items-center text-[9px] text-slate-400 border-t border-slate-200 pt-2.5">
                    <span>Last Refuel: 2026-07-10</span>
                    <span className="text-[#0089C1] font-bold">92% Compliance</span>
                  </div>
                </div>
              ))}
            </div>
          </AhnaraCard>
        </div>
      </div>
    </div>
  );
}
