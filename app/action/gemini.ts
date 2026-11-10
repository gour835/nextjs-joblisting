'use server';
import { GoogleGenAI } from "@google/genai";

export async function googleDemo() {
    try {
        const ai = new GoogleGenAI({});
    
        const interaction = await ai.interactions.create({
            model: "gemini-3.5-flash-lite",
            input: "Explain how AI works in a few words",
        });
    
        console.log(interaction.output_text);
        return {success: true, output: interaction.output_text}
    } catch (error) {
        console.log('error geting response from gemini: ', error);
        return {success: false, error}
    }
}