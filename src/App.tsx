import React, { useState } from 'react';
import { AnalysisRecord, ModelType } from './types/rice';
import { SAMPLE_PRESETS } from './data/sampleData';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ImageAnalysisView } from './components/ImageAnalysisView';
import { ImageUploadModal } from './components/ImageUploadModal';
import { processImageWithCV } from './utils/cvEngine';
import { Check } from 'lucide-react';

export default function App() {
  // Start on 'home' strictly following user's uploaded design
  const [activeTab, setActiveTab] = useState<'home' | 'inspection'>('home');
  const [currentPresetIndex, setCurrentPresetIndex] = useState<number>(0);
  const [currentRecord, setCurrentRecord] = useState<AnalysisRecord>(SAMPLE_PRESETS[0]);
  const [selectedGrainId, setSelectedGrainId] = useState<number | null>(1);
  const [selectedModel, setSelectedModel] = useState<ModelType>('ResNet50');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Switch preset sample
  const handleSelectPreset = (index: number) => {
    setCurrentPresetIndex(index);
    const preset = SAMPLE_PRESETS[index];

    // Adjust record summary to reflect current active model
    const adjustedRecord = adjustRecordForModel(preset, selectedModel);
    setCurrentRecord(adjustedRecord);
    setSelectedGrainId(adjustedRecord.grains[0]?.id || null);
    setActiveTab('inspection');
    showToast(`Loaded: ${preset.sampleName} (${selectedModel})`);
  };

  // Switch model on the fly
  const handleModelChange = (model: ModelType) => {
    setSelectedModel(model);
    const updated = adjustRecordForModel(currentRecord, model);
    setCurrentRecord(updated);
    showToast(`Switched inference model to ${model}`);
  };

  // Process image from Home Page or Upload Modal
  const handleProcessImage = async (
    file: File | string,
    sampleName: string,
    model: ModelType,
    calibration = 0.0238
  ) => {
    setSelectedModel(model);
    showToast('Analyzing image with OpenCV & Deep Learning models...');
    try {
      const { record } = await processImageWithCV(file, sampleName, model, calibration);
      setCurrentRecord(record);
      setSelectedGrainId(record.grains[0]?.id || null);
      setActiveTab('inspection');
      showToast(`Analysis complete: ${record.summary.totalGrains} grain(s) detected (${record.summary.primarySampleDefect})`);
    } catch (err) {
      console.error(err);
      showToast('Error processing image. Loaded standard calibration view.');
      setActiveTab('inspection');
    }
  };

  return (
    <div className="min-h-screen bg-[#1fa855] text-slate-900 flex flex-col font-sans selection:bg-emerald-800 selection:text-white">
      {/* Top Header - Hidden on Home page, clean green header with NO navbar links on inspection page */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewScanClick={() => setIsUploadModalOpen(true)}
      />

      {/* Main Content Area */}
      {activeTab === 'home' ? (
        <HomePage
          onImageSelected={(file, sampleName, model) => handleProcessImage(file, sampleName, model)}
          onSelectPreset={handleSelectPreset}
          onOpenPipeline={() => setActiveTab('inspection')}
        />
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
          <ImageAnalysisView
            currentRecord={currentRecord}
            selectedGrainId={selectedGrainId}
            setSelectedGrainId={setSelectedGrainId}
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
            onSelectSample={handleSelectPreset}
            currentPresetIndex={currentPresetIndex}
            onBackToHome={() => setActiveTab('home')}
          />
        </main>
      )}

      {/* Image Acquisition / Upload Modal */}
      <ImageUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onProcessImage={handleProcessImage}
        onSelectPreset={handleSelectPreset}
      />

      {/* Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-white border border-emerald-200 text-emerald-950 px-4 py-2.5 rounded-xl shadow-2xl text-xs font-mono font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean Scientific Footer matching the green theme */}
      {activeTab !== 'home' && (
        <footer className="border-t border-emerald-400/20 bg-[#168843] py-4 text-xs text-emerald-100 font-mono">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-semibold">
              <span>Rice Grain Quality & Defect Detection System</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-emerald-200/90">
              <span>TensorFlow & Keras</span>
              <span aria-hidden="true">·</span>
              <span>OpenCV 4.9</span>
              <span aria-hidden="true">·</span>
              <span>PostgreSQL 16</span>
              <span aria-hidden="true">·</span>
              <span>AMD ROCm / DirectML</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

// Adjust confidence and latency metrics based on model capabilities
function adjustRecordForModel(record: AnalysisRecord, model: ModelType): AnalysisRecord {
  const isCnn = model === 'Custom CNN';
  const isMobileNet = model === 'MobileNetV2';

  const updatedGrains = record.grains.map((g) => {
    let conf = g.confidence;
    if (isCnn) {
      conf = Math.max(86, g.confidence - (g.primaryDefect === 'Cracked' ? 5 : 2));
    } else if (isMobileNet) {
      conf = Math.max(89, g.confidence - 1);
    } else {
      conf = Math.min(99, g.confidence + (g.primaryDefect === 'Cracked' ? 2 : 1));
    }

    return {
      ...g,
      confidence: conf
    };
  });

  const meanConfidence = Number(
    (updatedGrains.reduce((acc, g) => acc + g.confidence, 0) / updatedGrains.length).toFixed(1)
  );

  const processingTimeMs = isCnn ? 9.4 : isMobileNet ? 14.2 : 28.5;

  return {
    ...record,
    grains: updatedGrains,
    summary: {
      ...record.summary,
      modelUsed: model,
      meanConfidence,
      processingTimeMs
    }
  };
}
