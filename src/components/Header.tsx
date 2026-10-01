import React from 'react';
import { Microscope, ArrowLeft, Upload } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'inspection';
  setActiveTab: (tab: 'home' | 'inspection') => void;
  onNewScanClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onNewScanClick }) => {
  // If on Home page, hide header completely so it strictly matches the user's uploaded screenshot
  if (activeTab === 'home') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-[#168843]/95 backdrop-blur-md border-b border-emerald-400/20 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Back to Home & Brand Title */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer text-white hover:text-emerald-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center text-white group-hover:bg-white/25 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm sm:text-base font-bold tracking-tight text-white whitespace-nowrap block leading-tight">
              Rice Grain Quality Detection
            </span>
            <span className="text-[10px] text-emerald-100/80 font-mono block">
              Back to Home
            </span>
          </div>
        </button>

        {/* Removed navbar links as requested */}

        {/* Primary Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onNewScanClick}
            className="px-3.5 py-1.5 text-xs font-semibold text-[#15803d] bg-white hover:bg-emerald-50 rounded-lg transition-all shadow-sm whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload New Image</span>
          </button>
        </div>
      </div>
    </header>
  );
};
