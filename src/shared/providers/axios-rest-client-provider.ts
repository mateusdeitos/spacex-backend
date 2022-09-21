import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { RestClientProvider } from './rest-client-provider';

@Injectable()
export class AxiosRestClientProvider extends RestClientProvider {
	public async get<T>(url: string, params: Record<string, string>, headers?: Record<string, string | number | boolean>): Promise<T> {
		const response = await axios.get<T>(url, {
			headers,
			params
		})

		return response.data;
	}

}
