import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { TPagination } from '../types/shared';

const MAX_LIMIT = 100;

@Injectable()
/**
 * Use it in routes that require mandatory pagination
 * By default the limit is 100 and the offset is 0
 */
export class ParsePaginationPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata): TPagination {
		if (metadata.type != "query") {
			return { limit: 100, offset: 0 };
		}

		let limit = value?.limit ? parseInt(value.limit) : MAX_LIMIT;
		if (Number.isNaN(limit) || limit > MAX_LIMIT || limit < 0) {
			limit = MAX_LIMIT;
		}

		let offset = value?.offset ? parseInt(value.offset) : 0;
		if (Number.isNaN(offset) || offset < 0) {
			offset = 0;
		}

		return {
			limit,
			offset,
		}
	}
}
