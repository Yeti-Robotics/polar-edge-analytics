/**
 * Tests to verify stand form validation functions as expected.
 */

function getBaseTestForm() {
	const baseForm = new FormData();
	baseForm.append("scouter", "ba64daa5-37a0-47e9-b376-2930b948dbfe");
	baseForm.append("team_number", "3506");
	baseForm.append("match_number", "12");
	baseForm.append("event_code", "2024test");
	baseForm.append("auto_line", "true");
	baseForm.append("speaker_auto", "3");
	baseForm.append("amp_auto", "0");
	baseForm.append("shuttle_auto", "0");
	baseForm.append("speaker_teleop", "10");
	baseForm.append("amp_teleop", "2");
	baseForm.append("bots_on_chain", "0");
	baseForm.append("shuttle_teleop", "0");
	baseForm.append("parked", "true");
	baseForm.append("defense_rating", "2");
	baseForm.append(
		"notes",
		"This is a valid note that is greater than 32 characters long"
	);

	return baseForm;
}

describe("Validate correctly validates Stand Forms", () => {
	// TODO: rewrite tests to use RHF
	// let testForm: FormData;
	// beforeEach(() => {
	// 	testForm = getBaseTestForm();
	// });
	// it("passes for valid form", () => {
	// 	const validationResult = validateForm(testForm);
	// 	expect(Object.keys(validationResult.formErrors).length).toBe(0);
	// 	expect(validationResult.data?.climbed).toBe(false);
	// });
	// it("rejects if note is not 32 characters long", () => {
	// 	testForm.set("notes", "invalid note :<");
	// 	const validationResult = validateForm(testForm);
	// 	expect(Object.keys(validationResult.formErrors).length).toBe(1);
	// 	expect(validationResult.formErrors["notes"].at(0)).toBe(
	// 		"Notes must be at least 32 characters long"
	// 	);
	// });
	// it("rejects for negative counter values", () => {
	// 	testForm.set("speaker_auto", "-5");
	// 	testForm.set("amp_auto", "-3");
	// 	testForm.set("shuttle_auto", "-10");
	// 	testForm.set("speaker_teleop", "-5");
	// 	testForm.set("amp_teleop", "-1");
	// 	testForm.set("shuttle_teleop", "-11");
	// 	const validationResult = validateForm(testForm);
	// 	expect(Object.keys(validationResult.formErrors).length).toBe(6);
	// 	expect(
	// 		Object.values(validationResult.formErrors)
	// 			.reduce((a, b) => [...a, ...b], [])
	// 			.every((err) => err.endsWith("must be a non-negative integer"))
	// 	).toBe(true);
	// });
	// it("allows climbed to be set to true", () => {
	// 	testForm.append("climbed", "true");
	// 	const validationResult = validateForm(testForm);
	// 	expect(Object.keys(validationResult.formErrors).length).toBe(0);
	// });
	// it("sets climbed and parked to false if neither is specified", () => {
	// 	testForm.delete("parked");
	// 	const validationResult = validateForm(testForm);
	// 	expect(Object.keys(validationResult.formErrors).length).toBe(0);
	// 	expect(validationResult.data?.climbed).toBe(false);
	// 	expect(validationResult.data?.parked).toBe(false);
	// });
	// it("requires team, match number, and scouter to be specified", () => {
	// 	testForm.delete("scouter");
	// 	testForm.delete("team_number");
	// 	testForm.delete("match_number");
	// 	const validationResult = validateForm(testForm);
	// 	expect(Object.keys(validationResult.formErrors).length).toBe(3);
	// });
});
