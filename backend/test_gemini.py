import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

print("API Key:", os.getenv("GEMINI_API_KEY")[:10] + "...")

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

try:
    response = client.models.generate_content(
        model="models/gemini-flash-latest",
        contents="Say hello in one sentence."
    )
    print("Success!")
    print(response.text)
except Exception as e:
    print("Error:", e)