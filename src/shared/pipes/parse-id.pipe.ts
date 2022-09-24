import { ArgumentMetadata, BadRequestException, Injectable, InternalServerErrorException, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIdPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		if (metadata.type !== 'param') {
			throw new InternalServerErrorException("ParseIdPipe can only be used on params");
		}

		if (typeof value !== 'string') {
			throw new BadRequestException("Invalid ID");
		}

		if (!value.trim().length) {
			throw new BadRequestException("Invalid ID");
		}

		if (!/[a-z][A-Z]/i.test(value)) {
			throw new BadRequestException("Invalid ID");
		}

		if (!/[0-9]/i.test(value)) {
			throw new BadRequestException("Invalid ID");
		}

		return value.trim();
	}
}
