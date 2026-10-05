import React from 'react';
import { X } from 'lucide-react';
import GrowthDiagnostic from './GrowthDiagnostic';
import { DiagnosticAnswers } from '../types';

interface AIDiagnosticOSProps {
  onClose?: () => void;
  onStrategyCallRequest?: (answers?: Partial<DiagnosticAnswers>) => void;
  initialSector?: string;
}

export default function AIDiagnosticOS({ 
  onClose, 
  onStrategyCallRequest,
  initialSector 
}: AIDiagnosticOSProps) {
  return (
    <div 
      id="ai-diagnostic-chat-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs text-right animate-fade-in overflow-y-auto"
    >
      <div 
        className="relative w-full max-w-4xl my-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <GrowthDiagnostic 
          onStrategyCallRequest={onStrategyCallRequest}
          initialSector={initialSector}
          isEmbedded={false}
        />
      </div>
    </div>
  );
}
