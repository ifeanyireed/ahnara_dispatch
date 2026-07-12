"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IconHeart,
  IconScale,
  IconActivity,
  IconPlus,
  IconCheck
} from "@tabler/icons-react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";
import { AhnaraButton } from "@/components/ahnara/AhnaraButton";
import { AhnaraModal } from "@/components/ahnara/AhnaraModal";
import { useDispatch } from "../layout";

export default function QueueDeskPage() {
  const {
    incidents,
    ambulances,
    setAmbulances,
    safetyChecklist,
    setSafetyChecklist,
    selectedSector,
    setSelectedSector
  } = useDispatch();

  // Telemetry Modal state
  const [isTelemetryModalOpen, setIsTelemetryModalOpen] = useState(false);
  const [oxyLevel, setOxyLevel] = useState("1800");
  const [fuelLiters, setFuelLiters] = useState("45");
  const [odometer, setOdometer] = useState("82192");
  const [vehicleId, setVehicleId] = useState("AMB-04");

  const handleChecklistToggle = (id: string) => {
    setSafetyChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleTelemetrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTelemetryModalOpen(false);
    setAmbulances(prev => prev.map(amb => amb.id === vehicleId ? {
      ...amb,
      telemetry: `O2: ${oxyLevel} psi • Fuel: ${fuelLiters}L • Odometer: ${odometer} km`
    } : amb));
  };

  const getTriageBadge = (t: string) => {
    if (t === "critical") return "bg-red-50 text-red-700 border-red-200";
    if (t === "urgent") return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-teal-50 text-teal-700 border-teal-200";
  };

  const sectors = ["Yaba", "Ebute Metta", "Surulere", "Ikeja", "Lekki"];
  const activeChecklistCount = safetyChecklist.filter(item => item.checked).length;
  const compliancePercent = Math.round((activeChecklistCount / safetyChecklist.length) * 100);

  return (
    <div className="flex flex-col gap-3">
      
      {/* Greeting row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="text-left">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-display">Hello, Adeola</h2>
          <p className="text-slate-500 font-medium mt-1">
            You are monitoring the regional emergency dispatch and transit network.
          </p>
        </div>

        {/* Quick Status Action Badges */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3.5 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-xs">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Live Triage Active
          </span>
          <span className="bg-[#E8F3CE] border border-[#CDE0A4] text-[#608216] px-3.5 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-xs">
            Active Duty
          </span>
        </div>
      </motion.div>

      {/* SECTOR TIMELINE TIMELINE EXPLORER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs flex flex-col gap-3"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-sans">Active Sectors Explorer</span>
          <span className="text-xs text-[#608216] font-bold">Selected: {selectedSector} Corridor</span>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none snap-x">
          {sectors.map((sec) => {
            const isActive = selectedSector === sec;
            return (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`snap-center flex-shrink-0 px-6 h-12 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isActive 
                    ? "bg-[#1E293B] text-white font-extrabold shadow-md scale-105"
                    : "bg-slate-50 border border-slate-200/50 text-slate-500 font-semibold"
                }`}
              >
                <span className="text-[9px] uppercase tracking-tighter opacity-60 leading-none">Sector</span>
                <span className="text-xs font-bold leading-none mt-1">{sec}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* VITALS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Card 1: Active Requests */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          <AhnaraCard variant="flat" padding="none" className="bg-white p-5 border border-slate-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider font-sans">Active Requests</span>
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-500 shadow-[0_2px_8px_rgba(239,68,68,0.1)]">
                <IconHeart className="w-4 h-4 fill-current animate-pulse" />
              </div>
            </div>
            
            <div className="h-16 w-full flex items-center mb-2">
              <svg className="w-full h-full" viewBox="0 0 160 50">
                <defs>
                  <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0"/>
                  </linearGradient>
                </defs>
                <path
                  d="M0,25 C10,25 15,10 20,10 C25,10 30,35 35,35 C40,35 45,5 50,5 C55,5 60,40 65,40 C70,40 75,20 80,20 C85,20 90,30 95,30 C100,30 105,15 110,15 C115,15 120,28 125,28 C130,28 135,25 140,25 C150,25 155,25 160,25"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M0,25 C10,25 15,10 20,10 C25,10 30,35 35,35 C40,35 45,5 50,5 C55,5 60,40 65,40 C70,40 75,20 80,20 C85,20 90,30 95,30 C100,30 105,15 110,15 C115,15 120,28 125,28 C130,28 135,25 140,25 C150,25 155,25 160,25 L160,50 L0,50 Z"
                  fill="url(#heartGradient)"
                />
              </svg>
            </div>
            
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-3xl font-extrabold text-slate-800 text-display">4</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Pending</span>
            </div>
          </AhnaraCard>
        </motion.div>

        {/* Card 2: Active Fleet */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.23 }}
        >
          <AhnaraCard variant="flat" padding="none" className="bg-white p-5 border border-slate-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider font-sans">Active Fleet</span>
              <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shadow-[0_2px_8px_rgba(20,184,166,0.1)]">
                <IconScale className="w-4 h-4" />
              </div>
            </div>

            <div className="h-16 w-full flex items-end justify-between px-2 gap-1 mb-2">
              {[45, 48, 50, 52, 53, 56, 59, 61, 65, 68].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                  className="flex-1 bg-[#70A4A2] rounded-full"
                />
              ))}
            </div>

            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-3xl font-extrabold text-slate-800 text-display">3</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Ambulances</span>
            </div>
          </AhnaraCard>
        </motion.div>

        {/* Card 3: O2 Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
        >
          <AhnaraCard variant="flat" padding="none" className="bg-white p-5 border border-slate-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider font-sans">O2 Compliance</span>
              <div className="w-9 h-9 rounded-full bg-[#F5F8EB] flex items-center justify-center text-[#9CC031] shadow-[0_2px_8px_rgba(156,192,49,0.1)]">
                <IconActivity className="w-4 h-4" />
              </div>
            </div>

            <div className="h-16 w-full flex flex-col justify-center gap-2 mb-2">
              <div className="w-full h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${compliancePercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-[#C5EC59] rounded-full"
                />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-1.5 mt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-800 text-display">{compliancePercent}%</span>
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                {activeChecklistCount}/{safetyChecklist.length} Checked
              </span>
            </div>
          </AhnaraCard>
        </motion.div>

        {/* Card 4: Log Telemetry */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.33 }}
        >
          <AhnaraCard
            variant="interactive"
            padding="none"
            onClick={() => setIsTelemetryModalOpen(true)}
            className="h-full bg-slate-50/50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-5 text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-all duration-300 cursor-pointer min-h-[148px]"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 mb-2">
              <IconPlus className="w-5 h-5 text-[#0089C1]" />
            </div>
            <span className="text-sm font-bold tracking-tight text-[#0089C1]">Log Telemetry</span>
            <span className="text-[10px] text-slate-400 font-semibold mt-0.5">O2, Fuel &amp; Odometer</span>
          </AhnaraCard>
        </motion.div>

      </div>

      {/* Bottom checklist & incident list */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        
        {/* Left: Safety Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="md:col-span-5 flex flex-col"
        >
          <AhnaraCard variant="flat" padding="none" className="w-full h-full bg-[#E8F3CE] border-none p-6 flex flex-col gap-4 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-[#C7DB9C] pb-3">
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-[#608216] font-black uppercase tracking-wider">Vehicle Safety Compliance</span>
                <h3 className="font-extrabold text-[#0D090C] text-lg tracking-tight text-display">Safety Checklist</h3>
              </div>
              <IconCheck className="w-5 h-5 text-[#608216]" />
            </div>

            <div className="flex flex-col gap-2 mt-1">
              {safetyChecklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleChecklistToggle(item.id)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    item.checked
                      ? "bg-white border-[#CDE0A4] text-[#608216] shadow-xs"
                      : "bg-[#E8F3CE]/45 border-[#C7DB9C]/40 hover:bg-white/20 text-[#608216]/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4.5 h-4.5 rounded-md flex items-center justify-center transition-all ${
                      item.checked
                        ? "bg-[#8BB436] text-white"
                        : "border border-[#C7DB9C] bg-white/50"
                    }`}>
                      {item.checked && <IconCheck className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-black leading-none">{item.name}</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider opacity-70">{item.time}</span>
                </button>
              ))}
            </div>
          </AhnaraCard>
        </motion.div>

        {/* Right: Incidents list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="md:col-span-7 flex flex-col"
        >
          <AhnaraCard variant="flat" padding="none" className="w-full h-full bg-white border border-slate-100 flex flex-col overflow-hidden shadow-xs">
            <div className="p-5 flex items-center gap-5 bg-[#E8F3CE]/30 border-b border-[#C7DB9C]/20">
              <div className="w-16 h-16 rounded-2xl bg-white border border-[#C7DB9C]/40 flex items-center justify-center text-4xl shadow-xs">
                🚨
              </div>
              <div className="text-left flex-1">
                <span className="text-[9px] font-black text-[#608216] uppercase tracking-wider">
                  Obstetric Alert: Sector 4
                </span>
                <h3 className="font-extrabold text-lg text-[#0D090C] text-display leading-snug mt-0.5">
                  Ambulance <span className="text-[#608216]">#04 Dispatched</span>
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-bold mt-1">
                  <span>Incident: INC-9201</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>Risk: Hemorrhage (36 weeks)</span>
                </div>
              </div>
            </div>

            <div className="p-5 flex-1 bg-white text-left flex flex-col justify-start gap-4">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Active Incidents Queue</span>
              
              <div className="flex flex-col gap-2">
                {incidents.map(inc => (
                  <div key={inc.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[#0089C1]">{inc.id}</span>
                        <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 border rounded-md ${getTriageBadge(inc.triage)}`}>
                          {inc.triage}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 mt-1">{inc.type} — {inc.risk}</h4>
                    </div>
                      <span className="text-[10px] font-bold text-slate-500">{inc.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </AhnaraCard>
        </motion.div>

      </div>

      {/* TELEMETRY LOG MODAL */}
      <AhnaraModal
        isOpen={isTelemetryModalOpen}
        onClose={() => setIsTelemetryModalOpen(false)}
        title="Log Vehicle Telemetry"
      >
        <form onSubmit={handleTelemetrySubmit} className="flex flex-col gap-4 p-4 text-left">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ambulance Unit</label>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full bg-[#F1F5F9]/50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm outline-none focus:bg-white focus:border-slate-300 font-semibold"
            >
              {ambulances.map(amb => (
                <option key={amb.id} value={amb.id}>{amb.id} ({amb.driver})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">O2 Pressure (psi)</label>
              <input
                type="number"
                required
                placeholder="e.g. 1800"
                value={oxyLevel}
                onChange={(e) => setOxyLevel(e.target.value)}
                className="w-full bg-[#F1F5F9]/50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm text-center outline-none focus:bg-white focus:border-slate-300 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fuel Liters (L)</label>
              <input
                type="number"
                required
                placeholder="e.g. 45"
                value={fuelLiters}
                onChange={(e) => setFuelLiters(e.target.value)}
                className="w-full bg-[#F1F5F9]/50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm text-center outline-none focus:bg-white focus:border-slate-300 font-semibold"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Odometer Reading (km)</label>
            <input
              type="number"
              required
              placeholder="e.g. 82192"
              value={odometer}
              onChange={(e) => setOdometer(e.target.value)}
              className="w-full bg-[#F1F5F9]/50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm outline-none focus:bg-white focus:border-slate-300 font-semibold"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <AhnaraButton
              variant="outline"
              type="button"
              onClick={() => setIsTelemetryModalOpen(false)}
              className="flex-1 rounded-xl"
            >
              Cancel
            </AhnaraButton>
            <AhnaraButton
              variant="primary"
              type="submit"
              className="flex-1 bg-[#0089C1] hover:bg-[#0089C1]/90 border-none text-white rounded-xl"
            >
              Submit Telemetry
            </AhnaraButton>
          </div>
        </form>
      </AhnaraModal>

    </div>
  );
}
