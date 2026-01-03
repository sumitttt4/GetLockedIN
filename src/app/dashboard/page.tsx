"use client";

import React, { useState, useEffect } from "react";
import {
  Zap,
  Target,
  Plus,
  Settings,
  Share2,
  MapPin,
  Globe,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  Trophy,
  Filter,
  CreditCard,
  X,
  Loader2,
  Heart,
  Edit2,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NorthStarDirective } from "@/components/dashboard/RealFeatures";
import { connectStripe, getStripeData, getGoals, getProfile, getConsistencyLogs } from "@/app/dashboard/actions";
import { ConsistencyGrid } from "@/components/dashboard/ConsistencyGrid";

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState("All Goals");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // DATA STATE
  const [profile, setProfile] = useState<any>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [isLoadingGoals, setIsLoadingGoals] = useState(true);

  // LOGS STATE
  const [logs, setLogs] = useState<any[]>([]);
  const [streak, setStreak] = useState(0);

  // STRIPE STATE
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [stripeStatus, setStripeStatus] = useState<"IDLE" | "CONNECTING" | "CONNECTED" | "ERROR">("IDLE");
  const [stripeData, setStripeData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Initial Fetch
  useEffect(() => {
    // 0. Fetch Profile
    getProfile().then(data => {
      if (data) setProfile(data);
    });

    // 0.5 Fetch Consistency Logs
    getConsistencyLogs().then(data => {
      setLogs(data.logs);
      setStreak(data.streak);
    });

    // 1. Fetch Stripe
    getStripeData().then((data) => {
      if (data?.isConnected) {
        setStripeStatus("CONNECTED");
        setStripeData(data);
      }
    });

    // 2. Fetch Goals
    getGoals().then((data) => {
      setGoals(data);
      setIsLoadingGoals(false);
    });
  }, [showCreateModal]); // Re-fetch when modal closes/changes

  async function handleConnectStripe(formData: FormData) {
    setStripeStatus("CONNECTING");
    setErrorMessage("");

    const result = await connectStripe(formData);

    if (result?.error) {
      setStripeStatus("ERROR");
      setErrorMessage(result.error);
    } else if (result?.success) {
      setStripeStatus("CONNECTED");
      const data = await getStripeData();
      setStripeData(data);
      setTimeout(() => setShowStripeModal(false), 1500); // Close after success
    } else {
      setStripeStatus("IDLE");
    }
  }

  // Derived Stats
  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.status === 'Completed').length;
  const activeGoals = goals.filter(g => g.status === 'In Progress' || g.status === 'Not Started').length;

  const filteredGoals = activeFilter === 'All Goals'
    ? goals
    : goals.filter(g => g.status === activeFilter);

  const filters = [
    { label: "All Goals", count: totalGoals },
    { label: "Not Started", count: goals.filter(g => g.status === "Not Started").length },
    { label: "In Progress", count: goals.filter(g => g.status === "In Progress").length },
    { label: "Completed", count: completedGoals },
    { label: "Paused", count: goals.filter(g => g.status === "Paused").length },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-8 pb-12 pt-6 px-4 sm:px-6 relative">

      {/* --- TOP SECTION: PROFILE HEADER --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Profile Info (8 Cols) */}
        <div className="lg:col-span-8 bg-white border-2 border-black p-4 sm:p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between relative overflow-hidden">
          {/* Day 1 Badge */}
          <div className="absolute top-4 right-4 bg-black text-white text-[10px] uppercase font-bold px-2 py-1 tracking-widest border border-white shadow-sm rotate-1">
            Day 1 Operator
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 z-10">
            {/* Avatar */}
            <div className="w-24 h-24 bg-zinc-100 border-2 border-black flex items-center justify-center shrink-0">
              <span className="font-black text-4xl uppercase">{profile?.username?.[0] || '?'}</span>
            </div>

            {/* Details */}
            <div className="space-y-4 flex-1">
              <div>
                <h5 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">Your Goalboard</h5>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase truncate">@{profile?.username || 'Loading...'}</h1>
                <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs mt-1">
                  <MapPin className="w-3 h-3" /> Global Grid
                </div>
              </div>
              <p className="text-zinc-600 font-medium max-w-lg">
                Protocol Active. Locked in for 2026.
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex gap-4 mt-8 flex-wrap">
            <div className="flex items-center gap-3 px-4 py-3 bg-orange-50 border-2 border-black">
              <div className="w-8 h-8 rounded-none bg-orange-200 border border-black flex items-center justify-center">
                <Target className="w-4 h-4 text-orange-700" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-orange-800">Total Goals</div>
                <div className="text-xl font-black text-black leading-none">{totalGoals}</div>
              </div>
            </div>

            {/* Revenue Card (if connected) or Completed */}
            {stripeStatus === 'CONNECTED' ? (
              <div className="flex items-center gap-3 px-4 py-3 bg-indigo-50 border-2 border-black">
                <div className="w-8 h-8 rounded-none bg-indigo-200 border border-black flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-indigo-700" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-indigo-800">Revenue</div>
                  <div className="text-xl font-black text-black leading-none">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: stripeData?.currency || 'USD', maximumSignificantDigits: 3 }).format(stripeData?.balance || 0)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-4 py-3 bg-green-50 border-2 border-black">
                <div className="w-8 h-8 rounded-none bg-green-200 border border-black flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-green-800">Completed</div>
                  <div className="text-xl font-black text-black leading-none">{completedGoals}</div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 border-2 border-black">
              <div className="w-8 h-8 rounded-none bg-blue-200 border border-black flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-700" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-blue-800">Active</div>
                <div className="text-xl font-black text-black leading-none">{activeGoals}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Settings (4 Cols) */}
        <div className="lg:col-span-4 bg-white border-2 border-black p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider">Profile Status</h3>
                <p className="font-mono text-[10px] text-zinc-500 mt-1">Adjust visibility settings.</p>
              </div>
              <button className="flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-black text-xs font-bold uppercase hover:bg-zinc-200 transition-colors">
                <Settings className="w-3 h-3" /> Edit
              </button>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 border-l-4 border-l-green-500">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-green-700" />
                <span className="font-bold text-xs uppercase text-green-800">Profile is Public</span>
              </div>
              <p className="text-[10px] text-green-700 leading-tight">Anyone with the link can witness your progress.</p>
            </div>

            {/* STRIPE CONNECT BUTTON */}
            <button
              onClick={() => setShowStripeModal(true)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 border-2 border-black transition-all",
                stripeStatus === 'CONNECTED' ? "bg-indigo-50 border-indigo-200" : "bg-white hover:bg-zinc-50"
              )}
            >
              <div className="flex items-center gap-2">
                <CreditCard className={cn("w-4 h-4", stripeStatus === 'CONNECTED' ? "text-indigo-600" : "text-zinc-500")} />
                <span className={cn("text-xs font-bold uppercase", stripeStatus === 'CONNECTED' ? "text-indigo-900" : "text-zinc-700")}>
                  {stripeStatus === 'CONNECTED' ? "Stripe Active" : "Connect Stripe"}
                </span>
              </div>
              {stripeStatus === 'CONNECTED' && <div className="w-2 h-2 bg-indigo-500 rounded-none animate-pulse" />}
            </button>

          </div>

          <button className="w-full flex items-center justify-center gap-2 border-2 border-black py-2 font-bold uppercase hover:bg-zinc-100 transition-colors text-xs">
            <Share2 className="w-4 h-4" /> Share Profile
          </button>
        </div>

      </div>

      {/* --- CONSISTENCY ENGINE --- */}
      <ConsistencyGrid logs={logs} streak={streak} />

      {/* --- BOTTOM SECTION: GOALS MANAGER --- */}
      <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">

        {/* Header & Action */}
        <div className="p-4 sm:p-6 md:p-8 border-b-2 border-black flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase flex items-center gap-2 sm:gap-3">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8" /> Your Goals
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 font-medium">Track progress, update details, and stay consistent.</p>
          </div>

          <button
            onClick={() => setShowCreateModal(!showCreateModal)}
            className="bg-black text-white px-6 py-4 font-black uppercase tracking-wider hover:bg-[#00FF00] hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-0 hover:translate-x-[2px] hover:translate-y-[2px] border-2 border-black flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> {showCreateModal ? "Close" : "Create Goal"}
          </button>
        </div>

        {/* Create Modal Area */}
        {showCreateModal && (
          <div className="p-4 sm:p-6 md:p-8 bg-zinc-50 border-b-2 border-black animate-in slide-in-from-top-4">
            <NorthStarDirective />
          </div>
        )}

        {/* Filter Tabs (Tab Styles Redone) */}
        <div className="px-4 sm:px-6 md:px-8 py-4 bg-zinc-50 border-b-2 border-black flex gap-2 overflow-x-auto">
          {filters.map(filter => (
            <button
              key={filter.label}
              onClick={() => setActiveFilter(filter.label)}
              className={cn(
                "px-4 py-2 rounded-none border-2 text-xs font-bold uppercase transition-all whitespace-nowrap flex items-center gap-2",
                activeFilter === filter.label
                  ? "bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white border-zinc-200 text-zinc-500 hover:border-black"
              )}
            >
              {filter.label}
              <span className={cn(
                "w-5 h-5 rounded-none flex items-center justify-center text-[9px] border",
                activeFilter === filter.label ? "bg-white text-black border-black" : "bg-zinc-100 border-zinc-200"
              )}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Goals List */}
        <div className="p-4 sm:p-6 md:p-8 space-y-4 min-h-[400px]">
          {isLoadingGoals ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
            </div>
          ) : filteredGoals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-zinc-50 border-2 border-dashed border-zinc-300">
              <div className="bg-black text-white p-4 mb-4 font-mono text-xs max-w-sm w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                <p className="text-green-400">$ system_check_</p>
                <p className="text-zinc-500">Scanning for protocols...</p>
                <p className="text-red-500">No active directives found.</p>
                <p className="text-zinc-500 mt-2">To begin, you must declare your intent.</p>
                <div className="h-1 w-3 bg-green-500 animate-pulse mt-1 inline-block" />
              </div>
              <p className="font-bold text-zinc-400 uppercase tracking-widest mb-4">Awaiting First Command</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-black text-white px-8 py-3 font-black uppercase tracking-widest hover:bg-[#00FF00] hover:text-black transition-all shadow-lg hover:shadow-black/20"
              >
                Initialize Protocol
              </button>
            </div>
          ) : (
            filteredGoals.map((goal) => (
              <div key={goal.id} className="group relative bg-white border-2 border-zinc-200 hover:border-black p-4 sm:p-6 transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div className="flex items-center gap-4 sm:gap-6">
                  <div className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12 rounded-none flex items-center justify-center border-2 border-black text-white shrink-0",
                    goal.progress === 100 ? "bg-green-500" : "bg-zinc-900"
                  )}>
                    {goal.progress === 100 ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> : <Target className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight break-words">{goal.title}</h3>
                      {goal.visibility === 'private' && (
                        <span className="text-[10px] bg-zinc-100 px-1 border border-zinc-300 text-zinc-500 uppercase rounded-sm">Private</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-mono text-xs text-zinc-400 mt-1">{goal.date}</p>
                      {goal.category && (
                        <span className="text-[10px] font-bold uppercase text-black bg-zinc-100 px-2 py-0.5 rounded-none mt-1 border border-zinc-300">
                          {goal.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-6 md:gap-8 flex-wrap md:flex-nowrap">
                  {/* Supporters Mock */}
                  <div className="flex items-center gap-1 text-zinc-400">
                    <Heart className="w-4 h-4 fill-zinc-100 text-zinc-300" />
                    <span className="text-xs font-bold">0</span>
                  </div>

                  {/* Status Pill (Squared) */}
                  <span className={cn(
                    "px-3 py-1 rounded-none text-[10px] font-bold uppercase border whitespace-nowrap",
                    goal.status === "Completed" ? "bg-green-100 text-green-700 border-green-300" :
                      goal.status === "In Progress" ? "bg-blue-100 text-blue-700 border-blue-300" :
                        "bg-zinc-100 text-zinc-500 border-zinc-200"
                  )}>
                    {goal.status}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-zinc-100 border border-transparent hover:border-black rounded-none transition-all">
                      <Edit2 className="w-4 h-4 text-zinc-500" />
                    </button>
                    <button className="p-2 hover:bg-red-50 border border-transparent hover:border-red-500 rounded-none transition-all hover:text-red-500">
                      <Trash2 className="w-4 h-4 text-zinc-500 group-hover:text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar (Bottom) */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-100">
                  <div
                    className={cn("h-full", goal.progress === 100 ? "bg-green-500" : "bg-black")}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>

              </div>
            ))
          )}
        </div>
      </div>

      {/* --- STRIPE MODAL --- */}
      {showStripeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            <button
              onClick={() => setShowStripeModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-zinc-100 border border-transparent hover:border-black transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 space-y-6">
              <div className="space-y-2 text-center">
                <div className="mx-auto w-12 h-12 bg-indigo-100 border-2 border-black flex items-center justify-center mb-4 rounded-none">
                  <CreditCard className="w-6 h-6 text-indigo-700" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Connect Stripe</h2>
                <p className="text-sm text-zinc-500 font-medium">Link your account to track revenue automatically.</p>
              </div>

              {stripeStatus === 'CONNECTED' ? (
                <div className="bg-green-50 border-2 border-green-200 p-4 text-center space-y-4">
                  <div className="text-green-700 font-bold uppercase flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Account Linked
                  </div>
                  <div className="text-3xl font-black">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: stripeData?.currency || 'USD' }).format(stripeData?.balance || 0)}
                  </div>
                  <p className="text-xs text-green-700 font-mono">Real-time balance available</p>
                </div>
              ) : (
                <form action={handleConnectStripe} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500">Stripe Secret Key (sk_live...)</label>
                    <input
                      name="api_key"
                      type="password"
                      required
                      placeholder="sk_live_..."
                      className="w-full bg-zinc-50 border-2 border-black p-3 font-mono text-sm outline-none focus:bg-white placeholder:text-zinc-300"
                    />
                  </div>

                  {stripeStatus === 'ERROR' && (
                    <div className="text-xs text-red-600 font-bold bg-red-50 p-2 border border-red-200">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={stripeStatus === 'CONNECTING'}
                    className="w-full bg-black text-white py-4 font-black uppercase tracking-wider hover:bg-[#635BFF] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {stripeStatus === 'CONNECTING' ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connect Account"}
                  </button>

                  <p className="text-[10px] text-zinc-400 text-center px-4 leading-relaxed">
                    *Your key is encrypted using Supabase Vault. We only use Read-Only permissions to fetch balance status.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
