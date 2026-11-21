"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShippingLine { name: string; color: string; bg: string; accent: string }
interface Props { activeContainer: number; shippingLine: ShippingLine }

/* ─── Brand livery ─── */
const LIVERY: Record<string, { body:string; stripe:string; text:string; logo:string; doors:string }> = {
  MSC:       { body:"#1a1f3d", stripe:"#FF6B35", text:"#FFFFFF", logo:"MSC",         doors:"#141830" },
  MAERSK:    { body:"#00243D", stripe:"#00A8E0", text:"#FFFFFF", logo:"MAERSK",      doors:"#001c30" },
  "CMA CGM": { body:"#1D1B2E", stripe:"#E63946", text:"#FFFFFF", logo:"CMA CGM",    doors:"#161424" },
  HAPAG:     { body:"#E8640A", stripe:"#003366", text:"#FFFFFF", logo:"HAPAG-LLOYD", doors:"#c95800" },
  "ONE LINE":{ body:"#E91E8C", stripe:"#FFFFFF", text:"#FFFFFF", logo:"ONE",         doors:"#c0166e" },
};

/*
  SVG canvas: 760 × 260
  Layout (Y-axis, from bottom up):
    Y=260  → ground / road surface
    Y=260-WR → wheel centre (bottom of tyre touches ground)
    Y=260-WR*2-CHASSIS_H → top of chassis
    container sits on top of chassis
*/
const SVG_W = 760;
const SVG_H = 260;
const WR = 34;            // wheel radius
const WHEEL_Y = SVG_H - WR;          // 226  — wheel centres sit near bottom
const CHASSIS_TOP = WHEEL_Y - WR - 4; // 188  — chassis top
const CHASSIS_H = 16;
const CTR_H = 148;
const CTR_Y = CHASSIS_TOP - CTR_H;    // 40
const CTR_X = 8;
const CTR_W = 530;

/* ─── Spinning wheel ─── */
const Wheel = ({ cx, cy, r }: { cx:number; cy:number; r:number }) => (
  <g>
    {/* Outer tyre – clearly visible dark rubber */}
    <circle cx={cx} cy={cy} r={r}   fill="#1a1a1a" stroke="#333" strokeWidth="2"/>
    {/* Tyre sidewall highlight */}
    <circle cx={cx} cy={cy} r={r}   fill="none" stroke="#444" strokeWidth="1" strokeDasharray="4 6"
      style={{ animation: `truckSpin ${0.9}s linear infinite`, transformOrigin: `${cx}px ${cy}px` }}/>
    {/* Rim – lighter steel blue so it's visible */}
    <circle cx={cx} cy={cy} r={r*0.58} fill="#2a3d5e" stroke="#3a5580" strokeWidth="2"/>
    {/* Hub cap */}
    <circle cx={cx} cy={cy} r={r*0.22} fill="#111a2a" stroke="#3a5a8a" strokeWidth="2"/>
    {/* Spokes */}
    <g style={{ animation: `truckSpin ${0.9}s linear infinite`, transformOrigin: `${cx}px ${cy}px` }}>
      {[0,51,103,154,206,257,309].map(a => {
        const rad = a * Math.PI / 180;
        return <line key={a}
          x1={cx + r*0.22*Math.cos(rad)} y1={cy + r*0.22*Math.sin(rad)}
          x2={cx + r*0.55*Math.cos(rad)} y2={cy + r*0.55*Math.sin(rad)}
          stroke="#4a6a9a" strokeWidth="4" strokeLinecap="round"/>;
      })}
      {/* Lug bolts */}
      {[0,51,103,154,206,257,309].map(a => {
        const rad = a * Math.PI / 180;
        return <circle key={a}
          cx={cx + r*0.38*Math.cos(rad)} cy={cy + r*0.38*Math.sin(rad)}
          r={r*0.09} fill="#5a7ab0" stroke="#7090c0" strokeWidth="1"/>;
      })}
    </g>
    {/* Tyre glint */}
    <ellipse cx={cx-r*0.28} cy={cy-r*0.28} rx={r*0.18} ry={r*0.09}
      fill="rgba(255,255,255,0.08)" transform={`rotate(-45,${cx},${cy})`}/>
  </g>
);

