import { AnalysisRecord, DefectType, ModelMetric, AnovaResult } from '../types/rice';

// Import our generated assets
const LIGHTBOX_TRAY_IMAGE = '/src/assets/images/rice_lightbox_tray_sample_1790817493706.jpg';
const MACRO_DEFECTS_IMAGE = '/src/assets/images/rice_macro_defects_1790817513107.jpg';
const RIG_IMAGE = '/src/assets/images/rice_inspection_rig_1790817527423.jpg';

export { LIGHTBOX_TRAY_IMAGE, MACRO_DEFECTS_IMAGE, RIG_IMAGE };

export const DEFECT_COLORS: Record<DefectType, { border: string; bg: string; text: string; badge: string }> = {
  None: {
    border: 'border-emerald-500',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    badge: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
  },
  Broken: {
    border: 'border-amber-500',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    badge: 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
  },
  Discolored: {
    border: 'border-rose-500',
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    badge: 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
  },
  Cracked: {
    border: 'border-cyan-500',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    badge: 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'
  },
  Chalky: {
    border: 'border-purple-500',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    badge: 'bg-purple-950/80 text-purple-300 border border-purple-500/30'
  }
};

export const DEFECT_DESCRIPTIONS: Record<DefectType, string> = {
  None: 'No visible physical, textural, or color defect. Translucent vitreous endosperm with intact whole kernel geometry.',
  Broken: 'Kernel is fractured or severed with length less than 75% of normal whole grain length.',
  Discolored: 'Abnormal pigmentation (reddish, brown, peck, or black spots) caused by fungal infection, insects, or moisture.',
  Cracked: 'Visible internal stress cracks or transversal/longitudinal micro-fissures caused by rapid moisture sorption or drying.',
  Chalky: 'Opaque, milky-white chalky core or belly covering more than 20% of grain area due to loose starch granule packing.'
};

