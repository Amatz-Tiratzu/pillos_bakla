import React, { useState } from 'react';
import { 
  Camera, 
  Sliders, 
  Scissors, 
  Cpu, 
  Crosshair, 
  ShieldCheck, 
  BarChart2, 
  Database,
  ArrowRight,
  Check,
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';
import { RIG_IMAGE, LIGHTBOX_TRAY_IMAGE, MACRO_DEFECTS_IMAGE } from '../data/sampleData';

export const PipelineViewer: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(1);

  const stages = [
    {
      id: 1,
      name: 'Image Acquisition',
      short: 'Acquisition',
      icon: Camera,
      tag: 'Hardware & Optics',
      desc: 'Controlled 12MP camera setup on precision LED light box'
    },
    {
      id: 2,
      name: 'Image Preprocessing',
      short: 'Preprocessing',
      icon: Sliders,
      tag: 'OpenCV & NumPy',
      desc: 'Grayscale conversion, CLAHE contrast equalization, denoising'
    },
    {
      id: 3,
      name: 'Grain Segmentation',
      short: 'Segmentation',
      icon: Scissors,
      tag: 'Watershed & Otsu',
      desc: 'Background removal, contour detection & touching grain separation'
    },
    {
      id: 4,
      name: 'Model Training',
      short: 'Training',
      icon: Cpu,
      tag: 'TensorFlow & Keras',
      desc: 'Custom CNN, MobileNetV2, ResNet50 on AMD Radeon / ROCm / Cloud GPU'
    },
    {
      id: 5,
      name: 'Defect Detection',
      short: 'Defects',
      icon: Crosshair,
      tag: '5 Defect Classes',
      desc: 'None, Broken, Discolored, Cracked, Chalky classification'
    },
    {
      id: 6,
      name: 'Quality Classification',
      short: 'Quality',
      icon: ShieldCheck,
      tag: 'Decision Engine',
      desc: 'Good Quality vs Defective/Lower Quality separation'
    },
    {
      id: 7,
      name: 'Research Evaluation',
      short: 'Evaluation',
      icon: BarChart2,
      tag: 'scikit-learn & SciPy',
      desc: 'Accuracy, F1, Confusion Matrix, ANOVA & Tukey HSD'
    },
    {
      id: 8,
      name: 'Database Storage',
      short: 'Storage',
      icon: Database,
      tag: 'PostgreSQL Relational',
      desc: 'Analysis records, grain coordinates, defect logs & queries'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4" />
          <span>Computer Vision Architecture</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          8-Stage Rice Grain Quality & Defect Detection Pipeline
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl">
          A modular, reproducible computer vision pipeline maintaining strict functional separation between image acquisition, preprocessing, grain segmentation, model training, defect detection, quality grading, statistical evaluation, and relational database persistence.
        </p>
      </div>

      {/* Interactive Horizontal Pipeline Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isActive = activeStage === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`p-3 rounded-lg border text-left transition-all relative flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    0{stage.id}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                </div>
                <div className={`text-xs font-semibold line-clamp-1 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {stage.short}
                </div>
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-2 truncate">
                {stage.tag}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Breakdown Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
        {activeStage === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Stage 01: Image Acquisition & Optical Rig</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Controlled 12MP Camera & Diffused LED Light Box Setup
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Optical quality consistency is critical for high-accuracy defect detection. Rice grains are illuminated from beneath and above in an enclosed inspection light box to eliminate shadows, hot spots, and ambient light variance.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-slate-950 p-3 rounded border border-slate-800">
                    <span className="text-slate-500 block">Camera Sensor</span>
                    <span className="text-white font-semibold">12MP Sony IMX477 CMOS</span>
                    <span className="text-slate-500 block text-[10px] mt-0.5">4056 × 3040 px resolution</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800">
                    <span className="text-slate-500 block">Illumination</span>
                    <span className="text-white font-semibold">5500K Diffused LED (CRI 98)</span>
                    <span className="text-slate-500 block text-[10px] mt-0.5">Dual top & backlight stage</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800">
                    <span className="text-slate-500 block">Calibration Factor</span>
                    <span className="text-white font-semibold">0.0238 mm / pixel</span>
                    <span className="text-slate-500 block text-[10px] mt-0.5">Checked with optical micrometer</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800">
                    <span className="text-slate-500 block">Exposure Control</span>
                    <span className="text-white font-semibold">ISO 100 · 1/120s · f/4.0</span>
                    <span className="text-slate-500 block text-[10px] mt-0.5">Fixed manual white balance</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-96 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 p-2">
                <img
                  src={RIG_IMAGE}
                  alt="Laboratory Light Box Setup"
                  className="rounded w-full h-56 object-cover"
                />
                <div className="p-2 text-xs text-slate-400 font-mono">
                  Figure 1.1: Overhead 12MP camera mounted on vertical stand with diffused light box tray.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStage === 2 && (
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <Sliders className="w-3.5 h-3.5" />
              <span>Stage 02: Image Preprocessing (OpenCV & NumPy)</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Contrast Enhancement, Denoising, and Color Space Transforms
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Raw sensor images undergo mathematical transformations in OpenCV to accentuate subtle micro-cracks and color variations while suppressing optical high-frequency noise.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                <h4 className="text-sm font-semibold text-emerald-400">1. Grayscale & CIE-Lab</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Converts RGB to grayscale for structural morphology, while preserving CIE L*a*b* color channels for detecting subtle red/brown discoloration.
                </p>
                <div className="bg-slate-900 p-2 rounded text-[11px] font-mono text-slate-300">
                  gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)<br/>
                  lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                <h4 className="text-sm font-semibold text-emerald-400">2. CLAHE Equalization</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Contrast Limited Adaptive Histogram Equalization enhances internal kernel grain boundaries and micro-fissures without amplifying background noise.
                </p>
                <div className="bg-slate-900 p-2 rounded text-[11px] font-mono text-slate-300">
                  clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))<br/>
                  enhanced = clahe.apply(gray)
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                <h4 className="text-sm font-semibold text-emerald-400">3. Bilateral Filter Denoising</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Smooths flat surface textures while strictly preserving sharp kernel edges and fracture lines essential for broken grain boundary detection.
                </p>
                <div className="bg-slate-900 p-2 rounded text-[11px] font-mono text-slate-300">
                  denoised = cv2.bilateralFilter(enhanced, d=9, sigmaColor=75, sigmaSpace=75)
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStage === 3 && (
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <Scissors className="w-3.5 h-3.5" />
              <span>Stage 03: Grain Segmentation & Boundary Extraction</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Otsu Thresholding, Watershed Algorithm, and Morphometrics
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Isolates every individual grain from the background tray and separates touching grains using distance transform watershed segmentation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
                <h4 className="text-sm font-semibold text-white">Watershed Algorithm Steps</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Otsu Bimodal Thresholding:</strong> Automatically segments foreground rice kernels from dark lightbox acrylic stage.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Morphological Opening:</strong> 3×3 elliptical kernel removes stray dust artifacts and smooths kernel silhouettes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Distance Transform:</strong> Identifies definitive kernel centers as watershed markers to split touching grains.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Contour Extraction:</strong> Computes rotated bounding boxes (`cv2.minAreaRect`), major length $L$, minor width $W$, and aspect ratio ($L/W$).</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
                <h4 className="text-sm font-semibold text-white">Extracted Morphometric Features</h4>
                <div className="space-y-2 text-xs font-mono text-slate-300">
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Length & Width:</span>
                    <span className="text-emerald-400">Major/minor axes × calibration (mm)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Aspect Ratio (L/W):</span>
                    <span className="text-emerald-400">&gt; 3.0 (Long) · &lt; 2.2 (Broken)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Chalkiness Ratio:</span>
                    <span className="text-emerald-400">Area(Opaque Core) / Total Area (%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Color Discoloration:</span>
                    <span className="text-emerald-400">ΔE in CIE-Lab color space</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStage === 4 && (
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <Cpu className="w-3.5 h-3.5" />
              <span>Stage 04: Deep Learning Model Training (TensorFlow & Keras)</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Comparing Custom CNN, MobileNetV2, and ResNet50 on AMD Radeon / ROCm
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Models are trained on 15,000 augmented rice grain images using Python 3, TensorFlow, and Keras. Hardware acceleration leverages AMD Radeon GPUs via ROCm / DirectML or Cloud GPU instances.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-emerald-400">Model 01</span>
                <h4 className="text-base font-bold text-white">Custom CNN</h4>
                <p className="text-xs text-slate-400">
                  4 Conv2D blocks (32, 64, 128, 256 filters) with BatchNorm, MaxPool2D, Dropout(0.4), and Dense(128).
                </p>
                <div className="text-[11px] font-mono text-slate-300 space-y-1 pt-2 border-t border-slate-800">
                  <div>Params: 1,847,365</div>
                  <div>Inference: 9.4 ms</div>
                  <div>Accuracy: 93.4%</div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-emerald-400">Model 02</span>
                <h4 className="text-base font-bold text-white">MobileNetV2</h4>
                <p className="text-xs text-slate-400">
                  Inverted residual blocks with depthwise separable convolutions. Pretrained on ImageNet, fine-tuned top layers.
                </p>
                <div className="text-[11px] font-mono text-slate-300 space-y-1 pt-2 border-t border-slate-800">
                  <div>Params: 3,538,984</div>
                  <div>Inference: 14.2 ms</div>
                  <div>Accuracy: 95.8%</div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded border border-emerald-500/40 bg-emerald-950/10 space-y-2">
                <span className="text-xs font-mono text-emerald-400">Model 03 (Top Performer)</span>
                <h4 className="text-base font-bold text-white">ResNet50</h4>
                <p className="text-xs text-slate-400">
                  50-layer deep residual network with bottleneck residual connections. Superior at detecting micro-cracks.
                </p>
                <div className="text-[11px] font-mono text-slate-300 space-y-1 pt-2 border-t border-slate-800">
                  <div>Params: 25,636,712</div>
                  <div>Inference: 28.5 ms</div>
                  <div>Accuracy: 97.6%</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded border border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Hardware Acceleration: AMD Radeon RX 7900 XTX (ROCm 6.2 / DirectML) or Cloud A100</span>
              <span>Optimizer: Adam (lr=1e-4, CosineDecay)</span>
            </div>
          </div>
        )}

        {activeStage === 5 && (
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <Crosshair className="w-3.5 h-3.5" />
              <span>Stage 05: Defect Detection (5 Strict Categories)</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Multi-Class Defect Classification
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Defect detection identifies the specific physical problem affecting each rice grain.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="bg-slate-950 p-3.5 rounded border border-emerald-500/30">
                <div className="text-xs font-mono text-emerald-400 uppercase">Class 1</div>
                <div className="text-base font-bold text-white mt-1">None / Good</div>
                <p className="text-xs text-slate-400 mt-1">
                  Rice grain has no visible defect; translucent vitreous endosperm with intact whole kernel geometry.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded border border-amber-500/30">
                <div className="text-xs font-mono text-amber-400 uppercase">Class 2</div>
                <div className="text-base font-bold text-white mt-1">Broken</div>
                <p className="text-xs text-slate-400 mt-1">
                  Rice grain is partially or significantly broken, with length less than 75% of whole grain length.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded border border-rose-500/30">
                <div className="text-xs font-mono text-rose-400 uppercase">Class 3</div>
                <div className="text-base font-bold text-white mt-1">Discolored</div>
                <p className="text-xs text-slate-400 mt-1">
                  Rice grain has an abnormal or different color (reddish, brown, peck, or black spots).
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded border border-cyan-500/30">
                <div className="text-xs font-mono text-cyan-400 uppercase">Class 4</div>
                <div className="text-base font-bold text-white mt-1">Cracked</div>
                <p className="text-xs text-slate-400 mt-1">
                  Rice grain has visible cracks, fissures, or fractures caused by rapid moisture sorption or drying.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded border border-purple-500/30">
                <div className="text-xs font-mono text-purple-400 uppercase">Class 5</div>
                <div className="text-base font-bold text-white mt-1">Chalky</div>
                <p className="text-xs text-slate-400 mt-1">
                  Rice grain has a visible opaque, milky-white chalky appearance over more than 20% of surface.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeStage === 6 && (
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Stage 06: Quality Classification (Clear Separation)</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Separation of Defect Detection from Quality Classification
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              The system strictly decouples the <strong>identification of defects</strong> from the <strong>overall quality classification</strong>. Defect detection identifies the exact physical flaw; quality classification determines whether the grain meets standards.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-5 rounded-lg border border-emerald-500/40 bg-emerald-950/10 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-base">
                  <Check className="w-5 h-5" />
                  <span>Good Quality</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Assigned <strong>ONLY when no visible defects are detected</strong> on the grain (`primaryDefect === 'None'`). The kernel exhibits complete structural integrity, standard aspect ratio, translucent vitreous endosperm, and uniform pigmentation.
                </p>
                <div className="p-3 bg-slate-900 rounded font-mono text-xs text-emerald-300">
                  Example: Detected Defect: None | Quality: Good Quality | Confidence: 97%
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-lg border border-rose-500/40 bg-rose-950/10 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-base">
                  <Crosshair className="w-5 h-5" />
                  <span>Defective / Lower Quality</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Assigned <strong>whenever one or more defects are detected</strong> (Broken, Discolored, Cracked, or Chalky). For commercial batches, overall quality grade is calculated against ISO 7301 / Codex Alimentarius tolerance thresholds.
                </p>
                <div className="p-3 bg-slate-900 rounded font-mono text-xs text-rose-300">
                  Example: Detected Defect: Broken | Quality: Defective / Lower Quality | Confidence: 94%
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStage === 7 && (
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Stage 07: Research Evaluation (scikit-learn & SciPy / SPSS)</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Model Performance Metrics & Statistical Significance Testing
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Rigorous research evaluation using scikit-learn for classification metrics and SciPy/SPSS for one-way ANOVA hypothesis testing and Tukey's HSD post-hoc tests across 10-fold cross-validation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <span className="text-xs text-slate-400">Accuracy (ResNet50)</span>
                <span className="block text-2xl font-bold font-mono text-emerald-400 mt-1">97.6%</span>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <span className="text-xs text-slate-400">Precision (Macro)</span>
                <span className="block text-2xl font-bold font-mono text-emerald-400 mt-1">97.4%</span>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <span className="text-xs text-slate-400">Recall (Macro)</span>
                <span className="block text-2xl font-bold font-mono text-emerald-400 mt-1">97.2%</span>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <span className="text-xs text-slate-400">One-way ANOVA</span>
                <span className="block text-2xl font-bold font-mono text-emerald-400 mt-1">p &lt; 0.001</span>
                <span className="text-[10px] text-slate-500 font-mono">F = 18.42</span>
              </div>
            </div>
          </div>
        )}

        {activeStage === 8 && (
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <Database className="w-3.5 h-3.5" />
              <span>Stage 08: Relational Database Storage (PostgreSQL)</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              PostgreSQL Relational Schema for Rice Quality Auditing
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every analyzed image and individual detected grain is permanently logged into PostgreSQL with exact bounding box coordinates, morphometrics, defect probabilities, and timestamps.
            </p>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre className="text-emerald-400">-- Core PostgreSQL Relational Schema</pre>
              <pre className="mt-2 text-slate-300">
{`CREATE TABLE analysis_records (
    id VARCHAR(64) PRIMARY KEY,
    sample_name VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    image_reference VARCHAR(512) NOT NULL,
    total_grains INTEGER NOT NULL,
    good_count INTEGER NOT NULL,
    defective_count INTEGER NOT NULL,
    primary_defect VARCHAR(32) NOT NULL,
    overall_quality VARCHAR(32) NOT NULL,
    mean_confidence NUMERIC(5, 2) NOT NULL,
    model_used VARCHAR(64) NOT NULL,
    processing_time_ms NUMERIC(6, 2) NOT NULL,
    iso_standard_grade VARCHAR(64) NOT NULL
);

CREATE TABLE grain_detections (
    id SERIAL PRIMARY KEY,
    record_id VARCHAR(64) REFERENCES analysis_records(id) ON DELETE CASCADE,
    grain_index INTEGER NOT NULL,
    bbox_x NUMERIC(6, 2) NOT NULL,
    bbox_y NUMERIC(6, 2) NOT NULL,
    bbox_w NUMERIC(6, 2) NOT NULL,
    bbox_h NUMERIC(6, 2) NOT NULL,
    length_mm NUMERIC(5, 2) NOT NULL,
    width_mm NUMERIC(5, 2) NOT NULL,
    aspect_ratio NUMERIC(5, 2) NOT NULL,
    defect_type VARCHAR(32) NOT NULL,
    quality_result VARCHAR(32) NOT NULL,
    confidence NUMERIC(5, 2) NOT NULL
);`}
              </pre>
            </div>
          </div>
        )}

        {/* Pipeline Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-xs mt-6">
          <button
            disabled={activeStage === 1}
            onClick={() => setActiveStage((s) => Math.max(1, s - 1))}
            className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none"
          >
            Previous Stage
          </button>
          <span className="text-slate-500 font-mono">
            Stage {activeStage} of {stages.length}
          </span>
          <button
            disabled={activeStage === stages.length}
            onClick={() => setActiveStage((s) => Math.min(stages.length, s + 1))}
            className="px-3 py-1.5 rounded bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1"
          >
            <span>Next Stage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
