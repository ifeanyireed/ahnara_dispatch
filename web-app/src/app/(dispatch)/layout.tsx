"use client";

import React, { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconLayoutDashboard,
  IconMapPin,
  IconSteeringWheel,
  IconActivity,
  IconFileText,
  IconCreditCard,
  IconBell,
  IconCheck,
  IconCalendarEvent,
  IconQrcode
} from "@tabler/icons-react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";

// Context types
export interface Incident {
  id: string;
  type: string;
  risk: string;
  location: string;
  stage: string;
  blood: string;
  triage: string;
  age: string;
  status: string;
}

export interface Ambulance {
  id: string;
  driver: string;
  telemetry: string;
  status: string;
  location: string;
}

export interface Transfer {
  id: string;
  patient: string;
  origin: string;
  destination: string;
  priority: string;
  progress: number;
  handoffCode: string;
}

export interface Driver {
  id: string;
  name: string;
  license: string;
  bls: string;
  background: string;
  status: string;
}

export interface SafetyItem {
  id: string;
  name: string;
  checked: boolean;
  time: string;
}

export interface BillingDetails {
  tripId: string;
  baseDistance: string;
  amount: number;
  subsidy: number;
  copay: number;
  status: string;
}

interface DispatchContextType {
  incidents: Incident[];
  setIncidents: React.Dispatch<React.SetStateAction<Incident[]>>;
  ambulances: Ambulance[];
  setAmbulances: React.Dispatch<React.SetStateAction<Ambulance[]>>;
  transfers: Transfer[];
  setTransfers: React.Dispatch<React.SetStateAction<Transfer[]>>;
  drivers: Driver[];
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
  safetyChecklist: SafetyItem[];
  setSafetyChecklist: React.Dispatch<React.SetStateAction<SafetyItem[]>>;
  billingDetails: BillingDetails;
  setBillingDetails: React.Dispatch<React.SetStateAction<BillingDetails>>;
  activeTransferId: string;
  setActiveTransferId: (id: string) => void;
  showBarcode: boolean;
  setShowBarcode: (show: boolean) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
}

const DispatchContext = createContext<DispatchContextType | null>(null);

export function useDispatch() {
  const context = useContext(DispatchContext);
  if (!context) throw new Error("useDispatch must be used within a DispatchProvider");
  return context;
}