export const SAMPLE_PRESETS: AnalysisRecord[] = [
  {
    id: 'REC-2026-0814',
    sampleName: 'Sample #01 – Broken Grain Analysis',
    timestamp: '2026-09-30 14:22:18 UTC',
    imageUrl: MACRO_DEFECTS_IMAGE,
    imageSource: 'lightbox_preset',
    summary: {
      totalGrains: 1,
      goodCount: 0,
      brokenCount: 1,
      discoloredCount: 0,
      crackedCount: 0,
      chalkyCount: 0,
      goodPercentage: 0,
      defectivePercentage: 100,
      primarySampleDefect: 'Broken',
      overallQuality: 'Defective / Lower Quality',
      meanConfidence: 94,
      modelUsed: 'ResNet50',
      processingTimeMs: 27.4,
      isoGrade: 'Below Standard (Defective)'
    },
    cameraSettings: {
      sensor: 'Sony IMX477 12.3MP CMOS',
      resolution: '4056 × 3040 px',
      lighting: 'Custom 5500K CRI 98 LED Light Box',
      calibrationFactorMmPerPx: 0.0238,
      shutterSpeed: '1/120s',
      iso: 100
    },
    grains: [
      {
        id: 1,
        x: 48,
        y: 45,
        width: 14,
        height: 16,
        lengthMm: 3.42,
        widthMm: 2.15,
        aspectRatio: 1.59,
        chalkyAreaPercent: 8.2,
        discolorationScore: 0.04,
        crackScore: 0.12,
        primaryDefect: 'Broken',
        quality: 'Defective / Lower Quality',
        confidence: 94,
        defectProbabilities: {
          None: 0.02,
          Broken: 0.94,
          Discolored: 0.01,
          Cracked: 0.02,
          Chalky: 0.01
        }
      }
    ]
  },
  {
    id: 'REC-2026-0815',
    sampleName: 'Sample #02 – Pristine Whole Grain',
    timestamp: '2026-09-30 14:35:40 UTC',
    imageUrl: MACRO_DEFECTS_IMAGE,
    imageSource: 'lightbox_preset',
    summary: {
      totalGrains: 1,
      goodCount: 1,
      brokenCount: 0,
      discoloredCount: 0,
      crackedCount: 0,
      chalkyCount: 0,
      goodPercentage: 100,
      defectivePercentage: 0,
      primarySampleDefect: 'None',
      overallQuality: 'Good Quality',
      meanConfidence: 97,
      modelUsed: 'ResNet50',
      processingTimeMs: 26.8,
      isoGrade: 'Grade 1 (Premium)'
    },
    cameraSettings: {
      sensor: 'Sony IMX477 12.3MP CMOS',
      resolution: '4056 × 3040 px',
      lighting: 'Custom 5500K CRI 98 LED Light Box',
      calibrationFactorMmPerPx: 0.0238,
      shutterSpeed: '1/120s',
      iso: 100
    },
    grains: [
      {
        id: 1,
        x: 22,
        y: 40,
        width: 15,
        height: 25,
        lengthMm: 6.84,
        widthMm: 2.10,
        aspectRatio: 3.25,
        chalkyAreaPercent: 2.1,
        discolorationScore: 0.02,
        crackScore: 0.05,
        primaryDefect: 'None',
        quality: 'Good Quality',
        confidence: 97,
        defectProbabilities: {
          None: 0.97,
          Broken: 0.01,
          Discolored: 0.01,
          Cracked: 0.005,
          Chalky: 0.005
        }
      }
    ]
  },
  {
    id: 'REC-2026-0816',
    sampleName: 'Sample #03 – Chalky Kernel Sample',
    timestamp: '2026-09-30 14:48:12 UTC',
    imageUrl: MACRO_DEFECTS_IMAGE,
    imageSource: 'lightbox_preset',
    summary: {
      totalGrains: 1,
      goodCount: 0,
      brokenCount: 0,
      discoloredCount: 0,
      crackedCount: 0,
      chalkyCount: 1,
      goodPercentage: 0,
      defectivePercentage: 100,
      primarySampleDefect: 'Chalky',
      overallQuality: 'Defective / Lower Quality',
      meanConfidence: 95,
      modelUsed: 'ResNet50',
      processingTimeMs: 28.1,
      isoGrade: 'Below Standard (Defective)'
    },
    cameraSettings: {
      sensor: 'Sony IMX477 12.3MP CMOS',
      resolution: '4056 × 3040 px',
      lighting: 'Custom 5500K CRI 98 LED Light Box',
      calibrationFactorMmPerPx: 0.0238,
      shutterSpeed: '1/120s',
      iso: 100
    },
    grains: [
      {
        id: 1,
        x: 35,
        y: 38,
        width: 16,
        height: 26,
        lengthMm: 6.62,
        widthMm: 2.22,
        aspectRatio: 2.98,
        chalkyAreaPercent: 46.5,
        discolorationScore: 0.03,
        crackScore: 0.04,
        primaryDefect: 'Chalky',
        quality: 'Defective / Lower Quality',
        confidence: 95,
        defectProbabilities: {
          None: 0.03,
          Broken: 0.01,
          Discolored: 0.01,
          Cracked: 0.00,
          Chalky: 0.95
        }
      }
    ]
  },
  {
    id: 'REC-2026-0817',
    sampleName: 'Sample #04 – Cracked Micro-Fissured Grain',
    timestamp: '2026-09-30 15:02:55 UTC',
    imageUrl: MACRO_DEFECTS_IMAGE,
    imageSource: 'lightbox_preset',
    summary: {
      totalGrains: 1,
      goodCount: 0,
      brokenCount: 0,
      discoloredCount: 0,
      crackedCount: 1,
      chalkyCount: 0,
      goodPercentage: 0,
      defectivePercentage: 100,
      primarySampleDefect: 'Cracked',
      overallQuality: 'Defective / Lower Quality',
      meanConfidence: 92,
      modelUsed: 'ResNet50',
      processingTimeMs: 29.5,
      isoGrade: 'Below Standard (Defective)'
    },
    cameraSettings: {
      sensor: 'Sony IMX477 12.3MP CMOS',
      resolution: '4056 × 3040 px',
      lighting: 'Custom 5500K CRI 98 LED Light Box',
      calibrationFactorMmPerPx: 0.0238,
      shutterSpeed: '1/120s',
      iso: 100
    },
    grains: [
      {
        id: 1,
        x: 75,
        y: 42,
        width: 15,
        height: 24,
        lengthMm: 6.55,
        widthMm: 2.08,
        aspectRatio: 3.15,
        chalkyAreaPercent: 4.0,
        discolorationScore: 0.05,
        crackScore: 0.88,
        primaryDefect: 'Cracked',
        quality: 'Defective / Lower Quality',
        confidence: 92,
        defectProbabilities: {
          None: 0.04,
          Broken: 0.03,
          Discolored: 0.01,
          Cracked: 0.92,
          Chalky: 0.00
        }
      }
    ]
  },
  {
    id: 'REC-2026-0818',
    sampleName: 'Sample #05 – Discolored Grain Sample',
    timestamp: '2026-09-30 15:15:30 UTC',
    imageUrl: MACRO_DEFECTS_IMAGE,
    imageSource: 'lightbox_preset',
    summary: {
      totalGrains: 1,
      goodCount: 0,
      brokenCount: 0,
      discoloredCount: 1,
      crackedCount: 0,
      chalkyCount: 0,
      goodPercentage: 0,
      defectivePercentage: 100,
      primarySampleDefect: 'Discolored',
      overallQuality: 'Defective / Lower Quality',
      meanConfidence: 96,
      modelUsed: 'ResNet50',
      processingTimeMs: 27.2,
      isoGrade: 'Below Standard (Defective)'
    },
    cameraSettings: {
      sensor: 'Sony IMX477 12.3MP CMOS',
      resolution: '4056 × 3040 px',
      lighting: 'Custom 5500K CRI 98 LED Light Box',
      calibrationFactorMmPerPx: 0.0238,
      shutterSpeed: '1/120s',
      iso: 100
    },
    grains: [
      {
        id: 1,
        x: 62,
        y: 41,
        width: 15,
        height: 25,
        lengthMm: 6.70,
        widthMm: 2.14,
        aspectRatio: 3.13,
        chalkyAreaPercent: 3.5,
        discolorationScore: 0.79,
        crackScore: 0.08,
        primaryDefect: 'Discolored',
        quality: 'Defective / Lower Quality',
        confidence: 96,
        defectProbabilities: {
          None: 0.02,
          Broken: 0.01,
          Discolored: 0.96,
          Cracked: 0.01,
          Chalky: 0.00
        }
      }
    ]
  },
  {
    id: 'REC-2026-0819',
    sampleName: 'Sample #06 – 12MP Lightbox Tray Batch (24 Grains)',
    timestamp: '2026-09-30 16:10:04 UTC',
    imageUrl: LIGHTBOX_TRAY_IMAGE,
    imageSource: 'lightbox_preset',
    summary: {
      totalGrains: 24,
      goodCount: 16,
      brokenCount: 3,
      discoloredCount: 2,
      crackedCount: 1,
      chalkyCount: 2,
      goodPercentage: 66.7,
      defectivePercentage: 33.3,
      primarySampleDefect: 'Broken',
      overallQuality: 'Defective / Lower Quality',
      meanConfidence: 94.6,
      modelUsed: 'ResNet50',
      processingTimeMs: 48.6,
      isoGrade: 'Grade 3 (Commercial)'
    },
    cameraSettings: {
      sensor: 'Sony IMX477 12.3MP CMOS',
      resolution: '4056 × 3040 px',
      lighting: 'Custom 5500K CRI 98 LED Light Box',
      calibrationFactorMmPerPx: 0.0238,
      shutterSpeed: '1/120s',
      iso: 100
    },
    grains: [
      // Batch of 24 realistic segmented grains placed on tray coordinates
      { id: 1, x: 12, y: 18, width: 8, height: 12, lengthMm: 6.82, widthMm: 2.12, aspectRatio: 3.22, chalkyAreaPercent: 2.1, discolorationScore: 0.03, crackScore: 0.04, primaryDefect: 'None', quality: 'Good Quality', confidence: 97, defectProbabilities: { None: 0.97, Broken: 0.01, Discolored: 0.01, Cracked: 0.005, Chalky: 0.005 } },
      { id: 2, x: 23, y: 15, width: 7, height: 11, lengthMm: 6.75, widthMm: 2.05, aspectRatio: 3.29, chalkyAreaPercent: 1.8, discolorationScore: 0.02, crackScore: 0.03, primaryDefect: 'None', quality: 'Good Quality', confidence: 98, defectProbabilities: { None: 0.98, Broken: 0.01, Discolored: 0.005, Cracked: 0.003, Chalky: 0.002 } },
      { id: 3, x: 34, y: 20, width: 6, height: 8, lengthMm: 3.65, widthMm: 2.18, aspectRatio: 1.67, chalkyAreaPercent: 3.2, discolorationScore: 0.05, crackScore: 0.12, primaryDefect: 'Broken', quality: 'Defective / Lower Quality', confidence: 95, defectProbabilities: { None: 0.02, Broken: 0.95, Discolored: 0.01, Cracked: 0.01, Chalky: 0.01 } },
      { id: 4, x: 45, y: 16, width: 8, height: 13, lengthMm: 6.90, widthMm: 2.15, aspectRatio: 3.21, chalkyAreaPercent: 2.4, discolorationScore: 0.01, crackScore: 0.02, primaryDefect: 'None', quality: 'Good Quality', confidence: 96, defectProbabilities: { None: 0.96, Broken: 0.01, Discolored: 0.01, Cracked: 0.01, Chalky: 0.01 } },
      { id: 5, x: 57, y: 19, width: 8, height: 12, lengthMm: 6.68, widthMm: 2.20, aspectRatio: 3.04, chalkyAreaPercent: 38.4, discolorationScore: 0.04, crackScore: 0.05, primaryDefect: 'Chalky', quality: 'Defective / Lower Quality', confidence: 93, defectProbabilities: { None: 0.04, Broken: 0.01, Discolored: 0.01, Cracked: 0.01, Chalky: 0.93 } },
      { id: 6, x: 70, y: 17, width: 8, height: 12, lengthMm: 6.88, widthMm: 2.09, aspectRatio: 3.29, chalkyAreaPercent: 1.5, discolorationScore: 0.02, crackScore: 0.02, primaryDefect: 'None', quality: 'Good Quality', confidence: 97, defectProbabilities: { None: 0.97, Broken: 0.01, Discolored: 0.01, Cracked: 0.005, Chalky: 0.005 } },
      { id: 7, x: 82, y: 22, width: 8, height: 13, lengthMm: 6.72, widthMm: 2.11, aspectRatio: 3.18, chalkyAreaPercent: 2.8, discolorationScore: 0.68, crackScore: 0.06, primaryDefect: 'Discolored', quality: 'Defective / Lower Quality', confidence: 94, defectProbabilities: { None: 0.03, Broken: 0.01, Discolored: 0.94, Cracked: 0.01, Chalky: 0.01 } },
      { id: 8, x: 15, y: 38, width: 8, height: 12, lengthMm: 6.80, widthMm: 2.14, aspectRatio: 3.18, chalkyAreaPercent: 2.0, discolorationScore: 0.03, crackScore: 0.03, primaryDefect: 'None', quality: 'Good Quality', confidence: 96, defectProbabilities: { None: 0.96, Broken: 0.01, Discolored: 0.01, Cracked: 0.01, Chalky: 0.01 } },
      { id: 9, x: 28, y: 36, width: 7, height: 8, lengthMm: 3.52, widthMm: 2.15, aspectRatio: 1.64, chalkyAreaPercent: 4.1, discolorationScore: 0.04, crackScore: 0.08, primaryDefect: 'Broken', quality: 'Defective / Lower Quality', confidence: 93, defectProbabilities: { None: 0.03, Broken: 0.93, Discolored: 0.02, Cracked: 0.01, Chalky: 0.01 } },
      { id: 10, x: 39, y: 39, width: 8, height: 13, lengthMm: 6.92, widthMm: 2.08, aspectRatio: 3.33, chalkyAreaPercent: 1.9, discolorationScore: 0.02, crackScore: 0.04, primaryDefect: 'None', quality: 'Good Quality', confidence: 98, defectProbabilities: { None: 0.98, Broken: 0.005, Discolored: 0.005, Cracked: 0.005, Chalky: 0.005 } },
      { id: 11, x: 51, y: 37, width: 8, height: 12, lengthMm: 6.64, widthMm: 2.10, aspectRatio: 3.16, chalkyAreaPercent: 3.0, discolorationScore: 0.04, crackScore: 0.84, primaryDefect: 'Cracked', quality: 'Defective / Lower Quality', confidence: 91, defectProbabilities: { None: 0.05, Broken: 0.02, Discolored: 0.01, Cracked: 0.91, Chalky: 0.01 } },
      { id: 12, x: 63, y: 40, width: 8, height: 13, lengthMm: 6.85, widthMm: 2.13, aspectRatio: 3.22, chalkyAreaPercent: 2.2, discolorationScore: 0.02, crackScore: 0.03, primaryDefect: 'None', quality: 'Good Quality', confidence: 97, defectProbabilities: { None: 0.97, Broken: 0.01, Discolored: 0.01, Cracked: 0.005, Chalky: 0.005 } },
      { id: 13, x: 75, y: 38, width: 8, height: 12, lengthMm: 6.78, widthMm: 2.16, aspectRatio: 3.14, chalkyAreaPercent: 2.7, discolorationScore: 0.03, crackScore: 0.02, primaryDefect: 'None', quality: 'Good Quality', confidence: 95, defectProbabilities: { None: 0.95, Broken: 0.01, Discolored: 0.01, Cracked: 0.015, Chalky: 0.015 } },
      { id: 14, x: 86, y: 41, width: 8, height: 12, lengthMm: 6.69, widthMm: 2.12, aspectRatio: 3.16, chalkyAreaPercent: 42.1, discolorationScore: 0.03, crackScore: 0.04, primaryDefect: 'Chalky', quality: 'Defective / Lower Quality', confidence: 94, defectProbabilities: { None: 0.03, Broken: 0.01, Discolored: 0.01, Cracked: 0.01, Chalky: 0.94 } },
      { id: 15, x: 18, y: 56, width: 8, height: 13, lengthMm: 6.86, widthMm: 2.11, aspectRatio: 3.25, chalkyAreaPercent: 1.7, discolorationScore: 0.02, crackScore: 0.03, primaryDefect: 'None', quality: 'Good Quality', confidence: 97, defectProbabilities: { None: 0.97, Broken: 0.01, Discolored: 0.01, Cracked: 0.005, Chalky: 0.005 } },
      { id: 16, x: 30, y: 58, width: 8, height: 12, lengthMm: 6.73, widthMm: 2.15, aspectRatio: 3.13, chalkyAreaPercent: 2.3, discolorationScore: 0.02, crackScore: 0.02, primaryDefect: 'None', quality: 'Good Quality', confidence: 96, defectProbabilities: { None: 0.96, Broken: 0.01, Discolored: 0.01, Cracked: 0.01, Chalky: 0.01 } },
      { id: 17, x: 42, y: 55, width: 8, height: 13, lengthMm: 6.81, widthMm: 2.09, aspectRatio: 3.26, chalkyAreaPercent: 2.0, discolorationScore: 0.03, crackScore: 0.03, primaryDefect: 'None', quality: 'Good Quality', confidence: 98, defectProbabilities: { None: 0.98, Broken: 0.005, Discolored: 0.005, Cracked: 0.005, Chalky: 0.005 } },
      { id: 18, x: 54, y: 57, width: 8, height: 12, lengthMm: 6.77, widthMm: 2.14, aspectRatio: 3.16, chalkyAreaPercent: 3.1, discolorationScore: 0.72, crackScore: 0.05, primaryDefect: 'Discolored', quality: 'Defective / Lower Quality', confidence: 95, defectProbabilities: { None: 0.02, Broken: 0.01, Discolored: 0.95, Cracked: 0.01, Chalky: 0.01 } },
      { id: 19, x: 67, y: 58, width: 8, height: 12, lengthMm: 6.89, widthMm: 2.12, aspectRatio: 3.25, chalkyAreaPercent: 1.9, discolorationScore: 0.02, crackScore: 0.02, primaryDefect: 'None', quality: 'Good Quality', confidence: 97, defectProbabilities: { None: 0.97, Broken: 0.01, Discolored: 0.01, Cracked: 0.005, Chalky: 0.005 } },
      { id: 20, x: 79, y: 59, width: 7, height: 9, lengthMm: 3.80, widthMm: 2.16, aspectRatio: 1.76, chalkyAreaPercent: 3.8, discolorationScore: 0.04, crackScore: 0.09, primaryDefect: 'Broken', quality: 'Defective / Lower Quality', confidence: 94, defectProbabilities: { None: 0.03, Broken: 0.94, Discolored: 0.01, Cracked: 0.01, Chalky: 0.01 } },
      { id: 21, x: 22, y: 76, width: 8, height: 12, lengthMm: 6.84, widthMm: 2.10, aspectRatio: 3.26, chalkyAreaPercent: 2.2, discolorationScore: 0.02, crackScore: 0.03, primaryDefect: 'None', quality: 'Good Quality', confidence: 96, defectProbabilities: { None: 0.96, Broken: 0.01, Discolored: 0.01, Cracked: 0.01, Chalky: 0.01 } },
      { id: 22, x: 35, y: 77, width: 8, height: 13, lengthMm: 6.79, widthMm: 2.13, aspectRatio: 3.19, chalkyAreaPercent: 1.8, discolorationScore: 0.03, crackScore: 0.02, primaryDefect: 'None', quality: 'Good Quality', confidence: 97, defectProbabilities: { None: 0.97, Broken: 0.01, Discolored: 0.01, Cracked: 0.005, Chalky: 0.005 } },
      { id: 23, x: 49, y: 75, width: 8, height: 12, lengthMm: 6.88, widthMm: 2.11, aspectRatio: 3.26, chalkyAreaPercent: 2.5, discolorationScore: 0.01, crackScore: 0.03, primaryDefect: 'None', quality: 'Good Quality', confidence: 98, defectProbabilities: { None: 0.98, Broken: 0.005, Discolored: 0.005, Cracked: 0.005, Chalky: 0.005 } },
      { id: 24, x: 62, y: 78, width: 8, height: 12, lengthMm: 6.74, widthMm: 2.15, aspectRatio: 3.13, chalkyAreaPercent: 2.0, discolorationScore: 0.02, crackScore: 0.02, primaryDefect: 'None', quality: 'Good Quality', confidence: 96, defectProbabilities: { None: 0.96, Broken: 0.01, Discolored: 0.01, Cracked: 0.01, Chalky: 0.01 } }
    ]
  }
];

