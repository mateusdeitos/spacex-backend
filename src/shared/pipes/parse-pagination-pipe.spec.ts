import { ParsePaginationPipe } from './parse-pagination.pipe';

describe('ParsePaginationPipe', () => {
	it('should be defined', () => {
		expect(new ParsePaginationPipe()).toBeDefined();
	});

	it('should return default values when not used with query params', () => {
		const pipe = new ParsePaginationPipe();
		const result = pipe.transform({}, { type: "param" });
		expect(result).toEqual({ limit: 100, offset: 0 });
	});

	it('should use default values when invalid values are entered', () => {
		const pipe = new ParsePaginationPipe();
		const result = pipe.transform({ limit: "12903801238123", offset: "aaaaa" }, { type: "query" });
		expect(result).toEqual({ limit: 100, offset: 0 });
	})

	it('should parse the values when they are valid', () => {
		const pipe = new ParsePaginationPipe();
		const result = pipe.transform({ limit: "10", offset: "5" }, { type: "query" });
		expect(result).toEqual({ limit: 10, offset: 5 });
	})

});
