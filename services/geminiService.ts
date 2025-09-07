import { GoogleGenAI, Modality } from "@google/genai";
import type { ImageData } from '../types';

const getAiClient = (() => {
    let ai: GoogleGenAI | null = null;
    return () => {
        if (ai) {
            return ai;
        }
        const apiKey = process.env.API_KEY;
        if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
            throw new Error("Gemini API key not configured. Please follow the instructions in index.html to add your key.");
        }
        ai = new GoogleGenAI({ apiKey });
        return ai;
    };
})();


export async function editImage(
    originalImage: ImageData,
    prompt: string
): Promise<{ image: string | null, text: string | null }> {
    try {
        const ai = getAiClient();
        const fullPrompt = `Please create a new image of the person from the original photo with the following changes: ${prompt}. It is crucial to maintain the person's facial features and identity from the original image.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: originalImage.base64,
                            mimeType: originalImage.mimeType,
                        },
                    },
                    { text: fullPrompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        let generatedImage: string | null = null;
        let generatedText: string | null = null;

        if (response.candidates && response.candidates.length > 0) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    generatedImage = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
                } else if (part.text) {
                    generatedText = part.text;
                }
            }
        }

        if (!generatedImage) {
            throw new Error("The AI did not return an image. Please try a different prompt.");
        }

        return { image: generatedImage, text: generatedText };
    } catch (error) {
        console.error("Error editing image with Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate image: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the image.");
    }
}

export async function generateImage(
    prompt: string,
    aspectRatio: string,
): Promise<{ image: string | null, text: string | null }> {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: aspectRatio as '1:1' | '16:9' | '9:16' | '4:3' | '3:4',
            },
        });

        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("The AI did not return an image. Please try a different prompt.");
        }

        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/png;base64,${base64ImageBytes}`;

        return { image: imageUrl, text: null };
    } catch (error) {
        console.error("Error generating image with Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate image: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the image.");
    }
}