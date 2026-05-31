from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from groq import Groq
import os
import json
import base64
from defect_catalogue import DEFECT_CATALOGUE, DEFECT_NAMES

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Steel Defect Analyzer API is running"}

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    image_data = await file.read()
    image_base64 = base64.b64encode(image_data).decode("utf-8")
    mime_type = file.content_type

    defect_list = ", ".join(DEFECT_NAMES)

    prompt = f"""You are an expert steel surface defect inspection AI.
Analyze this steel surface image and identify the defect from this exact catalogue: {defect_list}.

Respond ONLY with a valid JSON object, no preamble, no markdown, no backticks.
The JSON must have these exact keys:
- "defect": the single best matching defect name from the catalogue exactly as spelled, or "No Defect Detected"
- "confidence": integer 0 to 100
- "alternatives": array of up to 3 objects with "defect" and "confidence", sorted descending
- "is_steel_surface": boolean

Example:
{{"defect":"Scratches","confidence":87,"alternatives":[{{"defect":"Patches","confidence":9}}],"is_steel_surface":true}}"""

    response = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{mime_type};base64,{image_base64}"
                        }
                    },
                    {
                        "type": "text",
                        "text": prompt
                    }
                ]
            }
        ],
        max_tokens=500
    )

    raw_text = response.choices[0].message.content.strip()
    raw_text = raw_text.replace("```json", "").replace("```", "").strip()
    result = json.loads(raw_text)

    defect_name = result.get("defect", "Unknown")
    if defect_name in DEFECT_CATALOGUE:
        result["details"] = DEFECT_CATALOGUE[defect_name]
    else:
        result["details"] = {
            "severity": "low",
            "description": "Surface appears clean with no detectable defect patterns.",
            "recommendation": "No action required. Continue with standard quality monitoring."
        }

    return result