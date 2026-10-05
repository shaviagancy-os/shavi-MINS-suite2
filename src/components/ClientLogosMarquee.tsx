import React from 'react';
import { motion } from 'motion/react';
import { 
  Compass, Cpu, Layers, TrendingUp, Sparkles, 
  Globe, Droplet, Package, Factory, Heart, Utensils, Zap, Car, Anchor, Flower, Shield
} from 'lucide-react';

interface LogoItem {
  name: string;
  type: string;
  icon: React.ReactNode;
  color: string;
}

export default function ClientLogosMarquee() {
  const logos: LogoItem[] = [
    { 
      name: 'PATSHA', 
      type: 'Lifestyle', 
      icon: <Sparkles className="w-5 h-5" />, 
      color: 'group-hover:text-amber-500 group-hover:bg-amber-50' 
    },
    { 
      name: 'Waha Travel', 
      type: 'Tourism', 
      icon: <Compass className="w-5 h-5" />, 
      color: 'group-hover:text-sky-500 group-hover:bg-sky-50' 
    },
    { 
      name: 'Zain Weddings', 
      type: 'Events', 
      icon: <Heart className="w-5 h-5" />, 
      color: 'group-hover:text-pink-500 group-hover:bg-pink-50' 
    },
    { 
      name: 'B. Laban', 
      type: 'Food Brand', 
      icon: <Utensils className="w-5 h-5" />, 
      color: 'group-hover:text-blue-500 group-hover:bg-blue-50' 
    },
    { 
      name: 'IntelliGo', 
      type: 'Tech Platform', 
      icon: <Zap className="w-5 h-5" />, 
      color: 'group-hover:text-yellow-500 group-hover:bg-yellow-50' 
    },
    { 
      name: 'VOVA', 
      type: 'Automotive', 
      icon: <Car className="w-5 h-5" />, 
      color: 'group-hover:text-red-500 group-hover:bg-red-50' 
    },
    { 
      name: 'Shawky Group', 
      type: 'Industrial', 
      icon: <Factory className="w-5 h-5" />, 
      color: 'group-hover:text-emerald-500 group-hover:bg-emerald-50' 
    },
    { 
      name: 'IX Holding', 
      type: 'Finance', 
      icon: <Layers className="w-5 h-5" />, 
      color: 'group-hover:text-indigo-500 group-hover:bg-indigo-50' 
    },
    { 
      name: 'Pure Water', 
      type: 'Beverage', 
      icon: <Droplet className="w-5 h-5" />, 
      color: 'group-hover:text-cyan-500 group-hover:bg-cyan-50' 
    },
    { 
      name: 'Top Delivery', 
      type: 'Logistics', 
      icon: <Package className="w-5 h-5" />, 
      color: 'group-hover:text-orange-500 group-hover:bg-orange-50' 
    },
    { 
      name: 'Remo Flowers', 
      type: 'Retail', 
      icon: <Anchor className="w-5 h-5" />, 
      color: 'group-hover:text-rose-500 group-hover:bg-rose-50' 
    },
    { 
      name: 'Matar CNC', 
      type: 'Precision Tech', 
      icon: <Shield className="w-5 h-5" />, 
      color: 'group-hover:text-violet-500 group-hover:bg-violet-50' 
    }
  ];

  // Double the list to create a seamless infinite loop
  const listItems = [...logos, ...logos, ...logos];

  return (
    <div className="w-full py-6 relative overflow-hidden bg-white/40 backdrop-blur-sm border-y border-gray-100/60 select-none">
      {/* Absolute fade gradients on left & right sides for a high-end cinematic blend */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling row container */}
      <div className="flex w-max">
        <motion.div
          className="flex gap-4 md:gap-8 items-center px-4"
          animate={{ x: [0, -1200] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
        >
          {listItems.map((logo, index) => (
            <div
              key={index}
              className="group flex items-center gap-3 px-5 py-3.5 bg-white/80 border border-gray-100/80 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-default min-w-[170px] md:min-w-[190px]"
            >
              {/* Logo icon frame */}
              <div className={`w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 transition-all duration-300 ${logo.color}`}>
                {logo.icon}
              </div>
              
              {/* Brand metadata */}
              <div className="text-right">
                <h4 className="font-en font-black text-xs md:text-sm text-gray-800 tracking-tight group-hover:text-gray-950 transition-colors">
                  {logo.name}
                </h4>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider font-en mt-0.5">
                  {logo.type}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
