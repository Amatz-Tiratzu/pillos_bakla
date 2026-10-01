import React, { useState } from 'react';
import { MODEL_BENCHMARKS } from '../data/sampleData';
import { ModelType, DefectType } from '../types/rice';
import { Cpu, Zap, Award, Layers, AlertCircle, ArrowUpRight, BarChart2 } from 'lucide-react';

export const ModelBenchmarkView: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<ModelType>('ResNet50');

  const activeBenchmark = MODEL_BENCHMARKS.find((m) => m.modelName === selectedModel) || MODEL_BENCHMARKS[2];

  return (
    <div className="space-y-6">
      {/* Title & GPU Context */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4" />
              <span>Deep Learning Architecture Comparison</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Custom CNN vs. MobileNetV2 vs. ResNet50
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Comparative benchmark under identical dataset splits (15,000 images, 500 test samples per class) trained on AMD Radeon RX 7900 XTX via ROCm / DirectML and Cloud GPU.
            </p>
          </div>

          <div className="bg-slate-950 px-3 py-2 rounded border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-slate-500 block text-[10px]">TRAINING ACCELERATION</span>
            <span className="text-emerald-400 font-semibold">ROCm 6.2 / DirectML · TensorFlow 2.16</span>
          </div>
        </div>
      </div>

      {/* Model Cards Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MODEL_BENCHMARKS.map((m) => {
          const isSelected = selectedModel === m.modelName;
          return (
            <div
              key={m.modelName}
              onClick={() => setSelectedModel(m.modelName)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-white">{m.modelName}</span>
                {m.modelName === 'ResNet50' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Highest F1
                  </span>
                )}
                {m.modelName === 'Custom CNN' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Fastest Edge
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-emerald-400 tabular-nums">
                  {m.accuracy}%
                </span>
                <span className="text-xs text-slate-400 font-mono">Accuracy</span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono space-y-1.5 text-slate-400">
                <div className="flex justify-between">
                  <span>Parameters:</span>
                  <span className="text-slate-200">{m.parameters}</span>
                </div>
                <div className="flex justify-between">
                  <span>Inference Latency:</span>
                  <span className="text-slate-200">{m.inferenceTimeMs} ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Model Size:</span>
                  <span className="text-slate-200">{m.modelSizeMb} MB</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparative Evaluation Metrics Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
        <h3 className="text-base font-semibold text-white mb-1">
          Comparative Performance Matrix
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Macro-averaged classification performance across all 5 defect categories
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Architecture</th>
                <th className="py-2.5 px-3">Parameters</th>
                <th className="py-2.5 px-3">Latency (ms)</th>
                <th className="py-2.5 px-3">Accuracy</th>
                <th className="py-2.5 px-3">Precision</th>
                <th className="py-2.5 px-3">Recall</th>
                <th className="py-2.5 px-3">F1-Score</th>
                <th className="py-2.5 px-3">Optimal Use-Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {MODEL_BENCHMARKS.map((m) => (
                <tr
                  key={m.modelName}
                  className={`hover:bg-slate-800/40 ${selectedModel === m.modelName ? 'bg-slate-800/20' : ''}`}
                >
                  <td className="py-3 px-3 font-semibold text-white flex items-center gap-1.5">
                    <span>{m.modelName}</span>
                    {selectedModel === m.modelName && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    )}
                  </td>
                  <td className="py-3 px-3 tabular-nums">{m.parameters}</td>
                  <td className="py-3 px-3 tabular-nums">{m.inferenceTimeMs} ms</td>
                  <td className="py-3 px-3 tabular-nums text-emerald-400 font-bold">{m.accuracy}%</td>
                  <td className="py-3 px-3 tabular-nums">{m.precision}%</td>
                  <td className="py-3 px-3 tabular-nums">{m.recall}%</td>
                  <td className="py-3 px-3 tabular-nums font-semibold text-white">{m.f1Score}%</td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">
                    {m.modelName === 'Custom CNN' && 'Low-power embedded sorting machines'}
                    {m.modelName === 'MobileNetV2' && 'Mobile light box inspection apps'}
                    {m.modelName === 'ResNet50' && 'High-precision research & certified grading'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Per-Defect Class F1 Comparison */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
        <h3 className="text-base font-semibold text-white mb-1">
          Per-Class F1-Score Breakdown ({selectedModel})
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Detection sensitivity across subtle defect morphologies
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {(['None', 'Broken', 'Discolored', 'Cracked', 'Chalky'] as DefectType[]).map((defect) => {
            const f1 = activeBenchmark.perClassF1[defect];
            return (
              <div key={defect} className="bg-slate-950 p-3.5 rounded border border-slate-800">
                <div className="text-xs font-mono text-slate-400">{defect}</div>
                <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                  {f1}%
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mt-2">
                  <div
                    className={`h-full ${f1 >= 95 ? 'bg-emerald-400' : f1 >= 90 ? 'bg-cyan-400' : 'bg-amber-400'}`}
                    style={{ width: `${f1}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1.5">
                  {defect === 'Cracked' && 'Subtle hairline fissures'}
                  {defect === 'Chalky' && 'Opaque core contrast'}
                  {defect === 'Broken' && 'Aspect ratio & length'}
                  {defect === 'Discolored' && 'CIE-Lab chromatic shift'}
                  {defect === 'None' && 'Vitreous whole grain'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Research Insight Note */}
        <div className="mt-4 p-3 bg-slate-950/80 rounded border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
          <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-200">Key Research Finding:</strong> While all models achieve &gt;96% on <em>Broken</em> and <em>None</em> grains due to prominent geometric contours, <strong>ResNet50 significantly outperforms Custom CNN on Cracked grains (95.4% vs 88.6%)</strong>. ResNet50's residual skip connections preserve fine spatial gradients needed to resolve hairline micro-fissures that blur through custom CNN pooling layers.
          </p>
        </div>
      </div>
    </div>
  );
};
