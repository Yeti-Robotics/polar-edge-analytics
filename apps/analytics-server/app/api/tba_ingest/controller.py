import hashlib
import hmac
import os
import json
from fastapi import Request
from fastapi.responses import JSONResponse
from .service import TBAIngestService
from dotenv import load_dotenv

load_dotenv()


class TBAIngestController:

    @staticmethod
    async def webhook_handler(request: Request):
        payload = await request.json()
        signature = request.headers.get("x-tba-hmac")
        if not await TBAIngestController._verify_tba_webhook(
            json.dumps(payload), signature, os.getenv("TBA_WEBHOOK_SECRET")
        ):
            return JSONResponse(content={"error": "Invalid signature"}, status_code=401)

        match (payload["message_type"]):
            case "ping":
                return TBAIngestService.handle_ping()
            case "match":
                return TBAIngestService.handle_match(payload)
            case "verification":
                return TBAIngestService.handle_verification(payload)
            case _:
                return JSONResponse(
                    content={"error": "Invalid event type"}, status_code=400
                )

    @staticmethod
    async def _verify_tba_webhook(payload: str, signature: str, secret: str) -> bool:
        """Verify the authenticity of a webhook request from The Blue Alliance.
        See: https://www.thebluealliance.com/apidocs/webhooks

        Args:
            payload: The raw request body/payload
            signature: The HMAC signature from the X-TBA-HMAC header
            secret: The webhook secret key for verification

        Returns:
            bool: True if signature is valid, False otherwise

        The function uses HMAC-SHA256 to verify that the webhook came from TBA by
        comparing the provided signature against a computed hash of the payload.
        """
        mac = hmac.new(secret.encode(), payload.encode(), hashlib.sha256)
        return hmac.compare_digest(mac.hexdigest(), signature)
