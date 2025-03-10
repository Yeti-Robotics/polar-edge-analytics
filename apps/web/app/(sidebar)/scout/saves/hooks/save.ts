import { Cage } from "@/lib/database/schema";
import { StandFormData } from "../../data/schema";

export const STAND_FORM_SAVE_KEY = "stand-form";

export type SaveInformation = {
    matchNumber: number;
    teamNumber: number;
}

const standFormKey = (matchNumber: number, teamNumber: number) => `${STAND_FORM_SAVE_KEY}-${matchNumber}-${teamNumber}`;

export function updateLocalSave(matchNumber: number, teamNumber: number, data: StandFormData) {
    localStorage.setItem(standFormKey(matchNumber, teamNumber), JSON.stringify(data));
}

export function deleteLocalSave(matchNumber: number, teamNumber: number) {
    localStorage.removeItem(standFormKey(matchNumber, teamNumber));
}

export function getLocalSave(matchNumber: number, teamNumber: number): StandFormData {
    const save = localStorage.getItem(standFormKey(matchNumber, teamNumber));

    return save == null ? standFormDefaultValues : JSON.parse(save);
}

export function getLocalSaveKeys() {
    return Object.keys(localStorage).filter(f => f.startsWith(STAND_FORM_SAVE_KEY));
}

export function parseLocalSaveKey(string: string): SaveInformation {
    const keyEls = string.split("-");

    return {
        teamNumber: parseInt(keyEls.pop() ?? "0"),
        matchNumber: parseInt(keyEls.pop() ?? "0"),
    }
}

export const standFormDefaultValues: StandFormData = {
    match_detail: {
        // This is a bit of a hack to get the form to work with the zod schema
        // The zod schema expects a number, but value needs to be a string to be empty by default
        team_number: "" as unknown as number,
        match_number: "" as unknown as number,
    },
    auto: {
        auto_initiation_line: false,
        auto_coral_level_1: 0,
        auto_coral_level_2: 0,
        auto_coral_level_3: 0,
        auto_coral_level_4: 0,
        auto_algae_processed: 0,
        auto_algae_netted: 0,
    },
    teleop: {
        teleop_coral_level_1: 0,
        teleop_coral_level_2: 0,
        teleop_coral_level_3: 0,
        teleop_coral_level_4: 0,
        teleop_algae_processed: 0,
        teleop_algae_netted: 0,
    },
    endgame: {
        cage_climb: Cage.NONE,
    },
    misc: {
        comments: "",
        defense_rating: "1" as unknown as number,
    },
};