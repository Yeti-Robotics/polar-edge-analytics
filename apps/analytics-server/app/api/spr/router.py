from fastapi import APIRouter
from .controller import SPRController

router = APIRouter()


router.add_api_route("", SPRController.get_spr, methods=["GET"], tags=["SPR"])
