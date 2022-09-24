import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { ParseIdPipe } from "./parse-id.pipe";

describe('ParseIdPipe', () => {
	it('should be defined', () => {
		expect(new ParseIdPipe()).toBeDefined();
	});

	it('should throw InternalServerException when used in other type than "params"', () => {
		const pipe = new ParseIdPipe();
		try {
			pipe.transform("12b31b23bb", { type: "body" });
			fail("Method should throw an exception");

		} catch (error) {
			expect(error).toBeInstanceOf(InternalServerErrorException)
		}
	});
	it('should throw BadRequestException when the id is not a string', () => {
		const pipe = new ParseIdPipe();
		try {
			pipe.transform(123213, { type: "param" });
			fail("Method should throw an exception");

		} catch (error) {
			expect(error).toBeInstanceOf(BadRequestException)
		}
	});
	it('should throw BadRequestException when the id is empty', () => {
		const pipe = new ParseIdPipe();
		try {
			pipe.transform("    ", { type: "param" });
			fail("Method should throw an exception");

		} catch (error) {
			expect(error).toBeInstanceOf(BadRequestException)
		}
	});
	it('should throw BadRequestException when the id is not alphanumeric', () => {
		const pipe = new ParseIdPipe();
		try {
			pipe.transform("123123123", { type: "param" });
			fail("Method should throw an exception");

		} catch (error) {
			expect(error).toBeInstanceOf(BadRequestException)
		}

		try {
			pipe.transform("aaaaaaaaa", { type: "param" });
			fail("Method should throw an exception");

		} catch (error) {
			expect(error).toBeInstanceOf(BadRequestException)
		}
	});
	it('should remove spaces of the value', () => {
		const pipe = new ParseIdPipe();
		const parsed = pipe.transform("   12l3213mk1l   ", { type: "param" });
		expect(parsed).toBe("12l3213mk1l")
	});
});
