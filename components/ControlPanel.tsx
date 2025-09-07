import React from 'react';
import type { Preset } from '../types';
import { 
  POSE_PRESETS, 
  VIEW_PRESETS,
  HAIR_STYLE_PRESETS,
  TOP_PRESETS,
  BOTTOM_PRESETS,
  SHOE_PRESETS,
  GENDER_PRESETS,
  NATIONALITY_PRESETS,
  BACKGROUND_PRESETS,
  ASPECT_RATIO_PRESETS
} from '../constants';

interface ControlPanelProps {
  identityState: {
    gender: string;
    nationality: string;
    age: string;
  };
  styleState: {
    pose: string;
    hair: string;
    top: string;
    bottom: string;
    shoe: string;
  };
  background: string;
  view: string;
  aspectRatio: string;
  isGenerating: boolean;
  hasImage: boolean;
  onIdentityStateChange: React.Dispatch<React.SetStateAction<ControlPanelProps['identityState']>>;
  onStyleStateChange: React.Dispatch<React.SetStateAction<ControlPanelProps['styleState']>>;
  onBackgroundChange: (value: string) => void;
  onViewChange: (value: string) => void;
  onAspectRatioChange: (value: string) => void;
  onGenerate: () => void;
}

const PresetSelector: React.FC<{
  label: string;
  presets: Preset[];
  selectedValue: string;
  onSelect: (value: string) => void;
}> = ({ label, presets, selectedValue, onSelect }) => (
  <div>
    <h3 className="text-lg font-semibold mb-3 text-gray-300">{label}</h3>
    <div className="flex flex-wrap gap-2">
      {presets.map((preset) => (
        <button
          key={preset.label}
          onClick={() => onSelect(preset.value)}
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
            selectedValue === preset.value
              ? 'bg-indigo-500 text-white shadow-md'
              : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
          }`}
        >
          {preset.label}
        </button>
      ))}
    </div>
  </div>
);

export const ControlPanel: React.FC<ControlPanelProps> = ({
  identityState,
  styleState,
  background,
  view,
  aspectRatio,
  isGenerating,
  hasImage,
  onIdentityStateChange,
  onStyleStateChange,
  onBackgroundChange,
  onViewChange,
  onAspectRatioChange,
  onGenerate,
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg h-full flex flex-col space-y-6">
      <h2 className="text-xl font-bold text-center">Customize Your Persona</h2>
      
      <div className="space-y-4">
        <PresetSelector
          label="성별"
          presets={GENDER_PRESETS}
          selectedValue={identityState.gender}
          onSelect={(value) => onIdentityStateChange(prev => ({ ...prev, gender: value }))}
        />
        <PresetSelector
          label="국적"
          presets={NATIONALITY_PRESETS}
          selectedValue={identityState.nationality}
          onSelect={(value) => onIdentityStateChange(prev => ({ ...prev, nationality: value }))}
        />
        <div>
          <label htmlFor="custom-age" className="block text-sm font-medium text-gray-400 mb-1">나이</label>
          <input
            id="custom-age"
            type="number"
            value={identityState.age}
            onChange={(e) => onIdentityStateChange(prev => ({ ...prev, age: e.target.value }))}
            placeholder="e.g., 25"
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="border-t border-gray-700"></div>

      <PresetSelector 
        label="Pose" 
        presets={POSE_PRESETS} 
        selectedValue={styleState.pose} 
        onSelect={(value) => onStyleStateChange(prev => ({ ...prev, pose: value }))} 
      />
      <div>
        <label htmlFor="custom-pose" className="block text-sm font-medium text-gray-400 mb-1">Custom Pose</label>
        <input
          id="custom-pose"
          type="text"
          value={styleState.pose}
          onChange={(e) => onStyleStateChange(prev => ({ ...prev, pose: e.target.value }))}
          placeholder="e.g., heroically standing on a cliff"
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="border-t border-gray-700"></div>

      <div className="space-y-6">
        <div>
          <PresetSelector
            label="머리 스타일"
            presets={HAIR_STYLE_PRESETS}
            selectedValue={styleState.hair}
            onSelect={(value) => onStyleStateChange(prev => ({ ...prev, hair: value }))}
          />
          <div className="mt-2">
            <label htmlFor="custom-hair" className="block text-sm font-medium text-gray-400 mb-1">Custom Hair Style</label>
            <input
              id="custom-hair"
              type="text"
              value={styleState.hair}
              onChange={(e) => onStyleStateChange(prev => ({ ...prev, hair: e.target.value }))}
              placeholder="e.g., shiny silver bob cut"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div>
          <PresetSelector
            label="상의"
            presets={TOP_PRESETS}
            selectedValue={styleState.top}
            onSelect={(value) => onStyleStateChange(prev => ({ ...prev, top: value }))}
          />
          <div className="mt-2">
            <label htmlFor="custom-top" className="block text-sm font-medium text-gray-400 mb-1">Custom Top</label>
            <input
              id="custom-top"
              type="text"
              value={styleState.top}
              onChange={(e) => onStyleStateChange(prev => ({ ...prev, top: e.target.value }))}
              placeholder="e.g., a black turtleneck sweater"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div>
          <PresetSelector
            label="하의"
            presets={BOTTOM_PRESETS}
            selectedValue={styleState.bottom}
            onSelect={(value) => onStyleStateChange(prev => ({ ...prev, bottom: value }))}
          />
          <div className="mt-2">
            <label htmlFor="custom-bottom" className="block text-sm font-medium text-gray-400 mb-1">Custom Bottom</label>
            <input
              id="custom-bottom"
              type="text"
              value={styleState.bottom}
              onChange={(e) => onStyleStateChange(prev => ({ ...prev, bottom: e.target.value }))}
              placeholder="e.g., dark gray wool trousers"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div>
          <PresetSelector
            label="신발"
            presets={SHOE_PRESETS}
            selectedValue={styleState.shoe}
            onSelect={(value) => onStyleStateChange(prev => ({ ...prev, shoe: value }))}
          />
          <div className="mt-2">
            <label htmlFor="custom-shoe" className="block text-sm font-medium text-gray-400 mb-1">Custom Shoes</label>
            <input
              id="custom-shoe"
              type="text"
              value={styleState.shoe}
              onChange={(e) => onStyleStateChange(prev => ({ ...prev, shoe: e.target.value }))}
              placeholder="e.g., brown leather dress shoes"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700"></div>
      
      <PresetSelector 
        label="배경" 
        presets={BACKGROUND_PRESETS} 
        selectedValue={background} 
        onSelect={onBackgroundChange} 
      />
      <div>
        <label htmlFor="custom-background" className="block text-sm font-medium text-gray-400 mb-1">Custom Background</label>
        <input
          id="custom-background"
          type="text"
          value={background}
          onChange={(e) => onBackgroundChange(e.target.value)}
          placeholder="e.g., a serene Japanese garden"
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>


      <div className="border-t border-gray-700"></div>

      <PresetSelector label="View" presets={VIEW_PRESETS} selectedValue={view} onSelect={onViewChange} />
      <div>
        <label htmlFor="custom-view" className="block text-sm font-medium text-gray-400 mb-1">Custom View</label>
        <input
          id="custom-view"
          type="text"
          value={view}
          onChange={(e) => onViewChange(e.target.value)}
          placeholder="e.g., looking over the shoulder"
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="border-t border-gray-700"></div>

      <div className={!hasImage ? '' : 'opacity-50 pointer-events-none'}>
        <PresetSelector
          label="이미지 비율"
          presets={ASPECT_RATIO_PRESETS}
          selectedValue={aspectRatio}
          onSelect={onAspectRatioChange}
        />
        {hasImage && <p className="text-xs text-gray-500 mt-1">이미지 리믹스 시에는 비율을 변경할 수 없습니다.</p>}
      </div>


      <div className="flex-grow"></div>

      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            {hasImage ? 'Remix Persona' : 'Generate Persona'}
          </>
        )}
      </button>
    </div>
  );
};