/**
 * Tests to verify stand form validation functions as expected.
 */

import { standFormSchema } from "../schema";

function getBaseTestForm() {
	const baseForm = new FormData();
	baseForm.append("team_number", "3506");
	baseForm.append("match_number", "12");
	baseForm.append("initiation_line", "true");
	baseForm.append("auto_speaker_notes", "3");
	baseForm.append("auto_amp_notes", "0");
	baseForm.append("auto_shuttle_notes", "0");
	baseForm.append("teleop_speaker_notes", "10");
	baseForm.append("teleop_amp_notes", "2");
	baseForm.append("teleop_shuttle_notes", "2");
	baseForm.append("climb", "true");
	baseForm.append("park", "true");
	baseForm.append("number_on_chain", "0");
	baseForm.append("defense", "2");
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

	it("validates form", () => {
		const testForm = getBaseTestForm();
		const data = Object.fromEntries(testForm.entries());
		const validationResult = standFormSchema.safeParse(data);
		const errors = validationResult.error?.flatten().fieldErrors ?? {};
		expect(Object.keys(errors).length).toBe(0);
	});
});
