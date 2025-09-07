import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ControlPanel } from './components/ControlPanel';
import { ResultDisplay } from './components/ResultDisplay';
import { editImage, generateImage } from './services/geminiService';
import type { ImageData } from './types';
import { POSE_PRESETS, VIEW_PRESETS, GENDER_PRESETS, NATIONALITY_PRESETS, ASPECT_RATIO_PRESETS } from './constants';

function App() {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [initialSessionImage, setInitialSessionImage] = useState<string | null>(null);
  const [remixHistory, setRemixHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const [identityState, setIdentityState] = useState({
    gender: GENDER_PRESETS[0].value,
    nationality: NATIONALITY_PRESETS[0].value,
    age: '25',
  });

  const [styleState, setStyleState] = useState({
    pose: POSE_PRESETS[0].value,
    hair: '',
    top: '',
    bottom: '',
    shoe: '',
  });
  const [view, setView] = useState<string>(VIEW_PRESETS[0].value);
  const [background, setBackground] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<string>(ASPECT_RATIO_PRESETS[0].value);
  
  const handleImageReady = useCallback((imageData: ImageData) => {
    setOriginalImage(imageData);
    setInitialSessionImage(imageData.dataUrl);
    setRemixHistory([]);
    setError(null);
  }, []);

  const handleUseAsOriginal = useCallback((imageDataUrl: string) => {
    const [header, base64] = imageDataUrl.split(',');
    if (!header || !base64) {
      setError("Failed to process the generated image. Please try again.");
      return;
    }
    const mimeTypeMatch = header.match(/data:(.*);base64/);
    const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/png';
    
    setOriginalImage({ base64, mimeType, dataUrl: imageDataUrl });
    setError(null);
  }, []);

  const handleGenerate = useCallback(async () => {
    const identityPrompt = [
      identityState.age ? `${identityState.age} years old` : '',
      identityState.nationality,
      identityState.gender,
    ].filter(Boolean).join(', ');

    const poseAndStylePrompt = [
      styleState.pose,
      styleState.hair,
      styleState.top,
      styleState.bottom,
      styleState.shoe
    ].filter(Boolean).join(', ');

    const backgroundPrompt = background ? `Background: ${background}.` : '';
    const viewPrompt = view ? `View: ${view}.` : '';

    if (originalImage) {
      if (!identityPrompt.trim() && !poseAndStylePrompt.trim() && !view.trim() && !background.trim()) {
        setError("For remixing, please provide identity, style/pose, background, or view instructions.");
        return;
      }
    } else {
      if (!identityPrompt.trim() && !poseAndStylePrompt.trim()) {
        setError("Please provide some description (identity, pose, hair, clothing) to generate an image.");
        return;
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      let result;
      if (originalImage) {
        const editPrompt = [
          identityPrompt ? `Identity: ${identityPrompt}.` : '',
          poseAndStylePrompt ? `Style and Pose: ${poseAndStylePrompt}.` : '',
          backgroundPrompt,
          viewPrompt
        ].filter(Boolean).join(' ');
        result = await editImage(originalImage, editPrompt);
        if (result.image) {
          setRemixHistory(prev => [...prev, result.image!]);
        }
      } else {
        const generatePrompt = `A person, ${identityPrompt}, ${poseAndStylePrompt}. ${backgroundPrompt} ${viewPrompt}`;
        result = await generateImage(generatePrompt, aspectRatio);
        if (result.image) {
          setInitialSessionImage(result.image);
          setRemixHistory([]);
          handleUseAsOriginal(result.image);
        }
      }
      
      if (!result.image) {
        throw new Error("The AI failed to return an image.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, identityState, styleState, view, background, aspectRatio, handleUseAsOriginal]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
            AI Persona Remixer
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Transform your image with the power of Gemini AI
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8">
            <ImageUploader onImageReady={handleImageReady} originalImage={originalImage} />
            <ControlPanel
              identityState={identityState}
              styleState={styleState}
              view={view}
              background={background}
              aspectRatio={aspectRatio}
              isGenerating={isLoading}
              hasImage={!!originalImage}
              onIdentityStateChange={setIdentityState}
              onStyleStateChange={setStyleState}
              onViewChange={setView}
              onBackgroundChange={setBackground}
              onAspectRatioChange={setAspectRatio}
              onGenerate={handleGenerate}
            />
          </div>
          <div>
            <ResultDisplay
              isLoading={isLoading}
              error={error}
              initialImage={initialSessionImage}
              history={remixHistory}
              onUseAsOriginal={handleUseAsOriginal}
              onViewFullscreen={setFullscreenImage}
            />
          </div>
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Powered by Google Gemini. Built with React & Tailwind CSS.</p>
        </footer>
      </div>

      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 cursor-zoom-out"
          onClick={() => setFullscreenImage(null)}
        >
          <img src={fullscreenImage} alt="Fullscreen view" className="max-h-full max-w-full object-contain" />
          <button className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 transition-colors" title="Close fullscreen">&times;</button>
        </div>
      )}
    </div>
  );
}

export default App;