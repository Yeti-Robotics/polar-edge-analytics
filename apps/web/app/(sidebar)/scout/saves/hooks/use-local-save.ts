import { useEffect, useState } from "react";
import { getLocalSaveKeys, parseLocalSaveKey, SaveInformation } from "./save";

export function useLocalSave() {
    const [saves, setSaves] = useState([] as SaveInformation[]);

    useEffect(() => {
        setSaves(getLocalSaveKeys().map(parseLocalSaveKey))
    }, []);

    return saves;
}