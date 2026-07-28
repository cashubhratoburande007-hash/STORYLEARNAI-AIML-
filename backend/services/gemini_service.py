import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def generate_story(concept, level, language):
    try:
        prompt = f"""
You are StoryLearn AI.

Create an educational story.

Topic: {concept}
Difficulty Level: {level}
Language: {language}

Requirements:
- Write in simple and clear language.
- Story should be 600–1000 words.
- Use 4–5 chapters.
- Explain the concept through characters and real-life examples.
- End with:
  • Key Learning Points
  • 5 MCQs with answers
  • Short Summary
"""

        response = client.models.generate_content(
            model="models/gemini-flash-latest",
            contents=prompt,
        )

        return response.text

    except Exception as e:
        print("Gemini Error:", e)
        return f"Error: {str(e)}"