# **App Name**: Fridge Chef

## Core Features:

- Image Upload: Allow users to upload images of their refrigerator's contents.
- Ingredient Detection: Use a pre-trained vision model (like Google Cloud Vision API, a HuggingFace model, or TensorFlow.js) to identify ingredients in the uploaded image.
- Recipe Suggestion: Generate recipe suggestions based on the detected ingredients using an AI model; the LLM acts as a tool when incorporating different ingredients into the output.
- Recipe Display: Display the generated recipes with their names, descriptions, ingredients, and preparation steps.
- Empty Fridge Detection: Automatically detect if the refrigerator is empty based on the image analysis.
- Email Alert: Send an email alert to the user when the fridge is detected as empty, suggesting a basic shopping list using SMTP.
- Scan History: Store history of scanned images and extracted contents, and allow for displaying previously detected ingredients.

## Style Guidelines:

- Primary color: Fresh lime green (#A3C457) to evoke freshness and natural ingredients.
- Background color: Off-white (#F2F0EB) to provide a clean and calming backdrop.
- Accent color: Light orange (#F4B347) for calls to action, adding warmth.
- Body and headline font: 'PT Sans', a sans-serif font for clear readability and a modern feel.
- Use clean, minimalist icons for ingredient categories and actions.
- Grid-based layout for organizing content and ensuring a responsive design.
- Subtle transitions and animations when displaying detected ingredients or generating new recipes.