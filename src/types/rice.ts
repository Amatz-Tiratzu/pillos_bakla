export type DefectType = 'None' | 'Broken' | 'Discolored' | 'Cracked' | 'Chalky';

export type QualityClassification = 'Good Quality' | 'Defective / Lower Quality';

export type ModelType = 'Custom CNN' | 'MobileNetV2' | 'ResNet50';

export interface GrainDetection {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  lengthMm: number;
  widthMm: number;
  aspectRatio: number;
  chalkyAreaPercent: number;
  discolorationScore: number; // Delta E or HSV variance
  crackScore: number; // High-frequency edge gradient inside grain
  primaryDefect: DefectType;
  quality: QualityClassification;
  confidence: number;
  defectProbabilities: Record<DefectType, number>;
  contour?: [number, number][];
}

export interface AnalysisSummary {
  totalGrains: number;
  goodCount: number;
  brokenCount: number;
  discoloredCount: number;
  crackedCount: number;
  chalkyCount: number;
  goodPercentage: number;
  defectivePercentage: number;
  primarySampleDefect: DefectType;
  overallQuality: QualityClassification;
  meanConfidence: number;
  modelUsed: ModelType;
  processingTimeMs: number;
  isoGrade: 'Grade 1 (Premium)' | 'Grade 2 (Standard)' | 'Grade 3 (Commercial)' | 'Below Standard (Defective)';
}

export interface AnalysisRecord {
  id: string;
  sampleName: string;
  timestamp: string;
  imageUrl: string;
  imageSource: 'lightbox_preset' | 'upload' | 'camera';
  summary: AnalysisSummary;
  grains: GrainDetection[];
  cameraSettings: {
    sensor: string;
    resolution: string;
    lighting: string;
    calibrationFactorMmPerPx: number;
    shutterSpeed: string;
    iso: number;
  };
}

export interface ModelMetric {
  modelName: ModelType;
  parameters: string;
  inferenceTimeMs: number;
  modelSizeMb: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  perClassF1: Record<DefectType, number>;
  confusionMatrix: number[][]; // 5x5 matrix
  trainingHardware: string;
}

export interface AnovaResult {
  fStatistic: number;
  pValue: number;
  significant: boolean;
  tukeyHSD: {
    comparison: string;
    meanDifference: number;
    pAdjusted: number;
    rejectNull: boolean;
  }[];
}
