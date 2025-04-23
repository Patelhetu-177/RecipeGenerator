const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const Recipe = require('../models/Recipe');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate', async (req, res) => {
    const { basketItems } = req.body;

    if (!basketItems || basketItems.length === 0) {
        return res.status(400).json({ error: 'Please select items for the basket.' });
    }

    const ingredients = basketItems.map(item => item.name).join(', ');
    const prompt = `Generate a recipe using the following ingredients: ${ingredients}. Provide a title, a list of ingredients, and step-by-step instructions.`;

    try {
        let result;
        let model;
        try {
            model = new genAI.GenerativeModel({ model: "gemini-pro" });
            result = await model.generateContent(prompt);
        } catch (e) {
            console.error("Error with model instantiation/generateContent:", e);
            console.error("genAI object:", genAI);
            console.error("typeof genAI.GenerativeModel:", typeof genAI.GenerativeModel); 
            console.error("typeof genAI.generateContent:", typeof genAI.generateContent); 
            return res.status(500).json({ error: "Error calling Gemini API." });
        }

        let responseText = "";
        try {
            responseText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
        } catch (e) {
            console.error("Error extracting text from response:", e);
            console.error("Full result object:", result);
            return res.status(500).json({ error: "Could not extract recipe from Gemini response." });
        }

        if (responseText) {
            const newRecipe = new Recipe({
                ingredients: basketItems.map(item => item.name),
                fullRecipe: responseText,
            });
            await newRecipe.save();

            res.status(200).json({ recipe: responseText });
        } else {
            console.error('Gemini API response:', result.response);
            res.status(500).json({ error: 'Failed to generate recipe from Gemini API.' });
        }

    } catch (error) {
        console.error('Error generating recipe:', error);
        res.status(500).json({ error: 'Error generating recipe.' });
    }
});

module.exports = router;