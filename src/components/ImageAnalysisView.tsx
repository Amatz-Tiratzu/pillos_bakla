import React, { useState } from 'react';
import { AnalysisRecord, DefectType, GrainDetection, ModelType } from '../types/rice';
import { DEFECT_COLORS, DEFECT_DESCRIPTIONS } from '../data/sampleData';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  ChevronDown,
  Layers,
  BarChart3,
  Database,
  Code,
  Sparkles
} from 'lucide-react';
import { PipelineViewer } from './PipelineViewer';
import { ModelBenchmarkView } from './ModelBenchmarkView';
import { StatisticalEvaluationView } from './StatisticalEvaluationView';
import { PostgresDatabaseView } from './PostgresDatabaseView';
import { PythonCodeExportModal } from './PythonCodeExportModal';

interface ImageAnalysisViewProps {
  currentRecord: AnalysisRecord;
  selectedGrainId: number | null;
  setSelectedGrainId: (id: number | null) => void;
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
  onSelectSample: (index: number) => void;
  currentPresetIndex: number;
  onBackToHome?: () => void;
}

export const ImageAnalysisView: React.FC<ImageAnalysisViewProps> = ({
  currentRecord,
  selectedGrainId,
  setSelectedGrainId,
  selectedModel,
  onModelChange,
  onSelectSample,
  currentPresetIndex,
  onBackToHome
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);
  const [showGrainLabels, setShowGrainLabels] = useState<boolean>(true);
  const [activeResearchTab, setActiveResearchTab] = useState<'none' | 'pipeline' | 'models' | 'stats' | 'database' | 'python'>('none');

  const selectedGrain: GrainDetection | undefined = currentRecord.grains.find(
    (g) => g.id === selectedGrainId
  ) || currentRecord.grains[0];

  const summary = currentRecord.summary;
  const isGoodQuality = summary.overallQuality === 'Good Quality';

  return (
    <div className="space-y-5 pb-12">
      {/* Top Controls Bar - Clean Frosted Container Inline with Green Theme */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-emerald-100 flex flex-wrap items-center justify-between gap-3 text-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto py-0.5 text-xs">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#16a34a] text-white hover:bg-[#15803d] transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            >
              ← Back to Home
            </button>
          )}

          <span className="text-slate-400 font-mono uppercase text-[11px] whitespace-nowrap ml-1">Preset:</span>
          {[
            '01. Broken (94%)',
            '02. Good Quality (97%)',
            '03. Chalky (95%)',
            '04. Cracked (92%)',
            '05. Discolored (96%)',
            '06. Batch Tray (24 Grains)'
          ].map((label, idx) => (
            <button
              key={idx}
              onClick={() => onSelectSample(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                currentPresetIndex === idx
                  ? 'bg-emerald-100 text-[#166534] font-bold border border-emerald-300 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Model Selector Pill */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs border border-slate-200">
          <Cpu className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
          <span className="text-slate-500 font-medium text-[11px] mr-1">Model:</span>
          {(['Custom CNN', 'MobileNetV2', 'ResNet50'] as ModelType[]).map((model) => (
            <button
              key={model}
              onClick={() => onModelChange(model)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedModel === model
                  ? 'bg-white text-emerald-800 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis Banner: 4 Clean White Cards (Exact Required System Output) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Output 1: Detected Defect */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <span>Detected Defect</span>
            <span className={`w-2.5 h-2.5 rounded-full ${summary.primarySampleDefect === 'None' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          </div>
          <div className="mt-2.5">
            <span className={`text-2xl font-extrabold tracking-tight ${
              summary.primarySampleDefect === 'None'
                ? 'text-emerald-700'
                : summary.primarySampleDefect === 'Broken'
                ? 'text-amber-600'
                : summary.primarySampleDefect === 'Discolored'
                ? 'text-rose-600'
                : summary.primarySampleDefect === 'Cracked'
                ? 'text-cyan-700'
                : 'text-purple-700'
            }`}>
              {summary.primarySampleDefect}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 line-clamp-1 leading-relaxed">
            {DEFECT_DESCRIPTIONS[summary.primarySampleDefect]}
          </div>
        </div>

        {/* Output 2: Quality Classification */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <span>Quality Classification</span>
            {isGoodQuality ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-500" />
            )}
          </div>
          <div className="mt-2.5">
            <span className={`text-2xl font-extrabold tracking-tight ${isGoodQuality ? 'text-emerald-700' : 'text-rose-600'}`}>
              {summary.overallQuality}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {isGoodQuality ? 'No visible defects detected' : 'One or more visible defects detected'}
          </div>
        </div>

        {/* Output 3: Detection Confidence */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <span>Detection Confidence</span>
            <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">High Conf</span>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-900 tabular-nums">
              {summary.meanConfidence}%
            </span>
            <span className="text-xs text-slate-500 font-mono">Softmax P(max)</span>
          </div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${summary.meanConfidence > 90 ? 'bg-[#16a34a]' : 'bg-amber-500'}`}
              style={{ width: `${summary.meanConfidence}%` }}
            />
          </div>
        </div>

        {/* Output 4: Number of Detected Grains */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <span>Detected Grains</span>
            <span className="text-slate-400 font-mono text-[11px]">{selectedModel}</span>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-900 tabular-nums">
              {summary.totalGrains}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              ({summary.goodCount} Good · {summary.totalGrains - summary.goodCount} Defective)
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between font-mono">
            <span>Grade:</span>
            <span className="text-emerald-700 font-bold">{summary.isoGrade}</span>
          </div>
        </div>
      </div>

      {/* Main Inspection Stage: Asymmetric Canvas & Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Interactive Image Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-xl border border-emerald-100/80 flex flex-col overflow-hidden">
          {/* Canvas HUD Header */}
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <Eye className="w-4 h-4 text-[#16a34a]" />
              <span>Optical Lightbox Capture</span>
              <span className="text-slate-300">|</span>
              <span className="font-mono text-slate-500 text-[11px]">{currentRecord.cameraSettings.resolution}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                className={`px-2 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                  showBoundingBoxes ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Boxes
              </button>
              <button
                onClick={() => setShowGrainLabels(!showGrainLabels)}
                className={`px-2 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                  showGrainLabels ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Labels
              </button>

              <span className="text-slate-300 mx-1">|</span>

              <button
                onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] text-slate-600 w-9 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200"
                title="Reset View"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Canvas Viewport */}
          <div className="relative flex-1 min-h-[380px] max-h-[500px] bg-slate-950 overflow-auto flex items-center justify-center p-4">
            <div
              className="relative transition-transform duration-150 origin-center select-none"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={currentRecord.imageUrl}
                alt="Rice Grain Lightbox Capture"
                className="max-h-[440px] w-auto object-contain rounded border border-slate-800/80 shadow-2xl block"
              />

              {/* Bounding Box Overlays */}
              {showBoundingBoxes &&
                currentRecord.grains.map((grain) => {
                  const isSelected = selectedGrain?.id === grain.id;
                  const colorConfig = DEFECT_COLORS[grain.primaryDefect];

                  return (
                    <div
                      key={grain.id}
                      onClick={() => setSelectedGrainId(grain.id)}
                      className={`absolute cursor-pointer transition-all border-2 rounded ${
                        isSelected
                          ? 'border-white ring-2 ring-white/60 bg-white/10 z-20'
                          : `${colorConfig.border} ${colorConfig.bg} hover:border-white z-10`
                      }`}
                      style={{
                        left: `${grain.x}%`,
                        top: `${grain.y}%`,
                        width: `${grain.width}%`,
                        height: `${grain.height}%`
                      }}
                    >
                      {showGrainLabels && (
                        <div className="absolute -top-6 left-0 flex items-center gap-1 bg-slate-950/90 border border-slate-700/80 px-1.5 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shadow-md pointer-events-none text-white">
                          <span className="text-slate-400">#{grain.id}</span>
                          <span className={colorConfig.text}>{grain.primaryDefect}</span>
                          <span className="text-slate-300 tabular-nums">· {grain.confidence}%</span>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Canvas Footer Metadata */}
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 font-mono flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>Lighting: {currentRecord.cameraSettings.lighting}</span>
              <span>·</span>
              <span>Calibration: {currentRecord.cameraSettings.calibrationFactorMmPerPx} mm/px</span>
            </div>
            <div>
              <span className="text-emerald-700 font-bold">Latency: {summary.processingTimeMs.toFixed(1)} ms</span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Grain Inspector & Measurements (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-xl border border-emerald-100/80 flex flex-col justify-between overflow-hidden">
          <div>
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Grain Morphometrics & Inspector</h3>
                <p className="text-xs text-slate-500">
                  Physical dimensions and defect optical indicators
                </p>
              </div>
              {selectedGrain && (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold ${
                  selectedGrain.primaryDefect === 'None'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  Grain #{selectedGrain.id} · {selectedGrain.primaryDefect}
                </span>
              )}
            </div>

            {/* Grain Selector Pills (for multi-grain batches) */}
            {currentRecord.grains.length > 1 && (
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto">
                <span className="text-[11px] font-mono text-slate-400 shrink-0">Grain:</span>
                {currentRecord.grains.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGrainId(g.id)}
                    className={`px-2 py-1 rounded text-xs font-mono transition-colors shrink-0 cursor-pointer ${
                      selectedGrain?.id === g.id
                        ? 'bg-[#16a34a] text-white font-bold'
                        : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    #{g.id} {g.primaryDefect === 'None' ? '✓' : '!'}
                  </button>
                ))}
              </div>
            )}

            {/* Inspector Body */}
            <div className="p-4 space-y-4 text-slate-800">
              {selectedGrain ? (
                <>
                  {/* Physical Dimensions */}
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-wider text-slate-500 mb-2 font-semibold">
                      Dimensions (Calibrated mm)
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-center">
                        <div className="text-[11px] text-slate-500">Length (L)</div>
                        <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                          {selectedGrain.lengthMm} <span className="text-xs font-normal text-slate-500">mm</span>
                        </div>
                        <div className="text-[10px] text-slate-400">Major axis</div>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-center">
                        <div className="text-[11px] text-slate-500">Width (W)</div>
                        <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                          {selectedGrain.widthMm} <span className="text-xs font-normal text-slate-500">mm</span>
                        </div>
                        <div className="text-[10px] text-slate-400">Minor axis</div>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-center">
                        <div className="text-[11px] text-slate-500">Aspect Ratio</div>
                        <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                          {selectedGrain.aspectRatio}
                        </div>
                        <div className="text-[10px] text-slate-400">{selectedGrain.aspectRatio < 2.2 ? 'Broken' : 'Standard'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Optical Indicators */}
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-wider text-slate-500 mb-2 font-semibold">
                      Defect Indicators
                    </h4>
                    <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-600">Chalkiness Density:</span>
                          <span className="font-mono font-bold text-slate-800">{selectedGrain.chalkyAreaPercent}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full ${selectedGrain.chalkyAreaPercent > 20 ? 'bg-purple-600' : 'bg-slate-400'}`}
                            style={{ width: `${Math.min(100, selectedGrain.chalkyAreaPercent * 2)}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-600">Discoloration (HSV / CIE ΔE):</span>
                          <span className="font-mono font-bold text-slate-800">{(selectedGrain.discolorationScore * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full ${selectedGrain.discolorationScore > 0.4 ? 'bg-rose-500' : 'bg-slate-400'}`}
                            style={{ width: `${selectedGrain.discolorationScore * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-600">Crack / Fissure Gradient:</span>
                          <span className="font-mono font-bold text-slate-800">{(selectedGrain.crackScore * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full ${selectedGrain.crackScore > 0.4 ? 'bg-cyan-600' : 'bg-slate-400'}`}
                            style={{ width: `${selectedGrain.crackScore * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5-Class Softmax Probabilities */}
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-wider text-slate-500 mb-2 font-semibold">
                      {selectedModel} Softmax Probabilities
                    </h4>
                    <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
                      {(['None', 'Broken', 'Discolored', 'Cracked', 'Chalky'] as DefectType[]).map((defect) => {
                        const prob = selectedGrain.defectProbabilities[defect] || 0;
                        const percentage = Math.round(prob * 100);
                        const isTarget = selectedGrain.primaryDefect === defect;

                        return (
                          <div key={defect}>
                            <div className="flex justify-between text-[11px] mb-0.5">
                              <span className={`font-semibold ${isTarget ? 'text-[#166534]' : 'text-slate-500'}`}>
                                {defect === 'None' ? 'None (Good)' : defect}
                              </span>
                              <span className="font-mono font-bold text-slate-700">{percentage}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full ${isTarget ? 'bg-[#16a34a]' : 'bg-slate-300'}`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  Select a grain on the image to view detailed morphometrics.
                </div>
              )}
            </div>
          </div>

          {/* Inspector Footer */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Quality Classification:</span>
            <span className={`font-bold ${selectedGrain?.quality === 'Good Quality' ? 'text-emerald-700' : 'text-rose-600'}`}>
              {selectedGrain?.quality}
            </span>
          </div>
        </div>
      </div>

      {/* Summary of Detected Defects Breakdown */}
      <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100/80 text-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">Summary of Detected Defects</h3>
            <p className="text-xs text-slate-500">
              Aggregated defect distribution across {summary.totalGrains} analyzed grain(s)
            </p>
          </div>

          <div className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-mono font-bold text-emerald-800">
            ISO Grade: {summary.isoGrade}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <div className="text-xs text-slate-500 font-medium">None / Good</div>
            <div className="text-xl font-bold font-mono text-emerald-700 mt-1 tabular-nums">
              {summary.goodCount}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              {summary.goodPercentage}% of sample
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <div className="text-xs text-slate-500 font-medium">Broken</div>
            <div className="text-xl font-bold font-mono text-amber-600 mt-1 tabular-nums">
              {summary.brokenCount}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              {((summary.brokenCount / summary.totalGrains) * 100).toFixed(1)}% of sample
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <div className="text-xs text-slate-500 font-medium">Discolored</div>
            <div className="text-xl font-bold font-mono text-rose-600 mt-1 tabular-nums">
              {summary.discoloredCount}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              {((summary.discoloredCount / summary.totalGrains) * 100).toFixed(1)}% of sample
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <div className="text-xs text-slate-500 font-medium">Cracked</div>
            <div className="text-xl font-bold font-mono text-cyan-700 mt-1 tabular-nums">
              {summary.crackedCount}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              {((summary.crackedCount / summary.totalGrains) * 100).toFixed(1)}% of sample
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <div className="text-xs text-slate-500 font-medium">Chalky</div>
            <div className="text-xl font-bold font-mono text-purple-700 mt-1 tabular-nums">
              {summary.chalkyCount}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              {((summary.chalkyCount / summary.totalGrains) * 100).toFixed(1)}% of sample
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Technical Research & Pipeline Drawer (Keeps the header clean without clutter) */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100/80 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Technical Research & Architecture Specifications</h3>
            <p className="text-xs text-slate-500">Pipeline, model benchmarks, SPSS stats, PostgreSQL, and Python source code</p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveResearchTab(activeResearchTab === 'pipeline' ? 'none' : 'pipeline')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                activeResearchTab === 'pipeline' ? 'bg-[#16a34a] text-white font-bold' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>8-Stage Pipeline</span>
            </button>

            <button
              onClick={() => setActiveResearchTab(activeResearchTab === 'models' ? 'none' : 'models')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                activeResearchTab === 'models' ? 'bg-[#16a34a] text-white font-bold' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Model Benchmarks</span>
            </button>

            <button
              onClick={() => setActiveResearchTab(activeResearchTab === 'stats' ? 'none' : 'stats')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                activeResearchTab === 'stats' ? 'bg-[#16a34a] text-white font-bold' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>SPSS Stats</span>
            </button>

            <button
              onClick={() => setActiveResearchTab(activeResearchTab === 'database' ? 'none' : 'database')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                activeResearchTab === 'database' ? 'bg-[#16a34a] text-white font-bold' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>PostgreSQL</span>
            </button>

            <button
              onClick={() => setActiveResearchTab(activeResearchTab === 'python' ? 'none' : 'python')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                activeResearchTab === 'python' ? 'bg-[#16a34a] text-white font-bold' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Python Code</span>
            </button>
          </div>
        </div>

        {/* Expanded Content Area */}
        {activeResearchTab !== 'none' && (
          <div className="p-5 bg-slate-950 text-slate-100 rounded-b-2xl">
            {activeResearchTab === 'pipeline' && <PipelineViewer />}
            {activeResearchTab === 'models' && <ModelBenchmarkView />}
            {activeResearchTab === 'stats' && <StatisticalEvaluationView />}
            {activeResearchTab === 'database' && <PostgresDatabaseView />}
            {activeResearchTab === 'python' && <PythonCodeExportModal />}
          </div>
        )}
      </div>
    </div>
  );
};
