from fastapi import FastAPI, APIRouter
from app.routes.admin_router import router as admin_router
from app.routes.auth_router import router as auth_router
from app.routes.availability_router import router as availability_router
from app.routes.booking_router import router as booking_router
from app.routes.subjects_router import router as subjects_router
from app.routes.tutor_router import router as tutor_router
from app.routes.tutor_subjects_router import router as tutor_subjects_router
from app.routes.user_router import router as user_router

app = FastAPI(title="EZ Tutoring API")

app.include_router(admin_router)
app.include_router(auth_router)
app.include_router(availability_router)
app.include_router(booking_router)
app.include_router(subjects_router)
app.include_router(tutor_router)
app.include_router(tutor_subjects_router)
app.include_router(user_router)