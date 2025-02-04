from fastapi import FastAPI
from app.api.spr.router import router as spr_router
from app.api.tba_ingest.router import router as tba_ingest_router

app = FastAPI()

app.include_router(spr_router, prefix="/spr")
app.include_router(tba_ingest_router, prefix="/tba-ingest")


@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}
