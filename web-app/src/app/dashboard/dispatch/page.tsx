"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  IconLayoutDashboard, 
  IconMapPin, 
  IconSteeringWheel, 
  IconActivity, 
  IconFileText, 
  IconCreditCard,
  IconAlertTriangle,
  IconTruck,
  IconCheck,
  IconRefresh,
  IconQrcode,
  IconDownload,
  IconCircleAlert,
  IconShieldCheck,
  IconGasStation,
  IconAlertCircle
} from "@tabler/icons-react";

export default function DispatchDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get("tab") || "queue";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(searchParams.get("tab") || "queue");
  }, [searchParams]);

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    router.push(`/dashboard/dispatch?tab=${tab}`);
  };

  // State for Queue Desk
  const [incidents, setIncidents] = useState([
    { id: "INC-9201", type: "Obstetric Crisis", risk: "Severe Hemorrhage", location: "Sector 4, Yaba", stage: "36 weeks", blood: "O-", triage: "critical", age: "28", status: "Ambulance #04 Dispatched" },
    { id: "INC-9202", type: "Pediatric Distress", risk: "Asthmatic Shock", location: "Ebute Metta East", stage: "Child (4yo)", blood: "A+", triage: "urgent", age: "4", status: "Ambulance #12 En Route" },
    { id: "INC-9203", type: "Geriatric Cardiac", risk: "Loss of consciousness", location: "Surulere Central", stage: "Elderly (78yo)", blood: "B-", triage: "critical", age: "78", status: "Ambulance #09 Heading to ER" },
    { id: "INC-9204", type: "Obstetric Transit", risk: "Active Labor", location: "Ikeja GRA", stage: "39 weeks", blood: "AB+", triage: "standard", age: "31", status: "Awaiting Dispatcher Assignment" }
  ]);

  const [ambulances, setAmbulances] = useState([
    { id: "AMB-04", driver: "Adeola Alao", telemetry: "O2: 1800 psi • GPS: 6.5244° N, 3.3792° E", status: "active", location: "Heading to INC-9201" },
    { id: "AMB-09", driver: "Emeka Obi", telemetry: "O2: 2000 psi • GPS: 6.4531° N, 3.4258° E", status: "active", location: "Transporting INC-9203 to ER" },
    { id: "AMB-12", driver: "Haruna Danjuma", telemetry: "O2: 1200 psi • GPS: 6.5821° N, 3.3211° E", status: "active", location: "Heading to INC-9202" },
    { id: "AMB-01", driver: "Bisi Akande", telemetry: "O2: 500 psi (Refill Warning) • GPS: Depot", status: "maintenance", location: "Depot Maintenance" }
  ]);

  // State for Transfers
  const [transfers, setTransfers] = useState([
    { id: "TX-401", patient: "Funmi Adebayo", origin: "Yaba Community Clinic", destination: "Lagos University Teaching Hospital (LUTH)", priority: "Urgent", progress: 2, handoffCode: "TX401-HANDOFF" },
    { id: "TX-402", patient: "Grace Umoh", origin: "Ebute Maternity Outpost", destination: "Island Maternity Hospital", priority: "Critical", progress: 1, handoffCode: "TX402-HANDOFF" }
  ]);
  const [activeTransferId, setActiveTransferId] = useState("TX-401");
  const [showBarcode, setShowBarcode] = useState(false);

  // State for Fleet Registry
  const [safetyChecklist, setSafetyChecklist] = useState({
    oxygenCylinder: true,
    neonatalResuscitationKit: true,
    cervicalCollars: true,
    traumaBandages: false,
    defibrillatorBattery: true
  });

  const [fuelLogs, setFuelLogs] = useState([
    { id: "FL-991", date: "2026-07-10", amb: "AMB-04", liters: "45L", cost: "₦38,250", odometer: "82,192 km" },
    { id: "FL-992", date: "2026-07-09", amb: "AMB-12", liters: "50L", cost: "₦42,500", odometer: "114,302 km" }
  ]);

  // State for Crew Intake
  const [drivers, setDrivers] = useState([
    { id: "DRV-101", name: "Adeola Alao", license: "CDL-Class-A (Valid)", bls: "Certified (Expires Nov 2026)", background: "Cleared", status: "Active" },
    { id: "DRV-102", name: "Emeka Obi", license: "CDL-Class-A (Valid)", bls: "Certified (Expires Feb 2027)", background: "Cleared", status: "Active" },
    { id: "DRV-103", name: "Haruna Danjuma", license: "CDL-Class-B (Valid)", bls: "Certified (Expires Aug 2026)", background: "Cleared", status: "Active" },
    { id: "DRV-104", name: "Chinedu Okafor", license: "CDL-Class-A (Expired)", bls: "Pending Refresh Exam", background: "Pending Verification", status: "Onboarding" }
  ]);

  // State for Billing Manager
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherMessage, setVoucherMessage] = useState("");
  const [billingDetails, setBillingDetails] = useState({
    tripId: "INC-9201",
    baseDistance: "14.2 km",
    amount: 18500,
    subsidy: 0,
    copay: 18500,
    status: "Pending Settlement"
  });

  const validateVoucher = () => {
    if (voucherCode === "8321") {
      setVoucherMessage("✓ Government Maternity Voucher #8321 Verified. 100% Subsidy Applied.");
      setBillingDetails(prev => ({
        ...prev,
        subsidy: prev.amount,
        copay: 0,
        status: "Settled via B2G Subsidy"
      }));
    } else if (voucherCode) {
      setVoucherMessage("✗ Invalid or Expired Voucher Code.");
    }
  };

  const getTriageBadge = (t: string) => {
    if (t === "critical") return "bg-red-50 text-red-700 border-red-200";
    if (t === "urgent") return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-teal-50 text-teal-700 border-teal-200";
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-800 font-sans flex flex-col">
      
      {/* SIDEBAR AND DASHBOARD GRID */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
              <img src="/logo.png" alt="Ahnara Logo" className="w-5 h-5 object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-slate-900 block">Ahnara Dispatch</span>
              <span className="text-[9px] font-bold text-[#0089C1] uppercase tracking-widest block -mt-1">Admin Portal</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5 flex-1">
            <button 
              onClick={() => switchTab("queue")} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left ${activeTab === "queue" ? "bg-[#0089C1] text-slate-800" : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"}`}
            >
              <IconLayoutDashboard className="w-4 h-4" /> Queue Desk
            </button>
            <button 
              onClick={() => switchTab("transfers")} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left ${activeTab === "transfers" ? "bg-[#0089C1] text-slate-800" : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"}`}
            >
              <IconMapPin className="w-4 h-4" /> Transfers
            </button>
            <button 
              onClick={() => switchTab("fleet")} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left ${activeTab === "fleet" ? "bg-[#0089C1] text-slate-800" : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"}`}
            >
              <IconActivity className="w-4 h-4" /> Fleet Registry
            </button>
            <button 
              onClick={() => switchTab("drivers")} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left ${activeTab === "drivers" ? "bg-[#0089C1] text-slate-800" : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"}`}
            >
              <IconSteeringWheel className="w-4 h-4" /> Driver Vetting
            </button>
            <button 
              onClick={() => switchTab("analytics")} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left ${activeTab === "analytics" ? "bg-[#0089C1] text-slate-800" : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"}`}
            >
              <IconFileText className="w-4 h-4" /> Analytics Board
            </button>
            <button 
              onClick={() => switchTab("billing")} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left ${activeTab === "billing" ? "bg-[#0089C1] text-slate-800" : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"}`}
            >
              <IconCreditCard className="w-4 h-4" /> Billing Manager
            </button>
          </nav>

          <div className="pt-6 border-t border-slate-200 text-[10px] text-slate-500 font-semibold leading-relaxed">
            Logged in as Dispatch Coordinator YB-08
          </div>
        </aside>

        {/* Dashboard Work Area */}
        <main className="flex-1 bg-[#F1F5F9] p-6 md:p-10 overflow-y-auto">
          
          {/* TAB 1: QUEUE DESK (DP.02) */}
          {activeTab === "queue" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-4 gap-4">
                <div>
                  <span className="text-[10px] font-black text-[#0089C1] uppercase tracking-widest block">DP · 02</span>
                  <h1 className="text-2xl font-black text-slate-800 tracking-tight text-display">Ambulance Dispatch &amp; Queue Desk</h1>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-slate-550">AI Severity Triage Engine Live</span>
                </div>
              </div>

              {/* Incidents & Vehicle Telemetry Splits */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Active Incident Queue (2 Cols) */}
                <div className="xl:col-span-2 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-black uppercase text-slate-550 tracking-wider">Active Incident Queue</h2>
                    <span className="text-xs bg-slate-800 text-slate-650 font-bold px-2 py-0.5 rounded-md">4 Requests Pending</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {incidents.map((inc) => (
                      <div key={inc.id} className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-350 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-450 border border-slate-200 flex-shrink-0">
                            <IconAlertTriangle className="w-5 h-5 text-amber-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-slate-550">{inc.id}</span>
                              <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 border rounded-lg ${getTriageBadge(inc.triage)}`}>
                                {inc.triage}
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-slate-800 mt-1">{inc.type} — {inc.risk}</h3>
                            <p className="text-xs text-slate-550 font-semibold mt-0.5">
                              Patient: F ({inc.age}yo) • Blood Group: {inc.blood} • Location: {inc.location}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs font-black text-[#0089C1] bg-sky-50/50 px-3 py-1 rounded-xl border border-sky-200">
                            {inc.status}
                          </span>
                          {inc.status === "Awaiting Dispatcher Assignment" && (
                            <button 
                              onClick={() => {
                                setIncidents(prev => prev.map(i => i.id === inc.id ? { ...i, status: "Ambulance #01 Dispatched" } : i));
                              }}
                              className="text-[10px] font-black bg-[#1E293B] hover:bg-slate-800 text-slate-800 shadow-sm uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all"
                            >
                              Dispatch AMB-01
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Telemetry updates (1 Col) */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-sm font-black uppercase text-slate-550 tracking-wider">Vehicle Telemetry registries</h2>

                  <div className="flex flex-col gap-3">
                    {ambulances.map((amb) => (
                      <div key={amb.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <IconTruck className="w-4 h-4 text-sky-400" />
                            <span className="text-sm font-bold text-slate-800">{amb.id}</span>
                          </div>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${amb.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                            {amb.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-550 font-semibold mb-1">Crew: {amb.driver}</div>
                        <div className="text-[10px] text-[#0089C1] font-mono bg-sky-50/50 p-2 rounded-lg border border-sky-100">
                          {amb.telemetry}
                        </div>
                        <div className="text-xs text-slate-500 font-bold mt-2">Status: {amb.location}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: TRANSFERS (DP.05) */}
          {activeTab === "transfers" && (
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-black text-[#0089C1] uppercase tracking-widest block">DP · 05</span>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight text-display">Inter-Facility Referral Coordinator</h1>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Active Transfers List */}
                <div className="xl:col-span-2 flex flex-col gap-4">
                  <h2 className="text-sm font-black uppercase text-slate-550 tracking-wider">Active Transfer Bookings</h2>
                  
                  <div className="flex flex-col gap-3">
                    {transfers.map((tx) => (
                      <div 
                        key={tx.id} 
                        onClick={() => {
                          setActiveTransferId(tx.id);
                          setShowBarcode(false);
                        }}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer text-left ${activeTransferId === tx.id ? "bg-white border-[#0089C1] shadow-md" : "bg-white/80 border-slate-200/80 hover:border-slate-350 shadow-sm"}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black text-sky-400">{tx.id} • Priority: {tx.priority}</span>
                          <span className="text-xs font-bold text-slate-550">Step {tx.progress} of 4</span>
                        </div>
                        <h3 className="text-base font-extrabold text-slate-800 mb-2">Patient: {tx.patient}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-550 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-3">
                          <div>
                            <span className="text-[9px] text-slate-500 uppercase block font-black">Origin Clinic</span>
                            {tx.origin}
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-500 uppercase block font-black">Receiving Facility</span>
                            {tx.destination}
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#0089C1] h-full rounded-full transition-all" 
                            style={{ width: `${(tx.progress / 4) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-1.5">
                          <span>Request Received</span>
                          <span>Ambulance Dispatched</span>
                          <span>Collected</span>
                          <span>Handoff Complete</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Handoff QR/Barcode generator */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm p-6 rounded-3xl flex flex-col gap-6 text-center">
                  <h2 className="text-sm font-black uppercase text-slate-550 tracking-wider text-left">Facility Handoff Verification</h2>

                  <div className="flex flex-col items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-550">Active Transfer: {activeTransferId}</span>
                    {showBarcode ? (
                      <div className="flex flex-col items-center gap-3">
                        {/* Mock QR code container */}
                        <div className="w-36 h-36 bg-white p-3 rounded-xl border border-slate-250 flex items-center justify-center shadow-md">
                          <IconQrcode className="w-32 h-32 text-slate-800" />
                        </div>
                        <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/5 px-3 py-1 rounded-lg border border-sky-500/10">
                          {transfers.find(t => t.id === activeTransferId)?.handoffCode}
                        </span>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                          Paramedic scans this code at destination intake to instantly write clinical diagnostics to FHIR database.
                        </p>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setShowBarcode(true)}
                        className="bg-[#1E293B] hover:bg-slate-800 text-slate-800 shadow-sm font-black text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all shadow-md"
                      >
                        Generate Handoff Code
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: FLEET REGISTRY (DP.06) */}
          {activeTab === "fleet" && (
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-black text-[#0089C1] uppercase tracking-widest block">DP · 06</span>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight text-display">Dispatch Vehicle Fleet Registry</h1>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Fleet Overview */}
                <div className="xl:col-span-2 flex flex-col gap-4">
                  <h2 className="text-sm font-black uppercase text-slate-550 tracking-wider">Ambulance Inventory Log</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ambulances.map((amb) => (
                      <div key={amb.id} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-black text-sky-400">{amb.id}</span>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${amb.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                            {amb.status}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-slate-800 mb-2">Driver: {amb.driver}</div>
                        <div className="text-xs text-slate-550 font-semibold mb-4">{amb.telemetry}</div>
                        
                        <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-200 pt-3">
                          <span>Refueled: 2026-07-10</span>
                          <span className="text-sky-400">92% Supply Rating</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Daily Equipment Safety Checklist */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col gap-6">
                  <h2 className="text-sm font-black uppercase text-slate-550 tracking-wider">Safety Checklist (Daily check)</h2>
                  <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                    Paramedics must verify these medical systems inside the cabin before checking out.
                  </p>

                  <div className="flex flex-col gap-3">
                    {Object.entries(safetyChecklist).map(([key, checked]) => (
                      <button 
                        key={key}
                        onClick={() => {
                          setSafetyChecklist(prev => ({
                            ...prev,
                            [key]: !checked
                          }));
                        }}
                        className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all text-left"
                      >
                        <span className="text-xs font-bold text-slate-650">
                          {key.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase())}
                        </span>
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${checked ? "bg-emerald-500 border-emerald-500 text-slate-800" : "border-slate-300"}`}>
                          {checked && <IconCheck className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: DRIVER VETTING (DP.07) */}
          {activeTab === "drivers" && (
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-black text-[#0089C1] uppercase tracking-widest block">DP · 07</span>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight text-display">Driver Network Intake &amp; Vetting</h1>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase text-slate-550 tracking-wider">Driver Credentials Profiles</h2>
                  <span className="text-xs text-[#0089C1] bg-sky-50/50 px-3 py-1 rounded-xl border border-sky-200 font-bold">
                    3 Verified • 1 Pending
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {drivers.map((drv) => (
                    <div key={drv.id} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-sky-400">{drv.id}</span>
                          <h3 className="text-base font-extrabold text-slate-800">{drv.name}</h3>
                          <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-md ${drv.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>
                            {drv.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-550 font-semibold mt-3">
                          <div>
                            <span className="text-[9px] text-slate-500 uppercase block font-black">Licensing Status</span>
                            {drv.license}
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-500 uppercase block font-black">BLS Certification</span>
                            {drv.bls}
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-500 uppercase block font-black">Security Background Check</span>
                            {drv.background}
                          </div>
                        </div>
                      </div>

                      {drv.status === "Onboarding" && (
                        <button 
                          onClick={() => {
                            setDrivers(prev => prev.map(d => d.id === drv.id ? { ...d, status: "Active", background: "Cleared", bls: "Certified (Expires Jul 2027)" } : d));
                          }}
                          className="bg-[#1E293B] hover:bg-slate-800 text-slate-800 shadow-sm font-black text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl transition-all shadow-md flex-shrink-0"
                        >
                          Approve Driver
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ANALYTICS BOARD (DP.08) */}
          {activeTab === "analytics" && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[10px] font-black text-[#0089C1] uppercase tracking-widest block">DP · 08</span>
                  <h1 className="text-2xl font-black text-slate-800 tracking-tight text-display">Response-Time Analytics Board</h1>
                </div>
                <button 
                  onClick={() => alert("Downloading formatted audit report...")}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-800 border border-slate-300 font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <IconDownload className="w-4 h-4" /> Export Report (PDF)
                </button>
              </div>

              {/* Analytical Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Average Pickup Delay</span>
                  <span className="text-3xl font-extrabold text-slate-800 mt-2 block">11m 42s</span>
                  <p className="text-[10px] text-emerald-400 font-semibold mt-1">✓ Under target threshold (15m)</p>
                </div>
                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Average Transit Duration</span>
                  <span className="text-3xl font-extrabold text-slate-800 mt-2 block">23m 15s</span>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1">Based on 142 dispatch cycles this week</p>
                </div>
                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">ER Handoff Delay</span>
                  <span className="text-3xl font-extrabold text-slate-800 mt-2 block">3m 08s</span>
                  <p className="text-[10px] text-emerald-400 font-semibold mt-1">✓ Instant verification code enabled</p>
                </div>
              </div>

              {/* Chart Mockup */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
                <h2 className="text-sm font-black uppercase text-slate-550 tracking-wider mb-6">Transit Duration Trends (Target vs. Actual)</h2>
                
                {/* Custom Styled HTML Chart Bars */}
                <div className="h-48 flex items-end gap-6 overflow-x-auto pb-4">
                  {[
                    { day: "Mon", target: 15, actual: 16.5 },
                    { day: "Tue", target: 15, actual: 14.2 },
                    { day: "Wed", target: 15, actual: 12.8 },
                    { day: "Thu", target: 15, actual: 15.0 },
                    { day: "Fri", target: 15, actual: 18.2 },
                    { day: "Sat", target: 15, actual: 11.9 },
                    { day: "Sun", target: 15, actual: 11.2 }
                  ].map((data, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end min-w-[50px]">
                      
                      {/* Bars Container */}
                      <div className="w-full flex items-end gap-1.5 h-full">
                        {/* Target Bar (Gray) */}
                        <div 
                          className="flex-1 bg-slate-200 rounded-t-md hover:bg-slate-300 transition-colors" 
                          style={{ height: `${(data.target / 25) * 100}%` }}
                          title={`Target: ${data.target} mins`}
                        />
                        {/* Actual Bar (Sky Blue) */}
                        <div 
                          className={`flex-1 rounded-t-md hover:opacity-85 transition-opacity ${data.actual > data.target ? "bg-amber-500" : "bg-sky-500"}`} 
                          style={{ height: `${(data.actual / 25) * 100}%` }}
                          title={`Actual: ${data.actual} mins`}
                        />
                      </div>

                      <span className="text-[10px] text-slate-500 font-bold">{data.day}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-6 mt-4 text-[10px] text-slate-550 font-bold border-t border-slate-850 pt-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-slate-200 rounded-sm" /> Target Threshold (15 min)
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-sky-500 rounded-sm" /> Transit Delay Met
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-amber-500 rounded-sm" /> Transit Delay Threshold Exceeded
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: BILLING MANAGER (DP.09) */}
          {activeTab === "billing" && (
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-black text-[#0089C1] uppercase tracking-widest block">DP · 09</span>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight text-display">Emergency Coverage Billing Manager</h1>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Active Invoices */}
                <div className="xl:col-span-2 flex flex-col gap-4">
                  <h2 className="text-sm font-black uppercase text-slate-550 tracking-wider">Active Invoices Breakdown</h2>
                  
                  <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                      <div>
                        <span className="text-xs font-black text-sky-400">{billingDetails.tripId}</span>
                        <h3 className="text-base font-bold text-slate-800 mt-1">Obstetric Emergency Transit Invoice</h3>
                      </div>
                      <span className="text-xs font-black text-amber-400 bg-amber-500/5 px-3 py-1 rounded-xl border border-amber-500/10">
                        {billingDetails.status}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3 font-semibold text-xs text-slate-650">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Base distance charge ({billingDetails.baseDistance})</span>
                        <span>₦{billingDetails.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-emerald-400">
                        <span>Government Maternity Subsidy Vouchers</span>
                        <span>-₦{billingDetails.subsidy.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-200 pt-3 text-sm font-black text-slate-800">
                        <span>Patient Co-pay Amount Due</span>
                        <span>₦{billingDetails.copay.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Voucher code validator */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col gap-4">
                  <h2 className="text-sm font-black uppercase text-slate-550 tracking-wider">Voucher Code Validator</h2>
                  <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                    Enter government maternal voucher codes or insurance validation IDs to apply subsidies.
                  </p>

                  <div className="flex flex-col gap-2 mt-2">
                    <input 
                      type="text" 
                      placeholder="e.g. 8321" 
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      className="w-full bg-slate-950/50 border border-slate-800/80 px-4 py-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                    <button 
                      onClick={validateVoucher}
                      className="bg-[#1E293B] hover:bg-slate-800 text-slate-800 shadow-sm font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-all"
                    >
                      Apply Subsidy Code
                    </button>
                    {voucherMessage && (
                      <p className={`text-[10px] font-bold mt-2 leading-relaxed ${voucherMessage.startsWith("✓") ? "text-emerald-400" : "text-red-400"}`}>
                        {voucherMessage}
                      </p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
