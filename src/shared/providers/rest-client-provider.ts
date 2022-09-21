import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class RestClientProvider {
	public abstract get<T>(endpoint: string, params?: Record<string, string> | null, headers?: Record<string, string>): Promise<T>;
}
