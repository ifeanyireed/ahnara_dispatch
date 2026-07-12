"use client";

import React from "react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";
import { AhnaraButton } from "@/components/ahnara/AhnaraButton";
import { useDispatch } from "../layout";

export default function DriversPage() {
  const { drivers, setDrivers } = useDispatch();

  return (
    <div className="flex flex-col gap-4 text-left">
      <div className="text-left">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-display">Crew Registry &amp; Vetting</h2>
        <p className="text-slate-500 font-medium mt-1">
          Review credentials, background checks, and active service statuses of all emergency transit drivers.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <AhnaraCard variant="flat" padding="none" className="bg-white border border-slate-100 p-6 flex flex-col gap-4 shadow-xs text-left">
          <h3 className="font-extrabold text-lg text-slate-900 tracking-tight text-display border-b border-slate-100 pb-3">Crew Credentials Registry</h3>
          
          <div className="flex flex-col gap-2 mt-2">
            {drivers.map((drv) => (
              <div key={drv.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-[#0089C1]">{drv.id}</span>
                    <h4 className="text-xs font-extrabold text-slate-800">{drv.name}</h4>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${drv.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                      {drv.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] text-slate-500 mt-2.5 font-semibold">
                    <div>License: {drv.license}</div>
                    <div>BLS training: {drv.bls}</div>
                    <div>Background: {drv.background}</div>
                  </div>
                </div>

                {drv.status === "Onboarding" && (
                  <AhnaraButton 
                    onClick={() => {
                      setDrivers(prev => prev.map(d => d.id === drv.id ? { ...d, status: "Active", background: "Cleared", bls: "Certified (Expires Jul 2027)" } : d));
                    }}
                    className="bg-[#1E293B] hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl"
                  >
                    Approve Driver
                  </AhnaraButton>
                )}
              </div>
            ))}
          </div>
        </AhnaraCard>
      </div>
    </div>
  );
}
