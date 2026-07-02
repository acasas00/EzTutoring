from fastapi import FastAPI, APIRouter
from app.routes.admin_router import router as admin_router
from app.routes.auth_router import router as auth_router
from app.routes.tutor_router import router as tutor_router
from app.routes.user_router import router as user_router
from app.routes.contact_messages_router import router as contact_messages_router
from app.routes.settings_router import router as settings_router
from app.routes import homepage_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from dotenv import load_dotenv
load_dotenv()

app = FastAPI(title="EZ Tutoring API")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://eztutoring.onrender.com",
        "https://eztutoring-1.onrender.com",
        "https://eztutoring-1-t7fo.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "EZ Tutoring API is running"}

app.include_router(admin_router)
app.include_router(auth_router)
app.include_router(tutor_router)
app.include_router(user_router)
app.include_router(contact_messages_router)
app.include_router(homepage_router.router)
app.include_router(settings_router)