"use client";

import React from "react";
import { IconDownload } from "@tabler/icons-react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";
import { AhnaraButton } from "@/components/ahnara/AhnaraButton";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4 text-left animate-fadeIn">
      <div className="text-left">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-display">Transit Analytics</h2>
        <p className="text-slate-500 font-medium mt-1">
          Review response-times, ER handoff speeds, and regional transit performance.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {/* 3 Metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <AhnaraCard variant="flat" padding="none" className="bg-white border border-slate-100 p-5 shadow-xs">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Average Pickup Delay</span>
            <span className="text-2xl font-extrabold text-slate-800 mt-2 block">11m 42s</span>
            <p className="text-[9px] text-[#608216] font-bold mt-1">✓ Under target threshold (15m)</p>
          </AhnaraCard>
          <AhnaraCard variant="flat" padding="none" className="bg-white border border-slate-100 p-5 shadow-xs">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Average Transit Duration</span>
            <span className="text-2xl font-extrabold text-slate-800 mt-2 block">23m 15s</span>
            <p className="text-[9px] text-slate-500 font-semibold mt-1">Based on 142 dispatch cycles this week</p>
          </AhnaraCard>
          <AhnaraCard variant="flat" padding="none" className="bg-white border border-slate-100 p-5 shadow-xs">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">ER Handoff Delay</span>
            <span className="text-2xl font-extrabold text-slate-800 mt-2 block">3m 08s</span>
            <p className="text-[9px] text-[#608216] font-bold mt-1">✓ Instant verification code active</p>
          </AhnaraCard>
        </div>

        {/* Custom charts */}
        <AhnaraCard variant="flat" padding="none" className="bg-white border border-slate-100 p-6 shadow-xs text-left">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
            <h3 className="font-extrabold text-lg text-slate-900 tracking-tight text-display">Transit Duration Trends</h3>
            <AhnaraButton 
              onClick={() => alert("Downloading PDF report...")}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5"
            >
              <IconDownload className="w-3.5 h-3.5" /> Export PDF
            </AhnaraButton>
          </div>

          <div className="h-44 flex items-end gap-5 justify-between px-2 pb-2">
            {[
              { day: "Mon", target: 15, actual: 16.5 },
              { day: "Tue", target: 15, actual: 14.2 },
              { day: "Wed", target: 15, actual: 12.8 },
              { day: "Thu", target: 15, actual: 15.0 },
              { day: "Fri", target: 15, actual: 18.2 },
              { day: "Sat", target: 15, actual: 11.9 },
              { day: "Sun", target: 15, actual: 11.2 }
            ].map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end min-w-[30px]">
                <div className="w-full flex items-end gap-1 h-full">
                  <div 
                    className="flex-1 bg-slate-200 rounded-t-md hover:bg-slate-350 transition-colors" 
                    style={{ height: `${(data.target / 25) * 100}%` }}
                  />
                  <div 
                    className={`flex-1 rounded-t-md hover:opacity-85 transition-opacity ${data.actual > data.target ? "bg-[#FF904C]" : "bg-[#0089C1]"}`} 
                    style={{ height: `${(data.actual / 25) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-bold">{data.day}</span>
              </div>
            ))}
          </div>
        </AhnaraCard>
      </div>
    </div>
  );
}