/* ─── Branded container ─── */
const Container = ({ line, idx }: { line:ShippingLine; idx:number }) => {
  const lv = LIVERY[line.name] ?? LIVERY.MSC;
  const ctrNum = `${line.name.replace(/ /g,"")}U 4823${(line.name.length*137 + idx*11) % 999} 5`;
  return (
    <g>
      {/* Body */}
      <rect x={CTR_X} y={CTR_Y} width={CTR_W} height={CTR_H} rx="4" fill={lv.body}/>
      {/* Top rail */}
      <rect x={CTR_X} y={CTR_Y} width={CTR_W} height={11} rx="2" fill={lv.stripe} opacity="0.6"/>
      {/* Bottom stripe */}
      <rect x={CTR_X} y={CTR_Y+CTR_H-22} width={CTR_W} height={22} fill={lv.stripe} opacity="0.82"/>
      <rect x={CTR_X} y={CTR_Y+CTR_H-22} width={CTR_W} height={22} fill="url(#stripeSheen)" opacity="0.25"/>
      {/* Ribs */}
      {[80,160,240,320,400,476].map(rx => (
        <g key={rx}>
          <rect x={CTR_X+rx-3} y={CTR_Y+11} width={6}  height={CTR_H-33} fill={lv.stripe} opacity="0.10"/>
          <rect x={CTR_X+rx-1} y={CTR_Y+11} width={2}  height={CTR_H-33} fill={lv.stripe} opacity="0.18"/>
        </g>
      ))}
      {/* Door panel */}
      <rect x={CTR_X+CTR_W-84} y={CTR_Y+11} width={84} height={CTR_H-33} fill={lv.doors} opacity="0.55"/>
      <line x1={CTR_X+CTR_W-84} y1={CTR_Y+11} x2={CTR_X+CTR_W-84} y2={CTR_Y+CTR_H-22}
        stroke={lv.stripe} strokeWidth="1.5" opacity="0.55"/>
      <line x1={CTR_X+CTR_W-44} y1={CTR_Y+11} x2={CTR_X+CTR_W-44} y2={CTR_Y+CTR_H-22}
        stroke={lv.stripe} strokeWidth="1" opacity="0.35"/>
      {/* Door handles */}
      <rect x={CTR_X+CTR_W-72} y={CTR_Y+CTR_H/2-14} width={9} height={28} rx="4" fill={lv.stripe} opacity="0.65"/>
      <rect x={CTR_X+CTR_W-32} y={CTR_Y+CTR_H/2-14} width={9} height={28} rx="4" fill={lv.stripe} opacity="0.65"/>
      {/* LOGO */}
      <text x={CTR_X+CTR_W/2-55} y={CTR_Y+CTR_H/2+13} fill={lv.text} fontSize="34" fontWeight="900"
        fontFamily="Arial Black, Impact, sans-serif" letterSpacing="3" opacity="0.96">
        {lv.logo}
      </text>
      {/* Container number */}
      <text x={CTR_X+18} y={CTR_Y+CTR_H-7} fill={lv.stripe==="white"||lv.stripe==="#FFFFFF" ? lv.body : lv.stripe}
        fontSize="8.5" fontWeight="700" fontFamily="monospace" opacity="0.8">{ctrNum}</text>
      {/* Sheen */}
      <rect x={CTR_X} y={CTR_Y} width={CTR_W} height={CTR_H} rx="4" fill="url(#ctnSheen)" opacity="0.1"/>
      {/* Corner castings */}
      {[[CTR_X,CTR_Y],[CTR_X+CTR_W-14,CTR_Y],[CTR_X,CTR_Y+CTR_H-14],[CTR_X+CTR_W-14,CTR_Y+CTR_H-14]]
        .map(([cx,cy],i)=>(
        <rect key={i} x={cx} y={cy} width={14} height={14} rx="2"
          fill={lv.stripe} stroke={lv.stripe} strokeWidth="1" opacity="0.8"/>
      ))}
      {/* Outline */}
      <rect x={CTR_X} y={CTR_Y} width={CTR_W} height={CTR_H} rx="4" fill="none"
        stroke={lv.stripe} strokeWidth="1.5" opacity="0.45"/>
    </g>
  );
};

