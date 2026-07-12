"use client";

import React from "react";
import { IconQrcode } from "@tabler/icons-react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";
import { AhnaraButton } from "@/components/ahnara/AhnaraButton";
import { useDispatch } from "../layout";

export default function TransfersPage() {
  const {
    transfers,
    activeTransferId,
    setActiveTransferId,
    showBarcode,
    setShowBarcode
  } = useDispatch();

  return (
    <div className="flex flex-col gap-4 text-left">
      <div className="text-left">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-display">Inter-Facility Referrals</h2>
        <p className="text-slate-500 font-medium mt-1">
          Coordinate patient transfers and generate secure verification QR codes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Active Transfers List (5 Cols) */}
        <div className="md:col-span-5 flex flex-col">
          <AhnaraCard variant="flat" padding="none" className="bg-white border border-slate-100 p-5 flex flex-col gap-4 shadow-xs text-left h-full">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-lg text-slate-900 tracking-tight text-display">Active Transfers</h3>
            </div>

            <div className="flex flex-col gap-2.5">
              {transfers.map((tx) => (
                <div 
                  key={tx.id} 
                  onClick={() => {
                    setActiveTransferId(tx.id);
                    setShowBarcode(false);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${activeTransferId === tx.id ? "bg-slate-50 border-[#0089C1] shadow-xs" : "bg-white border-slate-200 hover:border-slate-300"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-[#0089C1]">{tx.id} • {tx.priority}</span>
                    <span className="text-[10px] font-bold text-slate-400">Step {tx.progress}/4</span>
                  </div>
                  <h4 className="text-xs font-black text-slate-800">Patient: {tx.patient}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 font-semibold">
                    {tx.origin} &rarr; {tx.destination}
                  </p>

                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-3">
                    <div 
                      className="bg-[#0089C1] h-full rounded-full transition-all" 
                      style={{ width: `${(tx.progress / 4) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </AhnaraCard>
        </div>

        {/* Handoff Verification (7 Cols) */}
        <div className="md:col-span-7 flex flex-col">
          <AhnaraCard variant="flat" padding="none" className="bg-white border border-slate-100 p-6 flex flex-col gap-6 shadow-xs text-center h-full">
            <h3 className="font-extrabold text-lg text-slate-900 tracking-tight text-display text-left border-b border-slate-100 pb-3">Handoff Verification</h3>

            <div className="flex flex-col items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-600">Active Transfer: {activeTransferId}</span>
              {showBarcode ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-36 h-36 bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-center shadow-md">
                    <IconQrcode className="w-32 h-32 text-slate-950" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0089C1] bg-sky-50 px-3 py-1 rounded-lg border border-sky-100">
                    {transfers.find(t => t.id === activeTransferId)?.handoffCode}
                  </span>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                    Paramedic scans this code at destination intake to instantly sync clinical logs to FHIR databases.
                  </p>
                </div>
              ) : (
                <AhnaraButton 
                  onClick={() => setShowBarcode(true)}
                  className="bg-[#1E293B] hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs"
                >
                  Generate Handoff Code
                </AhnaraButton>
              )}
            </div>
          </AhnaraCard>
        </div>
      </div>
    </div>
  );
}