export default function DispatchLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Shared States
  const [incidents, setIncidents] = useState<Incident[]>([
    { id: "INC-9201", type: "Obstetric Crisis", risk: "Severe Hemorrhage", location: "Sector 4, Yaba", stage: "36 weeks", blood: "O-", triage: "critical", age: "28", status: "Ambulance #04 Dispatched" },
    { id: "INC-9202", type: "Pediatric Distress", risk: "Asthmatic Shock", location: "Ebute Metta East", stage: "Child (4yo)", blood: "A+", triage: "urgent", age: "4", status: "Ambulance #12 En Route" },
    { id: "INC-9203", type: "Geriatric Cardiac", risk: "Loss of consciousness", location: "Surulere Central", stage: "Elderly (78yo)", blood: "B-", triage: "critical", age: "78", status: "Ambulance #09 Heading to ER" },
    { id: "INC-9204", type: "Obstetric Transit", risk: "Active Labor", location: "Ikeja GRA", stage: "39 weeks", blood: "AB+", triage: "standard", age: "31", status: "Awaiting Dispatcher Assignment" }
  ]);

  const [ambulances, setAmbulances] = useState<Ambulance[]>([
    { id: "AMB-04", driver: "Adeola Alao", telemetry: "O2: 1800 psi • GPS: 6.5244° N, 3.3792° E", status: "active", location: "Heading to INC-9201" },
    { id: "AMB-09", driver: "Emeka Obi", telemetry: "O2: 2000 psi • GPS: 6.4531° N, 3.4258° E", status: "active", location: "Transporting INC-9203 to ER" },
    { id: "AMB-12", driver: "Haruna Danjuma", telemetry: "O2: 1200 psi • GPS: 6.5821° N, 3.3211° E", status: "active", location: "Heading to INC-9202" },
    { id: "AMB-01", driver: "Bisi Akande", telemetry: "O2: 500 psi (Refill Warning) • GPS: Depot", status: "maintenance", location: "Depot Maintenance" }
  ]);

  const [transfers, setTransfers] = useState<Transfer[]>([
    { id: "TX-401", patient: "Funmi Adebayo", origin: "Yaba Community Clinic", destination: "Lagos University Teaching Hospital (LUTH)", priority: "Urgent", progress: 2, handoffCode: "TX401-HANDOFF" },
    { id: "TX-402", patient: "Grace Umoh", origin: "Ebute Maternity Outpost", destination: "Island Maternity Hospital", priority: "Critical", progress: 1, handoffCode: "TX402-HANDOFF" }
  ]);

  const [drivers, setDrivers] = useState<Driver[]>([
    { id: "DRV-101", name: "Adeola Alao", license: "CDL-Class-A (Valid)", bls: "Certified (Expires Nov 2026)", background: "Cleared", status: "Active" },
    { id: "DRV-102", name: "Emeka Obi", license: "CDL-Class-A (Valid)", bls: "Certified (Expires Feb 2027)", background: "Cleared", status: "Active" },
    { id: "DRV-103", name: "Haruna Danjuma", license: "CDL-Class-B (Valid)", bls: "Certified (Expires Aug 2026)", background: "Cleared", status: "Active" },
    { id: "DRV-104", name: "Chinedu Okafor", license: "CDL-Class-A (Expired)", bls: "Pending Refresh Exam", background: "Pending Verification", status: "Onboarding" }
  ]);

  const [safetyChecklist, setSafetyChecklist] = useState<SafetyItem[]>([
    { id: "oxy", name: "Oxygen Cylinder Sync", checked: true, time: "Daily" },
    { id: "neonatal", name: "Neonatal Resuscitation Kit", checked: true, time: "Daily" },
    { id: "cervical", name: "Cervical Collars", checked: true, time: "Daily" },
    { id: "trauma", name: "Trauma Bandages & Kits", checked: false, time: "Weekly" },
    { id: "defib", name: "Defibrillator Battery", checked: true, time: "Daily" },
  ]);

  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    tripId: "INC-9201",
    baseDistance: "14.2 km",
    amount: 18500,
    subsidy: 0,
    copay: 18500,
    status: "Pending Settlement"
  });

  const [activeTransferId, setActiveTransferId] = useState("TX-401");
  const [showBarcode, setShowBarcode] = useState(false);
  const [selectedSector, setSelectedSector] = useState("Yaba");

  const menuItems = [
    { name: "Queue Desk", href: "/queue-desk", icon: IconLayoutDashboard },
    { name: "Transfers", href: "/transfers", icon: IconMapPin },
    { name: "Fleet Registry", href: "/fleet", icon: IconActivity },
    { name: "Driver Vetting", href: "/drivers", icon: IconSteeringWheel },
    { name: "Analytics", href: "/analytics", icon: IconFileText },
    { name: "Billing", href: "/billing", icon: IconCreditCard },
  ];

  return (
    <DispatchContext.Provider value={{
      incidents, setIncidents,
      ambulances, setAmbulances,
      transfers, setTransfers,
      drivers, setDrivers,
      safetyChecklist, setSafetyChecklist,
      billingDetails, setBillingDetails,
      activeTransferId, setActiveTransferId,
      showBarcode, setShowBarcode,
      selectedSector, setSelectedSector
    }}>
      <div className="min-h-screen bg-[#E8EFF4] text-[#0D090C] font-sans flex flex-col select-none animate-fadeIn">
        
        {/* TOP HEADER */}
        <header className="px-8 py-5 flex items-center justify-between gap-4 bg-transparent border-none">
          
          {/* Logo and Nav Menu Group */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D4F475] flex items-center justify-center border border-[#CDE0A4]">
              <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
            </div>

            {/* Navigation Tab Menu */}
            <nav className="flex items-center gap-1 bg-[#DDEEF3] p-1 rounded-2xl border border-slate-300/30">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 z-10 ${
                      isActive ? "text-white" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBackground"
                        className="absolute inset-0 bg-[#1E293B] rounded-xl -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon className="w-5 h-5" />
                    <span className="hidden lg:inline">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Notifications and Profile */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => alert("SOS Triggered to Central Hospital Spine. Ambu-GPS active.")}
              className="px-4 h-10 rounded-full bg-red-600 border border-red-500/20 text-white font-black text-xs uppercase tracking-widest shadow-md shadow-red-600/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              SOS
            </button>
            
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all relative bg-white shadow-xs">
              <IconBell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
            
            <div className="h-8 w-px bg-slate-200" />
            
            <div className="flex items-center gap-3">
              <img
                src="/character3.jpg"
                alt="Profile Avatar"
                className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-xs"
              />
              <div className="text-left hidden sm:block">
                <p className="font-bold text-sm text-slate-900 leading-none">Adeola Alao</p>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 block">
                  Shift 1 (05:00 - 13:00)
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN SCREEN WORKSPACE CONTAINER */}
        <div className="flex-1 px-8 pt-6 pb-6 flex flex-col">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3 text-left">
            
            {/* LEFT/CENTER PANELS (9 COLS) */}
            <main className="lg:col-span-9 flex flex-col gap-3">
              {children}
            </main>

            {/* RIGHT SIDEBAR (3 COLS) */}
            <aside className="lg:col-span-3 flex flex-col gap-3">
              <div className="hidden lg:block h-[68px]" />

              {/* Emergency Dispatch Duty Roster */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <AhnaraCard variant="flat" padding="none" className="bg-white border border-slate-100 p-5 flex flex-col gap-4 shadow-xs text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <IconCalendarEvent className="w-5 h-5 text-[#009EDA]" />
                      <h3 className="font-extrabold text-lg text-slate-900 tracking-tight text-display">Duty Roster</h3>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3 bg-slate-50/50 border border-slate-200/60 p-3.5 rounded-2xl">
                      <div className="w-10 h-10 rounded-xl bg-[#E8F3CE] border border-[#CDE0A4] flex flex-col items-center justify-center text-[#608216] font-black flex-shrink-0">
                        <span className="text-[9px] uppercase font-bold leading-none">AMB</span>
                        <span className="text-xs leading-none mt-0.5">04</span>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="text-[9px] text-[#009EDA] font-black uppercase tracking-wider block">Adeola Alao</span>
                        <h4 className="text-xs font-black text-slate-800 mt-0.5">Emergency Transit</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Assigned INC-9201 • Active</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-xl text-[10px] text-emerald-800 font-bold">
                      <IconCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Ambulance GPS tracking: ACTIVE</span>
                    </div>
                  </div>
                </AhnaraCard>
              </motion.div>

              {/* Central Spine Connection Status */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                <AhnaraCard variant="flat" padding="none" className="bg-white border border-slate-100 p-5 flex flex-col gap-4 shadow-xs text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <IconQrcode className="w-5 h-5 text-[#0089C1]" />
                      <h3 className="font-extrabold text-lg text-slate-900 tracking-tight text-display">Spine Link Status</h3>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>

                  <div className="flex flex-col gap-3 text-center">
                    <div className="font-mono font-black text-base text-slate-800 bg-slate-50 border border-slate-200/80 rounded-xl py-2 shadow-xs">
                      CLINICAL SPINE LINK
                    </div>
                    <p className="text-[10px] text-slate-500 font-semibold leading-relaxed text-left">
                      ✓ Connected to central clinical server core. Real-time patient telemetry (fetal tones, SpO2, vitals) syncs directly to the receiving hospital ER.
                    </p>
                  </div>
                </AhnaraCard>
              </motion.div>

            </aside>
          </div>
        </div>
      </div>
    </DispatchContext.Provider>
  );
}
