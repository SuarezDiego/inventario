from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
import database
from routers.item import router as item_router

app = FastAPI()

# Configuración de origins para CORS
origins = [
    "http://localhost:5173",  # URL del frontend
]

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear tablas
models.Base.metadata.create_all(bind=database.engine)

# Incluir router
app.include_router(item_router)
