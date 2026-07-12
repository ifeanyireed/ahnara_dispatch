"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IconLayoutDashboard, 
  IconMapPin, 
  IconSteeringWheel, 
  IconActivity, 
  IconFileText, 
  IconCreditCard,
  IconArrowRight,
  IconAlertOctagon,
  IconDeviceMobile,
  IconScreenShare
} from "@tabler/icons-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#E8EFF4] text-slate-800 font-sans flex flex-col overflow-x-hidden">
      
      {/* NAVBAR */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-50">
        {/* Logo and Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D4F475] flex items-center justify-center border border-[#CDE0A4]">
            <img src="/logo.png" alt="Ahnara Logo" className="w-7 h-7 object-contain" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 text-display block">Ahnara Dispatch</span>
            <span className="text-[9px] font-bold text-[#0089C1] uppercase tracking-widest block -mt-1">Med-Suite Transit</span>
          </div>
        </div>

        {/* Mid Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#admin-portal" className="hover:text-slate-950 transition-colors">Admin Web Portal</a>
          <a href="#driver-mobile" className="hover:text-slate-950 transition-colors">Driver Mobile App</a>
          <a href="#architecture" className="hover:text-slate-950 transition-colors">Logistics Spine</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Link href="/queue-desk" id="nav-launch-hub-btn">
            <button className="bg-[#1E293B] text-white hover:bg-slate-800 transition-all font-bold px-5 py-2.5 rounded-full text-sm shadow-sm">
              Launch Dispatch Hub
            </button>
          </Link>
        </div>
      </header>

      {/* HERO CONTAINER */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 mb-6">
        
        {/* Large Rounded Hero Card */}
        <div className="w-full bg-[#E9F2F5] rounded-[48px] pt-12 pb-12 px-6 md:px-12 flex flex-col items-center text-center relative overflow-hidden border border-slate-200/20">
          
          {/* Floating 3D Shapes */}
          {/* Left Shape (Lime Green Cylinder) */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[-4%] top-[25%] w-64 h-64 hidden xl:block pointer-events-none z-10"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
              <path d="M 40,80 L 40,110 A 60,30 0 0,0 160,110 L 160,80 Z" fill="#B5D95C" />
              <ellipse cx="100" cy="80" rx="60" ry="30" fill="#D4F475" />
            </svg>
          </motion.div>

          {/* Right Shape (Teal Cylinder) */}
          <motion.div
            animate={{ y: [0, 12, 0], rotate: [0, -4, 0] }}
            transition={{ duration: 6, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[-4%] top-[22%] w-64 h-64 hidden xl:block pointer-events-none z-10"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
              <path d="M 40,90 L 40,120 A 60,30 0 0,0 160,120 L 160,90 Z" fill="#3D5C5B" />
              <ellipse cx="100" cy="90" rx="60" ry="30" fill="#5F8D8C" />
            </svg>
          </motion.div>

          {/* Version Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-[10px] font-bold text-slate-500 shadow-sm border border-slate-100 uppercase tracking-wider mb-6 relative z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0089C1] animate-pulse"></span>
            Workspace DP.01 - DP.09
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-normal text-slate-900 tracking-tight text-display mb-6 leading-[1.1] max-w-4xl text-center relative z-20">
            Emergency Dispatch Logistics. <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0089C1] to-[#0D9488]">
              Every Millisecond Accounted.
            </span>
          </h1>

          {/* Description */}
          <p className="text-slate-650 font-semibold text-base md:text-lg mb-8 max-w-2xl text-center leading-relaxed relative z-20">
            Linking emergency drivers, ambulances, and clinical dispatch centers. Coordinate rapid patient transit during obstetric, pediatric, and geriatric crises using the integrated Ahnara logistics engine.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 relative z-20">
            <Link href="/queue-desk" id="hero-launch-btn">
              <button className="bg-[#1E293B] text-white hover:bg-slate-800 transition-all font-bold px-8 py-3.5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-2 group">
                Access Admin Portal <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <a href="#driver-mobile">
              <button className="bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80 transition-all font-bold px-8 py-3.5 rounded-full shadow-sm whitespace-nowrap flex items-center gap-2">
                <IconDeviceMobile className="w-4 h-4" /> View Driver App Specs
              </button>
            </a>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full max-w-4xl border-t border-slate-300/40 pt-10 mt-4 text-left relative z-20">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Transit Target</span>
              <span className="text-2xl font-extrabold text-slate-800 mt-1 block">&lt; 15 mins</span>
            </div>
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Triage Engine</span>
              <span className="text-2xl font-extrabold text-[#0D9488] mt-1 block">AI Severity Triage</span>
            </div>
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Fleet Telemetry</span>
              <span className="text-2xl font-extrabold text-slate-800 mt-1 block">GPS &amp; O2 Sync</span>
            </div>
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Billing Spine</span>
              <span className="text-2xl font-extrabold text-[#FF904C] mt-1 block">B2G &amp; Insurance</span>
            </div>
          </div>

        </div>

        {/* SECTION 1: THE ADMIN WEB APP */}
        <section id="admin-portal" className="py-16 border-t border-slate-350/40">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <span className="bg-[#E8F3CE] border border-[#CDE0A4] text-[#608216] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-4">
              Admin Web Suite
            </span>
            <h2 className="text-3xl md:text-5xl font-normal text-slate-900 tracking-tight text-display mb-4 leading-tight">
              Six Administrative Workspaces
            </h2>
            <p className="text-slate-500 font-semibold text-base max-w-xl leading-relaxed">
              Designed for hospital coordinators and emergency operators to allocate assets, monitor active queues, vet crew members, and settle coverage claims.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* DP.02 */}
            <div className="p-6 rounded-3xl bg-[#E8F6FA] border border-sky-200/30 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-[#0089C1] mb-4 group-hover:scale-105 transition-transform shadow-xs">
                  <IconLayoutDashboard className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-black text-[#0089C1] uppercase tracking-widest">DP · 02</span>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight mt-1 mb-2">Ambulance Dispatch &amp; Queue Desk</h3>
                <p className="text-xs text-slate-650 leading-relaxed font-medium">
                  Monitor incoming SOS triggers prioritized by AI severity models. Logs telemetry and dispatch indicators to Insights registries.
                </p>
              </div>
              <div className="border-t border-slate-200/60 pt-4 mt-6 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Queue Table UI</span>
                <Link href="/queue-desk" className="text-xs font-black text-[#0089C1] flex items-center gap-1 group-hover:underline">
                  Launch Desk &rarr;
                </Link>
              </div>
            </div>

            {/* DP.05 */}
            <div className="p-6 rounded-3xl bg-[#E8F6FA] border border-sky-200/30 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-[#0089C1] mb-4 group-hover:scale-105 transition-transform shadow-xs">
                  <IconMapPin className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-black text-[#0089C1] uppercase tracking-widest">DP · 05</span>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight mt-1 mb-2">Inter-Facility Referral Coordinator</h3>
                <p className="text-xs text-slate-650 leading-relaxed font-medium">
                  Coordinate transfers, request emergency ambulances for hospital moves, track handoff logs, and scan secure intake barcodes.
                </p>
              </div>
              <div className="border-t border-slate-200/60 pt-4 mt-6 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Origin/Destination Maps</span>
                <Link href="/transfers" className="text-xs font-black text-[#0089C1] flex items-center gap-1 group-hover:underline">
                  Launch Desk &rarr;
                </Link>
              </div>
            </div>

            {/* DP.06 */}
            <div className="p-6 rounded-3xl bg-[#E8F6FA] border border-sky-200/30 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-[#0089C1] mb-4 group-hover:scale-105 transition-transform shadow-xs">
                  <IconActivity className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-black text-[#0089C1] uppercase tracking-widest">DP · 06</span>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight mt-1 mb-2">Dispatch Vehicle Fleet Registry</h3>
                <p className="text-xs text-slate-650 leading-relaxed font-medium">
                  Track ambulance status updates, oxygen level telemetry (psi), fuel transaction databases, and safety equipment checklogs.
                </p>
              </div>
              <div className="border-t border-slate-200/60 pt-4 mt-6 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fleet Registry UI</span>
                <Link href="/fleet" className="text-xs font-black text-[#0089C1] flex items-center gap-1 group-hover:underline">
                  Launch Registry &rarr;
                </Link>
              </div>
            </div>

            {/* DP.07 */}
            <div className="p-6 rounded-3xl bg-[#E8F6FA] border border-sky-200/30 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-[#0089C1] mb-4 group-hover:scale-105 transition-transform shadow-xs">
                  <IconSteeringWheel className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-black text-[#0089C1] uppercase tracking-widest">DP · 07</span>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight mt-1 mb-2">Driver Network Intake &amp; Vetting</h3>
                <p className="text-xs text-slate-650 leading-relaxed font-medium">
                  Onboard regional CDL drivers. Review commercial licensing metrics, basic life support (BLS) training logs, and background check milestones.
                </p>
              </div>
              <div className="border-t border-slate-200/60 pt-4 mt-6 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vetting Checklists</span>
                <Link href="/drivers" className="text-xs font-black text-[#0089C1] flex items-center gap-1 group-hover:underline">
                  Launch Portal &rarr;
                </Link>
              </div>
            </div>

            {/* DP.08 */}
            <div className="p-6 rounded-3xl bg-[#E8F6FA] border border-sky-200/30 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-[#0089C1] mb-4 group-hover:scale-105 transition-transform shadow-xs">
                  <IconFileText className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-black text-[#0089C1] uppercase tracking-widest">DP · 08</span>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight mt-1 mb-2">Response-Time Analytics Board</h3>
                <p className="text-xs text-slate-650 leading-relaxed font-medium">
                  Monitor average transit metrics, compare regional pickup duration trends, and export structured PDF audits for MoH observatories.
                </p>
              </div>
              <div className="border-t border-slate-200/60 pt-4 mt-6 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Audit Exporter</span>
                <Link href="/analytics" className="text-xs font-black text-[#0089C1] flex items-center gap-1 group-hover:underline">
                  Launch Analytics &rarr;
                </Link>
              </div>
            </div>

            {/* DP.09 */}
            <div className="p-6 rounded-3xl bg-[#E8F6FA] border border-sky-200/30 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-[#0089C1] mb-4 group-hover:scale-105 transition-transform shadow-xs">
                  <IconCreditCard className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-black text-[#0089C1] uppercase tracking-widest">DP · 09</span>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight mt-1 mb-2">Coverage Billing Manager</h3>
                <p className="text-xs text-slate-650 leading-relaxed font-medium">
                  Process distance-based trip invoices, B2G maternal voucher codes, insurance claims, and government healthcare subsidy allocations.
                </p>
              </div>
              <div className="border-t border-slate-200/60 pt-4 mt-6 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Claim Compiler</span>
                <Link href="/billing" className="text-xs font-black text-[#0089C1] flex items-center gap-1 group-hover:underline">
                  Launch Manager &rarr;
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: THE DRIVER MOBILE APP */}
        <section id="driver-mobile" className="py-16 border-t border-slate-300/40 bg-white/40 rounded-[32px] px-6 my-10 border border-slate-200/80">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
            <span className="bg-[#FFF4ED] border border-[#FF904C]/30 text-[#FF904C] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-4">
              Driver's Mobile App
            </span>
            <h2 className="text-3xl md:text-5xl font-normal text-slate-900 tracking-tight text-display mb-4 leading-tight">
              Built for High-Stress Cabin Navigation
            </h2>
            <p className="text-slate-500 font-semibold text-base max-w-xl leading-relaxed">
              Designed with large tactile trigger touchpoints and clean typography to allow ambulance crew drivers to update clinical statuses with zero distraction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* DP.01 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div>
                <span className="text-[9px] font-black text-[#FF904C] uppercase tracking-widest block mb-2">DP · 01</span>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Emergency SOS Trigger</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  One-tap distress button requiring 2-second hold to avoid accidental alerts. Pre-compiles vital risk profiles (e.g. O+ blood group, pregnancy stage) and streams location coordinates.
                </p>
              </div>
              <div className="bg-[#FFF4ED] text-[#FF904C] border border-[#FF904C]/10 rounded-xl p-3 text-[10px] font-semibold mt-4">
                Mobile Spec: Delayed-trigger gesture logic to protect patients.
              </div>
            </div>

            {/* DP.03 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div>
                <span className="text-[9px] font-black text-[#FF904C] uppercase tracking-widest block mb-2">DP · 03</span>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Driver Navigation Map</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Real-time routing map with road barrier safety parameters. Highlights patient pickup conditions, clinical risk logs, and includes a one-click ER pre-alert trigger.
                </p>
              </div>
              <div className="bg-[#FFF4ED] text-[#FF904C] border border-[#FF904C]/10 rounded-xl p-3 text-[10px] font-semibold mt-4">
                Mobile Spec: Fully hardware-accelerated GPS mapping system.
              </div>
            </div>

            {/* DP.04 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div>
                <span className="text-[9px] font-black text-[#FF904C] uppercase tracking-widest block mb-2">DP · 04</span>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Patient Vital Transceiver</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Paramedic vital check entry board. Synchronizes heart rate, SpO2, and fetal heart tone telemetry directly to the ER department before the wheels hit the emergency bay.
                </p>
              </div>
              <div className="bg-[#FFF4ED] text-[#FF904C] border border-[#FF904C]/10 rounded-xl p-3 text-[10px] font-semibold mt-4">
                Mobile Spec: Instant Bluetooth telemetry interface connection.
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#E8EFF4] text-[#0D090C]/60 py-16 border-t border-slate-300/40 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#D4F475] flex items-center justify-center border border-[#CDE0A4]">
                <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight text-display">Ahnara Dispatch</span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm font-semibold">
              Linking emergency drivers, ambulances, and clinical dispatch centers. Coordinate rapid patient transit during obstetric, pediatric, and geriatric crises using the integrated Ahnara logistics engine.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Product</h4>
            <a href="#" className="text-xs font-semibold hover:text-[#0089C1] transition-colors">Queue Desk</a>
            <a href="#" className="text-xs font-semibold hover:text-[#0089C1] transition-colors">Transfers</a>
            <a href="#" className="text-xs font-semibold hover:text-[#0089C1] transition-colors">Fleet Registry</a>
            <a href="#" className="text-xs font-semibold hover:text-[#0089C1] transition-colors">Driver Vetting</a>
          </div>

          {/* Clinical Standards Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Clinical Standards</h4>
            <a href="#" className="text-xs font-semibold hover:text-[#0089C1] transition-colors">Emergency Protocol Alignment</a>
            <a href="#" className="text-xs font-semibold hover:text-[#0089C1] transition-colors">Referral Transportation Model</a>
            <a href="#" className="text-xs font-semibold hover:text-[#0089C1] transition-colors">BLS Certification Standards</a>
          </div>

          {/* Legal / Contact Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Connect &amp; Support</h4>
            <a href="#" className="text-xs font-semibold hover:text-[#0089C1] transition-colors">Support Center</a>
            <a href="#" className="text-xs font-semibold hover:text-[#0089C1] transition-colors">Logistics Advisory Panel</a>
            <a href="#" className="text-xs font-semibold hover:text-[#0089C1] transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs font-semibold hover:text-[#0089C1] transition-colors">Contact Support</a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-300/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>&copy; {new Date().getFullYear()} Ahnara Health, Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Practices</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Clinical Notice</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
