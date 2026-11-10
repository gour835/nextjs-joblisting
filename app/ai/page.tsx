import { GoogleGenAI } from "@google/genai";

export default async function Page() {
    let aiResponse = "";
    let errorMessage = null;

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "YOUR_API_KEY" });

        const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: "Explain how AI works in a few words",
        });

        aiResponse = response.text || "No response generated.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        errorMessage = error || "The AI model is currently busy. Please try refreshing in a few moments.";
    }

    return (
        <main className="p-6">
            <h1 className="text-xl font-bold">AI Response:</h1>
            {errorMessage ? (
                <div className="mt-2 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                    <p className="font-semibold">API Temporarily Unavailable (503)</p>
                    <p className="text-sm mt-1">{errorMessage}</p>
                </div>
            ) : (
                <p className="mt-2 text-gray-700">{aiResponse}</p>
            )}
        </main>
    );
}