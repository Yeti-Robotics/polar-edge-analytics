from fastapi.responses import JSONResponse
from .service import SPRService


class SPRController:

    @staticmethod
    async def get_spr():
        scout_sprs = await SPRService.get_spr()
        return JSONResponse(content={"team_sprs": scout_sprs})
