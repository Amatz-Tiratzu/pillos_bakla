import React, { useRef, useState } from 'react';
import { Camera, Upload, ArrowRight, Sparkles, CheckCircle2, ChevronDown, Layers, Cpu, Database } from 'lucide-react';
import { SAMPLE_PRESETS } from '../data/sampleData';
import { ModelType } from '../types/rice';

const RICE_BANNER_BG = '/src/assets/images/rice_banner_bg_1790817882263.jpg';

interface HomePageProps {
  onImageSelected: (file: File | string, sampleName: string, model: ModelType) => void;
  onSelectPreset: (index: number) => void;
  onOpenPipeline: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onImageSelected,
  onSelectPreset,
  onOpenPipeline
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showLearnMore, setShowLearnMore] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<ModelType>('ResNet50');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sampleName = file.name.replace(/\.[^/.]+$/, '');
      onImageSelected(file, sampleName, selectedModel);
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-[#1da955]">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* TOP SECTION: Rice Grain Image Background with Header Text */}
      <div 
        className="relative w-full h-[45vh] min-h-[300px] max-h-[460px] bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
        style={{
          backgroundImage: `url(${RICE_BANNER_BG})`,
          backgroundPosition: 'center 40%'
        }}
      >
        {/* Subtle Dark Scrim for Perfect Legibility */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-md">
            Rice Grain Quality and<br />Defect Detection
          </h1>

          <div className="pt-2">
            <button
              onClick={() => setShowLearnMore(!showLearnMore)}
              className="text-white hover:text-emerald-200 text-sm sm:text-base font-normal underline underline-offset-4 transition-colors cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Vibrant Green Area with "How it works?" and Upload Card */}
      <div className="flex-1 w-full bg-[#1fa855] flex flex-col items-center justify-center py-10 px-4 sm:px-6">
        <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
          {/* Section Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight">
            How it works?
          </h2>

          {/* Upload Card - Exactly matching the uploaded screenshot */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-sm bg-white rounded-2xl p-7 shadow-2xl hover:shadow-3xl cursor-pointer transition-all duration-200 hover:-translate-y-1 group flex flex-col items-center justify-center"
          >
            {/* Camera Icon in Soft Mint Circle */}
            <div className="w-16 h-16 rounded-full bg-[#dcfce7] flex items-center justify-center mb-4 text-[#16a34a] group-hover:scale-110 transition-transform">
              <Camera className="w-8 h-8 stroke-[1.8]" />
            </div>

            {/* Card Title */}
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              Upload an image of rice
            </h3>

            {/* Subtitle */}
            <p className="text-xs text-slate-500 mt-1.5 leading-normal">
              Provide a clear picture of your rice sample
            </p>
          </div>

          {/* Quick Presets for Instant 1-Click Evaluation */}
          <div className="mt-8 w-full max-w-md">
            <div className="text-white/80 text-xs font-medium uppercase tracking-wider mb-2.5">
              Or test with preloaded laboratory samples:
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {SAMPLE_PRESETS.map((preset, idx) => (
                <button
                  key={preset.id}
                  onClick={() => onSelectPreset(idx)}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg p-2 transition-all text-left flex flex-col justify-between backdrop-blur-sm"
                >
                  <span className="font-semibold truncate">{preset.summary.primarySampleDefect === 'None' ? 'Good Whole' : preset.summary.primarySampleDefect}</span>
                  <span className="text-[11px] text-white/80 font-mono mt-1">
                    {preset.summary.meanConfidence}% Conf
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* "Learn More" Expandable Modal / Drawer */}
      {showLearnMore && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 text-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Rice Grain Quality & Defect Detection</h3>
                <p className="text-xs text-slate-400 mt-0.5">Computer Vision & Deep Learning Research System</p>
              </div>
              <button
                onClick={() => setShowLearnMore(false)}
                className="text-slate-400 hover:text-white px-3 py-1 rounded bg-slate-800 text-xs"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>
                This system provides automated optical quality grading and multi-class defect classification of rice kernels using high-resolution computer vision algorithms and deep convolutional neural networks.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">5 Defect Categories</span>
                  <ul className="space-y-1 text-slate-400 text-xs">
                    <li>• <strong>None / Good</strong>: Translucent vitreous whole grain</li>
                    <li>• <strong>Broken</strong>: Severed kernel &lt; 75% length</li>
                    <li>• <strong>Discolored</strong>: Red/brown peck spots</li>
                    <li>• <strong>Cracked</strong>: Longitudinal or transverse stress cracks</li>
                    <li>• <strong>Chalky</strong>: Opaque milky-white core (&gt;20% area)</li>
                  </ul>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">Quality Classification</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Decoupled from defect detection. Grain condition is classified into <strong>Good Quality</strong> (zero defects detected) or <strong>Defective / Lower Quality</strong> (one or more defects detected), compliant with ISO 7301 standards.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                <span className="text-emerald-400 font-bold block">Technology Stack</span>
                <p className="text-slate-400">
                  • <strong>Models:</strong> Custom CNN, MobileNetV2, and ResNet50 trained with Python 3, TensorFlow, and Keras.
                </p>
                <p className="text-slate-400">
                  • <strong>Hardware:</strong> AMD Radeon GPU via ROCm / DirectML or Cloud GPU.
                </p>
                <p className="text-slate-400">
                  • <strong>Image Processing:</strong> OpenCV (CLAHE, Otsu thresholding, Watershed segmentation).
                </p>
                <p className="text-slate-400">
                  • <strong>Database:</strong> PostgreSQL for storing image logs, morphometrics, defect probabilities.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowLearnMore(false);
                  onOpenPipeline();
                }}
                className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <span>Explore 8-Stage Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
