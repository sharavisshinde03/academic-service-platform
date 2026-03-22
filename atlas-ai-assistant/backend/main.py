from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import pytesseract
import shutil
import os

# ✅ Tesseract path (Mac)
pytesseract.pytesseract.tesseract_cmd = "/opt/homebrew/bin/tesseract"

app = FastAPI()

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("temp", exist_ok=True)


# 📄 DOCUMENT VALIDATION (ATTENDANCE)
@app.post("/api/validate-document")
async def validate_document(
    file: UploadFile,
    user_text: str = Form(...),
    name: str = Form(...)
):
    try:
        file_path = f"temp/{file.filename}"

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        img = Image.open(file_path).convert("RGB")
        extracted_text = pytesseract.image_to_string(img).lower()

        print("🧾 OCR:", extracted_text)

        if not extracted_text:
            return {
                "ai_response": "OCR failed. Upload clearer image.",
                "status": "error"
            }

        if len(extracted_text.strip()) < 15:
            return {
                "ai_response": "Document not clear.",
                "status": "rejected"
            }

        if name.lower() not in extracted_text:
            return {
                "ai_response": "Name mismatch.",
                "status": "rejected"
            }

        if not any(word in extracted_text for word in ["doctor", "hospital", "medical", "clinic"]):
            return {
                "ai_response": "Not a valid medical document.",
                "status": "rejected"
            }

        return {
            "ai_response": "Attendance approved.",
            "status": "approved"
        }

    except Exception as e:
        print("🔥 ERROR:", str(e))
        return {
            "ai_response": f"Error: {str(e)}",
            "status": "error"
        }


# ❤️ HEALTH
@app.get("/")
def home():
    return {"message": "Backend running 🚀"}