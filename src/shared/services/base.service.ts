import { TPaginatedResult } from 'src/shared/types/shared';

export abstract class BaseService {

	protected paginateResults<T>(rawData: T[], limit: number, offset: number): TPaginatedResult<T> {
		const total = rawData.length;
		const data = rawData.slice(offset, offset + limit);
		return {
			limit,
			offset,
			total,
			data,
		}
	}
}
