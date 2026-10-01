import React, { useState, useRef } from 'react';
import { X, Upload, Camera, Sliders, CheckCircle2, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { ModelType } from '../types/rice';
import { SAMPLE_PRESETS } from '../data/sampleData';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProcessImage: (file: File | string, sampleName: string, model: ModelType, calibration: number) => Promise<void>;
  onSelectPreset: (index: number) => void;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onProcessImage,
  onSelectPreset
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'camera' | 'preset'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [sampleName, setSampleName] = useState<string>('Custom Rice Sample Analysis');
  const [selectedModel, setSelectedModel] = useState<ModelType>('ResNet50');
  const [calibration, setCalibration] = useState<number>(0.0238);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSampleName(file.name.replace(/\.[^/.]+$/, ''));
  };

  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: 1280 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `camera_scan_${Date.now()}.jpg`, { type: 'image/jpeg' });
          handleFileSelect(file);
          stopCamera();
          setActiveMode('upload');
        }
      }, 'image/jpeg', 0.95);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const handleAnalyze = async () => {
    if (!selectedFile && !previewUrl) return;
    setIsProcessing(true);
    try {
      await onProcessImage(selectedFile || previewUrl!, sampleName, selectedModel, calibration);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">Acquire & Analyze Rice Image</h3>
            <p className="text-xs text-slate-400">
              Run computer vision preprocessing, segmentation, and defect classification
            </p>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-4 flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => {
              stopCamera();
              setActiveMode('upload');
            }}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
              activeMode === 'upload'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload Image
          </button>

          <button
            onClick={() => {
              setActiveMode('camera');
              startCamera();
            }}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
              activeMode === 'camera'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            Webcam / Camera
          </button>

          <button
            onClick={() => {
              stopCamera();
              setActiveMode('preset');
            }}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
              activeMode === 'preset'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Curated Presets ({SAMPLE_PRESETS.length})
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {activeMode === 'upload' && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />

              {!previewUrl ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-emerald-500/80 rounded-lg p-8 text-center cursor-pointer transition-colors bg-slate-950/60 hover:bg-slate-950"
                >
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-200">
                    Click to select or drag and drop a rice sample image
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Supports high-resolution PNG, JPG, or WEBP from lightbox or flat surface
                  </p>
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950 flex flex-col items-center p-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-56 object-contain rounded"
                  />
                  <div className="w-full flex items-center justify-between pt-2 px-2 text-xs">
                    <span className="text-slate-400 font-mono truncate max-w-xs">{selectedFile?.name || 'Selected Image'}</span>
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                      className="text-rose-400 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeMode === 'camera' && (
            <div className="space-y-3">
              <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-black aspect-video flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {!cameraActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 text-xs text-slate-400">
                    Camera is initializing or permission denied...
                  </div>
                )}
              </div>

              {cameraActive && (
                <div className="flex justify-center">
                  <button
                    onClick={capturePhoto}
                    className="px-6 py-2 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-emerald-400"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Snap Photo</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {activeMode === 'preset' && (
            <div className="grid grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
              {SAMPLE_PRESETS.map((preset, idx) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    onSelectPreset(idx);
                    onClose();
                  }}
                  className="p-3 text-left bg-slate-950 hover:bg-slate-800 rounded border border-slate-800 hover:border-emerald-500/50 transition-colors flex flex-col justify-between"
                >
                  <span className="text-xs font-semibold text-white">{preset.sampleName}</span>
                  <div className="mt-2 text-[11px] font-mono flex items-center justify-between text-slate-400">
                    <span>Defect: <strong className="text-emerald-400">{preset.summary.primarySampleDefect}</strong></span>
                    <span>{preset.summary.meanConfidence}%</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Analysis Settings (Model & Calibration) */}
          {activeMode !== 'preset' && (
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
                <label className="text-slate-400 block text-[11px]">Inference Model</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value as ModelType)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="ResNet50">ResNet50 (Highest Accuracy 97.6%)</option>
                  <option value="MobileNetV2">MobileNetV2 (Balanced 95.8%)</option>
                  <option value="Custom CNN">Custom CNN (Fast Edge 93.4%)</option>
                </select>
              </div>

              <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
                <label className="text-slate-400 block text-[11px]">Optical Calibration</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    step="0.001"
                    value={calibration}
                    onChange={(e) => setCalibration(parseFloat(e.target.value) || 0.0238)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-slate-500 text-[10px] shrink-0">mm/px</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {activeMode !== 'preset' && (
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 text-[11px]">
              {selectedFile ? `${(selectedFile.size / 1024).toFixed(0)} KB ready for CV pipeline` : 'Select an image to continue'}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  stopCamera();
                  onClose();
                }}
                className="px-3 py-1.5 rounded text-slate-400 hover:text-white"
              >
                Cancel
              </button>

              <button
                disabled={(!selectedFile && !previewUrl) || isProcessing}
                onClick={handleAnalyze}
                className="px-4 py-2 rounded bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing Pipeline...</span>
                  </>
                ) : (
                  <span>Run Analysis Pipeline</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
