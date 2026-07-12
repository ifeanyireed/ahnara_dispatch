"use client";

import React, { useState } from "react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";
import { AhnaraButton } from "@/components/ahnara/AhnaraButton";
import { useDispatch } from "../layout";

export default function BillingPage() {
  const { billingDetails, setBillingDetails } = useDispatch();
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherMessage, setVoucherMessage] = useState("");

  const validateVoucher = () => {
    if (voucherCode === "8321") {
      setVoucherMessage("✓ Government Maternity Voucher #8321 Verified. 100% Subsidy Applied.");
      setBillingDetails({
        ...billingDetails,
        subsidy: billingDetails.amount,
        copay: 0,
        status: "Settled via B2G Subsidy"
      });
    } else if (voucherCode) {
      setVoucherMessage("✗ Invalid or Expired Voucher Code.");
    }
  };

  return (
    <div className="flex flex-col gap-4 text-left animate-fadeIn">
      <div className="text-left">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-display">Coverage Billing</h2>
        <p className="text-slate-500 font-medium mt-1">
          Review insurance claims, maternity vouchers, and patient co-pay logs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Invoice Breakdown (5 Cols) */}
        <div className="md:col-span-5 flex flex-col">
          <AhnaraCard variant="flat" padding="none" className="bg-white border border-slate-100 p-5 flex flex-col gap-4 shadow-xs text-left h-full">
            <h3 className="font-extrabold text-lg text-slate-900 tracking-tight text-display border-b border-slate-100 pb-3">Active Invoices</h3>
            
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-2.5">
              <span className="text-[10px] font-black text-[#0089C1]">{billingDetails.tripId}</span>
              <h4 className="text-xs font-black text-slate-800">Obstetric Emergency Invoice</h4>
              <span className="text-[9px] font-black uppercase text-amber-600 bg-amber-50 border border-amber-200 rounded-md py-0.5 px-2 w-max">
                {billingDetails.status}
              </span>
              
              <div className="h-px bg-slate-200 my-1" />

              <div className="flex flex-col gap-2 text-[10px] text-slate-600 font-bold font-sans">
                <div className="flex justify-between">
                  <span>Base Distance ({billingDetails.baseDistance})</span>
                  <span>₦{billingDetails.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Government Vouchers</span>
                  <span>-₦{billingDetails.subsidy.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-black text-slate-800 pt-2 border-t border-slate-200">
                  <span>Patient Co-pay</span>
                  <span>₦{billingDetails.copay.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </AhnaraCard>
        </div>

        {/* Voucher validator (7 Cols) */}
        <div className="md:col-span-7 flex flex-col">
          <AhnaraCard variant="flat" padding="none" className="bg-white border border-slate-100 p-6 flex flex-col gap-4 shadow-xs text-left h-full">
            <h3 className="font-extrabold text-lg text-slate-900 tracking-tight text-display border-b border-slate-100 pb-3">Maternity Vouchers</h3>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Enter government maternity subsidy code or insurance validation ID to settle outstanding patient balances.
            </p>

            <div className="flex flex-col gap-2 mt-2">
              <input 
                type="text" 
                placeholder="e.g. 8321" 
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#0089C1] font-semibold"
              />
              <AhnaraButton 
                onClick={validateVoucher}
                className="bg-[#1E293B] hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl"
              >
                Apply Subsidy Voucher
              </AhnaraButton>
              {voucherMessage && (
                <p className={`text-[10px] font-bold mt-2 leading-relaxed ${voucherMessage.startsWith("✓") ? "text-emerald-600" : "text-red-500"}`}>
                  {voucherMessage}
                </p>
              )}
            </div>
          </AhnaraCard>
        </div>
      </div>
    </div>
  );
}
