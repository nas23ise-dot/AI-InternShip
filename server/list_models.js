
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // effectively checking if we can instantiate, but `listModels` is a method on the client/system?
        // Actually, older SDKs don't have listModels helper easily exposed on the main class in some versions.
        // But usually it is available.
        // Let's try to just use a known working model like 'gemini-pro' or 'gemini-1.0-pro' if 1.5 is failing.
        // But let's try to find the list.
        // If the SDK version is old, maybe 1.5 is not supported.

        // I'll try to just print the error of a request to a non-existent model to see the suggestion? 
        // The previous error already suggested calling ListModels.

        // Let's rely on 'gemini-1.5-flash-latest' or just 'gemini-pro' as a fallback.
        // However, I want the best model.

        console.log("Checking commonly used model names...");
        const modelsToCheck = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.0-pro", "gemini-pro"];

        for (const m of modelsToCheck) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                const result = await model.generateContent("Test");
                console.log(`Model ${m} works!`);
                process.exit(0);
            } catch (e) {
                console.log(`Model ${m} failed: ${e.message.split(':')[0]}`);
            }
        }
    } catch (e) {
        console.error(e);
    }
}

listModels();
