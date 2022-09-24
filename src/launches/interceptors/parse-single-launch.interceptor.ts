import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { LaunchesApiResponse, LaunchesControllerResponse } from 'src/shared/types/launches';

@Injectable()
export class ParseSingleLaunchInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<LaunchesApiResponse.Single> {
		return next.handle().pipe(map(data => this.parse(data)));
	}

	private parse(launch: LaunchesControllerResponse.Single): LaunchesApiResponse.Single {
		const fallbackValues = this.getFallbackValues();

		return {
			id: launch?.id ?? fallbackValues.id,
			flightNumber: launch?.flight_number ?? fallbackValues.flightNumber,
			missionDate: launch?.date_utc ?? fallbackValues.missionDate,
			missionName: launch?.name ?? fallbackValues.missionName,
		}
	}

	private getFallbackValues(): LaunchesApiResponse.Single {
		return {
			id: '',
			flightNumber: 0,
			missionDate: '',
			missionName: '',
		}
	}
}
