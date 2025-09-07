import React from 'react';

interface ResultDisplayProps {
  isLoading: boolean;
  error: string | null;
  initialImage: string | null;
  history: string[];
  onUseAsOriginal: (imageDataUrl: string) => void;
  onViewFullscreen: (imageDataUrl: string) => void;
}

const ImageCard: React.FC<{
  imageUrl: string;
  onUse: () => void;
  onView: () => void;
}> = ({ imageUrl, onUse, onView }) => (
  <div className="relative group aspect-square bg-gray-900 rounded-lg overflow-hidden">
    <img src={imageUrl} alt="Generated result" className="w-full h-full object-contain" />
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center gap-4">
      <button onClick={onView} title="전체 화면으로 보기" className="p-3 bg-gray-800 bg-opacity-80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" /></svg>
      </button>
      <button onClick={onUse} title="이 이미지로 계속 편집하기" className="p-3 bg-gray-800 bg-opacity-80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
      </button>
    </div>
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, error, initialImage, history, onUseAsOriginal, onViewFullscreen }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg h-full flex flex-col relative">
      <h2 className="text-xl font-bold mb-4 text-center">Generated Persona</h2>
      <div className="w-full flex-grow rounded-lg flex flex-col overflow-y-auto pr-2">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex flex-col items-center justify-center z-10 rounded-2xl">
            <svg className="animate-spin h-10 w-10 text-indigo-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-semibold text-white">AI is working its magic...</p>
            <p className="text-gray-400">This can take a moment.</p>
          </div>
        )}
        {error && (
          <div className="text-center p-4">
            <p className="text-red-400 font-semibold">An Error Occurred</p>
            <p className="text-red-400 text-sm mt-1">{error}</p>
          </div>
        )}
        {!isLoading && !error && !initialImage && (
          <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <p className="mt-2 font-semibold">Your generated image will appear here</p>
          </div>
        )}

        {initialImage && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-400">최초 이미지</h3>
            <ImageCard 
              imageUrl={initialImage}
              onUse={() => onUseAsOriginal(initialImage)}
              onView={() => onViewFullscreen(initialImage)}
            />
          </div>
        )}
        
        {history.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-400">편집 기록</h3>
            <div className="grid grid-cols-2 gap-4">
              {history.map((image, index) => (
                <ImageCard 
                  key={index}
                  imageUrl={image}
                  onUse={() => onUseAsOriginal(image)}
                  onView={() => onViewFullscreen(image)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};