export const ContainerTruck = ({ activeContainer, shippingLine }: Props) => (
  /* Drive across screen */
  <motion.div
    className="relative pointer-events-none select-none"
    style={{ width: SVG_W, height: SVG_H }}
    animate={{ x: ["-15%", "115%"] }}
    transition={{ duration: 44, ease: "linear", repeat: Infinity, repeatDelay: 1.5 }}
  >
    {/* Suspension bounce */}
    <motion.div className="absolute inset-0"
      animate={{ y: [0, -3, 0, -2, 0] }}
      transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        fill="none" xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
        style={{ filter: "drop-shadow(0 14px 40px rgba(0,0,0,0.7))" }}
      >
        <defs>
          <linearGradient id="tyreFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1c2a3e"/>
            <stop offset="100%" stopColor="#060e1a"/>
          </linearGradient>
          <radialGradient id="rimFill" cx="38%" cy="35%">
            <stop offset="0%" stopColor="#2d4575"/>
            <stop offset="100%" stopColor="#0e1a2e"/>
          </radialGradient>
          <linearGradient id="ctnSheen" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#000000" stopOpacity="0.1"/>
          </linearGradient>
          <linearGradient id="stripeSheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0"/>
            <stop offset="50%" stopColor="#fff" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="cabGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3050"/>
            <stop offset="100%" stopColor="#0c1828"/>
          </linearGradient>
          <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#24385a"/>
            <stop offset="100%" stopColor="#172238"/>
          </linearGradient>
          <linearGradient id="chassisGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2a40"/>
            <stop offset="100%" stopColor="#090f1c"/>
          </linearGradient>
          <radialGradient id="hlGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe066" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="#ffe066" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* ── Container ── */}
        <AnimatePresence mode="wait">
          <motion.g key={shippingLine.name}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.5 }}>
            <Container line={shippingLine} idx={activeContainer}/>
          </motion.g>
        </AnimatePresence>

        {/* ── Chassis beam ── */}
        <rect x={CTR_X} y={CHASSIS_TOP} width={CTR_W+6} height={CHASSIS_H}
          rx="4" fill="url(#chassisGrad)" stroke="#1a2c44" strokeWidth="1.5"/>
        {/* Cross members */}
        {[55,135,215,295,375,455,520].map(x => (
          <rect key={x} x={x} y={CHASSIS_TOP} width={10} height={CHASSIS_H} fill="#111e30"/>
        ))}
        {/* King-pin */}
        <rect x={CTR_X+CTR_W-4} y={CHASSIS_TOP-6} width={26} height={CHASSIS_H+8}
          rx="3" fill="#192840" stroke="#26406a" strokeWidth="1.5"/>
        <circle cx={CTR_X+CTR_W+9} cy={CHASSIS_TOP+CHASSIS_H/2} r="6"
          fill="#080f1e" stroke="#2a4570" strokeWidth="1.5"/>

        {/* ── CAB ── */}
        {/* Cab body */}
        <rect x="548" y={CTR_Y+10} width="186" height={CHASSIS_TOP-CTR_Y}
          rx="10" fill="url(#cabGrad)" stroke="#1a3060" strokeWidth="2"/>
        {/* Hood nose slope */}
        <path d={`M 730 ${CTR_Y+10} L 756 ${CTR_Y+34} L 756 ${CHASSIS_TOP+CHASSIS_H} L 730 ${CHASSIS_TOP+CHASSIS_H+4} Z`}
          fill="#0a1422" stroke="#192840" strokeWidth="1.5"/>
        {/* Roof fairing */}
        <rect x="558" y={CTR_Y-6} width="166" height="26" rx="7"
          fill="url(#roofGrad)" stroke="#1a3060" strokeWidth="1.5"/>
        <rect x="558" y={CTR_Y-6} width="166" height="5" rx="2" fill="#2a4570" opacity="0.55"/>
        {/* Windshield */}
        <rect x="552" y={CTR_Y+22} width="96" height="60" rx="8"
          fill="#06102a" stroke="#2060c0" strokeWidth="2" opacity="0.97"/>
        {/* A-pillar */}
        <line x1="552" y1={CTR_Y+22} x2="552" y2={CTR_Y+82}
          stroke="#1a3060" strokeWidth="5" strokeLinecap="round"/>
        {/* Windshield glare */}
        <path d={`M556 ${CTR_Y+26} L570 ${CTR_Y+78} Q562 ${CTR_Y+80} 556 ${CTR_Y+76} Z`}
          fill="rgba(255,255,255,0.09)"/>
        <path d={`M570 ${CTR_Y+25} L582 ${CTR_Y+78} Q576 ${CTR_Y+79} 572 ${CTR_Y+76} Z`}
          fill="rgba(255,255,255,0.04)"/>
        {/* Cab door divider */}
        <line x1="626" y1={CTR_Y+22} x2="626" y2={CHASSIS_TOP+CHASSIS_H}
          stroke="#1a3060" strokeWidth="2" strokeDasharray="4 4" opacity="0.6"/>
        {/* Upper door window */}
        <rect x="628" y={CTR_Y+22} width="96" height="38" rx="4"
          fill="#06102a" stroke="#1a3060" strokeWidth="1" opacity="0.75"/>
        {/* ASHOK LEYLAND badge */}
        <rect x="634" y={CTR_Y+70} width="86" height="26" rx="5"
          fill="#080f1e" stroke="#162840" strokeWidth="1"/>
        <text x="677" y={CTR_Y+87} fill="#f97316" fontSize="8.5" fontWeight="800"
          fontFamily="Arial,sans-serif" textAnchor="middle" letterSpacing="0.5">
          ASHOK LEYLAND
        </text>
        {/* Door handle */}
        <rect x="627" y={CTR_Y+100} width="18" height="5" rx="2.5" fill="#2040a0" opacity="0.8"/>
        {/* Steps */}
        <rect x="550" y={CHASSIS_TOP-10} width="40" height="10" rx="2" fill="#111e30"/>
        <rect x="550" y={CHASSIS_TOP} width="40" height="6" rx="2" fill="#090f1c"/>
        {/* Side mirror */}
        <rect x="744" y={CTR_Y+36} width="4" height="18" rx="2" fill="#111e30"/>
        <rect x="744" y={CTR_Y+26} width="20" height="14" rx="3"
          fill="#111e30" stroke="#1e3055" strokeWidth="1.5"/>
        {/* Exhaust stack */}
        <rect x="712" y={CTR_Y-30} width="13" height="36" rx="5"
          fill="#111e30" stroke="#1e3055" strokeWidth="1.5"/>
        <ellipse cx="718" cy={CTR_Y-30} rx="9" ry="5" fill="#060e1a"/>
        {/* Air horn */}
        <rect x="698" y={CTR_Y+2} width="8" height="16" rx="3"
          fill="#111e30" stroke="#1e3055" strokeWidth="1"/>
        {/* Headlight housing */}
        <rect x="744" y={CTR_Y+52} width="16" height="16" rx="3"
          fill="#060e1a" stroke="#192840" strokeWidth="1.5"/>
        <rect x="746" y={CTR_Y+54} width="12" height="12" rx="2" fill="#ffe066" opacity="0.95"/>
        <ellipse cx="752" cy={CTR_Y+60} rx="14" ry="10" fill="url(#hlGlow)" opacity="0.5"/>
        {/* DRL strip */}
        <rect x="744" y={CTR_Y+70} width="16" height="6" rx="2" fill="#f97316" opacity="0.9"/>
        <ellipse cx="752" cy={CTR_Y+73} rx="10" ry="6" fill="#f97316" opacity="0.14"/>
        {/* Grille */}
        <rect x="744" y={CTR_Y+22} width="15" height="28" rx="3"
          fill="#040a12" stroke="#122030" strokeWidth="1.5"/>
        {[CTR_Y+26,CTR_Y+31,CTR_Y+36,CTR_Y+40,CTR_Y+44].map(y=>(
          <line key={y} x1="746" y1={y} x2="758" y2={y} stroke="#1a2d48" strokeWidth="1.2"/>
        ))}
        {/* Bumper */}
        <rect x="741" y={CHASSIS_TOP+2} width="20" height="14" rx="3"
          fill="#101e35" stroke="#1a3055" strokeWidth="1.5"/>
        <rect x="742" y={CHASSIS_TOP+5} width="18" height="2" rx="1" fill="#2a4070" opacity="0.6"/>
        {/* AL badge */}
        <circle cx="751" cy={CTR_Y+14} r="10" fill="#080f1e" stroke="#f97316" strokeWidth="1.5"/>
        <text x="751" y={CTR_Y+18} fill="#f97316" fontSize="7" fontWeight="900"
          fontFamily="Arial" textAnchor="middle">AL</text>
        {/* Roof marker lights */}
        {[562,576,590,604].map(x=>(
          <rect key={x} x={x} y={CTR_Y-5} width="7" height="5" rx="1" fill="#ffe066" opacity="0.85"/>
        ))}

        {/* ── WHEELS — all touching ground (cy = WHEEL_Y) ── */}
        {/* Rear axle 1 – dual */}
        <Wheel cx={76}  cy={WHEEL_Y} r={WR}/>
        <Wheel cx={136} cy={WHEEL_Y} r={WR}/>
        {/* Rear axle 2 – dual */}
        <Wheel cx={218} cy={WHEEL_Y} r={WR}/>
        <Wheel cx={278} cy={WHEEL_Y} r={WR}/>
        {/* Drive axle – dual */}
        <Wheel cx={400} cy={WHEEL_Y} r={WR}/>
        <Wheel cx={460} cy={WHEEL_Y} r={WR}/>
        {/* Steer axle – single */}
        <Wheel cx={664} cy={WHEEL_Y} r={WR}/>

        {/* Ground shadow */}
        <ellipse cx="370" cy={SVG_H-2} rx="358" ry="10" fill="rgba(0,0,0,0.45)"/>

        {/* Motion speed lines */}
        {[0,1,2,3].map(i=>(
          <line key={i} x1={0} y1={WHEEL_Y+WR-4+i*4} x2={16+i*14} y2={WHEEL_Y+WR-4+i*4}
            stroke={`rgba(249,115,22,${0.07-i*0.015})`} strokeWidth="2"/>
        ))}

        {/* ── Exhaust smoke (SMIL) ── */}
        {[0, 0.45, 0.9, 1.35].map((d,i)=>(
          <circle key={i} cx={718} cy={CTR_Y-30} r={5+i*2} fill="rgba(155,165,185,0.4)">
            <animate attributeName="cy" values={`${CTR_Y-30};${CTR_Y-90}`}
              dur={`${1.8+i*0.2}s`} begin={`${d}s`} repeatCount="indefinite" calcMode="ease-out"/>
            <animate attributeName="opacity" values="0;0.65;0"
              dur={`${1.8+i*0.2}s`} begin={`${d}s`} repeatCount="indefinite"/>
            <animate attributeName="r" values={`${5+i*2};${14+i*5}`}
              dur={`${1.8+i*0.2}s`} begin={`${d}s`} repeatCount="indefinite"/>
          </circle>
        ))}

        {/* ── Road dust behind rear wheels ── */}
        {[0,1,2].map(i=>(
          <ellipse key={i} cx={30+i*18} cy={SVG_H-4} rx={9+i*3} ry={3+i}
            fill="rgba(155,140,105,0.14)">
            <animate attributeName="cx" values={`${30+i*18};${-45-i*22}`}
              dur={`${0.9+i*0.15}s`} repeatCount="indefinite" calcMode="ease-out"/>
            <animate attributeName="opacity" values="0.5;0"
              dur={`${0.9+i*0.15}s`} repeatCount="indefinite"/>
          </ellipse>
        ))}
      </svg>

      {/* ── Shipping line live badge ── */}
      <AnimatePresence mode="wait">
        <motion.div key={shippingLine.name+"_b"}
          className="absolute flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
          style={{
            top: CTR_Y + 14,
            left: CTR_X + 14,
            zIndex: 10,
            background: shippingLine.color + "18",
            border: `1px solid ${shippingLine.color}55`,
            backdropFilter: "blur(8px)",
          }}
          initial={{ opacity:0, y:-5 }} animate={{ opacity:1, y:0 }}
          exit={{ opacity:0 }} transition={{ duration:0.35 }}>
          <motion.div className="w-2 h-2 rounded-full" style={{ background: shippingLine.color }}
            animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:1.2, repeat:Infinity }}/>
          <span className="text-[8px] font-black uppercase tracking-widest"
            style={{ color: shippingLine.color }}>{shippingLine.name}</span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  </motion.div>
);
