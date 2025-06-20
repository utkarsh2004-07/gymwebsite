import axios from 'axios';

const GEMINI_API_KEY = "AIzaSyDHzxPkKlgKzBtNX9iYWwqsyJexp6rROPM";
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'; // Replace with actual endpoint

// Function to generate diet plan using Google Gemini
export const generateDietPlan = async (prompt) => {
    try {
        // const response = await axios.post(GEMINI_API_URL, {
        //   prompt: prompt,
        // }, {
        //   headers: {
        //     'Authorization': `Bearer ${GEMINI_API_KEY}`,
        //     'Content-Type': 'application/json',
        //   },
        // });


        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }] },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const content = response.data.candidates[0].content.parts[0].text;
        const meals = parseMeals(content);
        return meals;

        // return response.data.choices[0].text.trim().split('\n'); // Adjust based on actual API response format
    } catch (error) {
        console.error('Error generating diet plan with Gemini:', error);
        throw new Error('Failed to generate diet plan');
    }


};


const parseMeals = (content) => {
    // Split the content by new lines or any other delimiter used
    const lines = content.split('\n').filter(line => line.trim() !== '');

    // Example parsing logic
    const meals = lines.map(line => {
        // Assume each line contains meal information in the format: "Meal Name - Calories"
        const [name, calories] = line.split('-').map(part => part.trim());
        return {
            name,
            calories: parseInt(calories, 10), // Convert calories to integer
            // imageUrl: 'https://via.placeholder.com/140', // Placeholder URL for images
            components: [] // Add components if available
        };
    });

    return meals;
};