from fastapi import APIRouter, Request
from .controller import TBAIngestController
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

router = APIRouter(tags=["TBA Webhook"])


@router.post("/webhook")
async def get_tba_ingest(request: Request):
    return await TBAIngestController.webhook_handler(request)