export const MODEL_BENCHMARKS: ModelMetric[] = [
  {
    modelName: 'Custom CNN',
    parameters: '1,847,365',
    inferenceTimeMs: 9.4,
    modelSizeMb: 7.4,
    accuracy: 93.4,
    precision: 93.1,
    recall: 92.8,
    f1Score: 92.9,
    trainingHardware: 'AMD Radeon RX 7900 XTX via ROCm 6.2 (DirectML supported)',
    perClassF1: {
      None: 95.8,
      Broken: 96.2,
      Discolored: 92.4,
      Cracked: 88.6,
      Chalky: 91.7
    },
    // Classes order: None, Broken, Discolored, Cracked, Chalky
    // Total test set: 2,500 samples (500 per class)
    confusionMatrix: [
      [478, 5, 4, 6, 7],      // True None
      [4, 481, 3, 8, 4],      // True Broken
      [8, 2, 459, 12, 19],    // True Discolored
      [14, 15, 9, 442, 20],   // True Cracked (lower recall due to subtle hairline fissures)
      [10, 3, 12, 18, 457]    // True Chalky
    ]
  },
  {
    modelName: 'MobileNetV2',
    parameters: '3,538,984',
    inferenceTimeMs: 14.2,
    modelSizeMb: 14.2,
    accuracy: 95.8,
    precision: 95.6,
    recall: 95.4,
    f1Score: 95.5,
    trainingHardware: 'AMD Radeon RX 7900 XTX via ROCm 6.2 / Cloud GPU (NVIDIA A100)',
    perClassF1: {
      None: 97.4,
      Broken: 97.8,
      Discolored: 95.1,
      Cracked: 92.9,
      Chalky: 94.3
    },
    confusionMatrix: [
      [487, 3, 2, 4, 4],
      [2, 489, 2, 4, 3],
      [5, 1, 474, 9, 11],
      [8, 9, 7, 463, 13],
      [6, 2, 7, 12, 473]
    ]
  },
  {
    modelName: 'ResNet50',
    parameters: '25,636,712',
    inferenceTimeMs: 28.5,
    modelSizeMb: 98.5,
    accuracy: 97.6,
    precision: 97.4,
    recall: 97.2,
    f1Score: 97.3,
    trainingHardware: 'AMD Radeon RX 7900 XTX via ROCm 6.2 / Cloud GPU (NVIDIA A100)',
    perClassF1: {
      None: 98.8,
      Broken: 98.9,
      Discolored: 97.2,
      Cracked: 95.4,
      Chalky: 96.3
    },
    confusionMatrix: [
      [494, 2, 1, 1, 2],
      [1, 495, 1, 2, 1],
      [3, 0, 486, 5, 6],
      [4, 5, 4, 477, 10],
      [3, 1, 4, 6, 486]
    ]
  }
];

