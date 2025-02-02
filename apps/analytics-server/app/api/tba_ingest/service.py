from fastapi.responses import JSONResponse
import logging
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TBAIngestService:

    @staticmethod
    def handle_match(match: dict):
        """
        Ingest a match into the database.
        """
        return JSONResponse(content={"message": "Match ingested"}, status_code=200)

    @staticmethod
    def handle_ping():
        """
        Handle a ping request from TBA.
        """
        return JSONResponse(content={"message": "Ping received"}, status_code=200)

    @staticmethod
    def handle_verification(event: dict):
        """
        Handle a verification request from TBA.
        """
        logger.info(f"verification received\n{json.dumps(event, indent=4)}")
        return JSONResponse(
            content={"message": "Verification processed"}, status_code=200
        )
