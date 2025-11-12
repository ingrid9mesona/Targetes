
import { GoogleGenAI, Type } from "@google/genai";
import type { Flashcard } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      concepte: {
        type: Type.STRING,
        description: 'El concepte principal o paraula clau.',
      },
      explicacio: {
        type: Type.STRING,
        description: 'Una explicació breu, senzilla i clara del concepte, adaptada per a estudiants de secundària (nivell ESO). Màxim 2-3 frases.',
      },
      descripcioImatge: {
        type: Type.STRING,
        description: 'Una descripció visual d\'una imatge que representi el concepte. Ha de ser prou detallada per poder buscar-la o generar-la amb una IA.',
      },
    },
    required: ['concepte', 'explicacio', 'descripcioImatge'],
  },
};

export async function generateFlashcards(topic: string): Promise<Flashcard[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Genera fitxes de repàs sobre el tema: ${topic}`,
      config: {
        systemInstruction: "Ets una eina educativa anomenada 'Generador de Fitxes Visuals'. El teu objectiu és ajudar el professorat i l'alumnat de secundària (nivell ESO) a crear fitxes de repàs. Per a cada tema que et donin, has de generar entre 5 i 8 conceptes clau. Fes servir un llenguatge clar i educatiu, sense repetir idees ni fer explicacions massa tècniques. Respon sempre en català.",
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);
    
    // Basic validation to ensure we have an array of objects with the correct keys
    if (Array.isArray(data) && data.every(item => 'concepte' in item && 'explicacio' in item && 'descripcioImatge' in item)) {
        return data as Flashcard[];
    } else {
        throw new Error("La resposta de l'API no té el format esperat.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("No s'ha pogut comunicar amb el servei de generació de contingut.");
  }
}