export const ANOVA_EVALUATION: AnovaResult = {
  fStatistic: 18.42,
  pValue: 0.000042, // p < 0.001
  significant: true,
  tukeyHSD: [
    {
      comparison: 'ResNet50 vs Custom CNN',
      meanDifference: 4.20,
      pAdjusted: 0.0001,
      rejectNull: true
    },
    {
      comparison: 'ResNet50 vs MobileNetV2',
      meanDifference: 1.80,
      pAdjusted: 0.0384,
      rejectNull: true
    },
    {
      comparison: 'MobileNetV2 vs Custom CNN',
      meanDifference: 2.40,
      pAdjusted: 0.0089,
      rejectNull: true
    }
  ]
};

export const INITIAL_DATABASE_RECORDS = [
  {
    id: 'REC-2026-0814',
    sample_name: 'Sample #01 – Broken Grain Analysis',
    captured_at: '2026-09-30 14:22:18',
    total_grains: 1,
    good_count: 0,
    defective_count: 1,
    primary_defect: 'Broken',
    overall_quality: 'Defective / Lower Quality',
    confidence: 0.94,
    model_name: 'ResNet50',
    processing_time_ms: 27.4,
    iso_standard_grade: 'Below Standard (Defective)'
  },
  {
    id: 'REC-2026-0815',
    sample_name: 'Sample #02 – Pristine Whole Grain',
    captured_at: '2026-09-30 14:35:40',
    total_grains: 1,
    good_count: 1,
    defective_count: 0,
    primary_defect: 'None',
    overall_quality: 'Good Quality',
    confidence: 0.97,
    model_name: 'ResNet50',
    processing_time_ms: 26.8,
    iso_standard_grade: 'Grade 1 (Premium)'
  },
  {
    id: 'REC-2026-0816',
    sample_name: 'Sample #03 – Chalky Kernel Sample',
    captured_at: '2026-09-30 14:48:12',
    total_grains: 1,
    good_count: 0,
    defective_count: 1,
    primary_defect: 'Chalky',
    overall_quality: 'Defective / Lower Quality',
    confidence: 0.95,
    model_name: 'ResNet50',
    processing_time_ms: 28.1,
    iso_standard_grade: 'Below Standard (Defective)'
  },
  {
    id: 'REC-2026-0817',
    sample_name: 'Sample #04 – Cracked Micro-Fissured Grain',
    captured_at: '2026-09-30 15:02:55',
    total_grains: 1,
    good_count: 0,
    defective_count: 1,
    primary_defect: 'Cracked',
    overall_quality: 'Defective / Lower Quality',
    confidence: 0.92,
    model_name: 'ResNet50',
    processing_time_ms: 29.5,
    iso_standard_grade: 'Below Standard (Defective)'
  },
  {
    id: 'REC-2026-0818',
    sample_name: 'Sample #05 – Discolored Grain Sample',
    captured_at: '2026-09-30 15:15:30',
    total_grains: 1,
    good_count: 0,
    defective_count: 1,
    primary_defect: 'Discolored',
    overall_quality: 'Defective / Lower Quality',
    confidence: 0.96,
    model_name: 'ResNet50',
    processing_time_ms: 27.2,
    iso_standard_grade: 'Below Standard (Defective)'
  },
  {
    id: 'REC-2026-0819',
    sample_name: 'Sample #06 – 12MP Lightbox Tray Batch (24 Grains)',
    captured_at: '2026-09-30 16:10:04',
    total_grains: 24,
    good_count: 16,
    defective_count: 8,
    primary_defect: 'Broken',
    overall_quality: 'Defective / Lower Quality',
    confidence: 0.946,
    model_name: 'ResNet50',
    processing_time_ms: 48.6,
    iso_standard_grade: 'Grade 3 (Commercial)'
  }
];
