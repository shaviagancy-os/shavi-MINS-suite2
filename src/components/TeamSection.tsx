import React from 'react';
import { teamMembers } from '../data';

export default function TeamSection() {
  return (
    <section className="space-y-10 text-right">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-red">
          <span>فريق الإدارة والتشغيل</span>
          <span className="text-gray-300">·</span>
          <span className="font-en text-[11px] text-gray-500 uppercase tracking-wider">MANAGEMENT & GROWTH TEAM</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-950">
          فريق قيادة وتطوير أنظمة Shavi
        </h2>
        <p className="text-xs md:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
          فريق متكامل يجمع بين استراتيجيات التسويق الموجه، تطوير العمليات، والأنظمة التقنية المتقدمة الموثقة في ملف الشركة الرسمي.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {teamMembers.map((member, index) => (
          <div 
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-5 text-center space-y-3 hover:border-accent-red/30 transition-all shadow-xs group"
          >
            <div className="w-14 h-14 rounded-full bg-accent-red/5 text-accent-red font-bold text-base flex items-center justify-center mx-auto group-hover:scale-105 transition-transform select-none border border-accent-red/15">
              {member.avatar}
            </div>
            
            <div className="space-y-1">
              <h4 className="font-bold text-gray-950 text-sm">
                {member.name}
              </h4>
              <p className="text-[11px] text-gray-500 leading-snug">
                {member.roleAr}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
