import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { LaunchesApiResponse, LaunchesControllerResponse, TGetLaunchDetails } from 'src/shared/types/launches';

@Injectable()
export class ParseLaunchDetailsInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<LaunchesApiResponse.One> {
		return next.handle().pipe(map(data => this.parse(data)));
	}

	private parse(data: LaunchesControllerResponse.One): LaunchesApiResponse.One {
		const fallbackValues = this.getFallbackValues();

		const { launch, crew } = data;

		return {
			id: launch?.id ?? fallbackValues.id,
			crew,
			details: launch?.details ?? fallbackValues.details,
			failure: launch?.failures ?? fallbackValues.failure,
			flightNumber: launch?.flight_number ?? fallbackValues.flightNumber,
			media: {
				reddit: {
					campaign: launch?.links?.reddit?.campaign ?? fallbackValues.media.reddit.campaign,
					launch: launch?.links?.reddit?.launch ?? fallbackValues.media.reddit.launch,
					media: launch?.links?.reddit?.media ?? fallbackValues.media.reddit.media,
					recovery: launch?.links?.reddit?.recovery ?? fallbackValues.media.reddit.recovery,
				},
				youTube: {
					videoId: launch?.links?.youtube_id ?? fallbackValues.media.youTube.videoId,
				},
			},
			missionDate: launch?.date_utc ?? fallbackValues.missionDate,
			missionName: launch?.name ?? fallbackValues.missionName,
			rocketId: launch?.rocket ?? fallbackValues.rocketId,
			sucessfull: launch?.success ?? fallbackValues.sucessfull,
		}
	}

	private getFallbackValues(): TGetLaunchDetails {
		return {
			id: "",
			crew: [],
			details: "",
			failure: [],
			flightNumber: 0,
			media: {
				reddit: {
					campaign: "",
					launch: "",
					media: "",
					recovery: "",
				},
				youTube: {
					videoId: "",
				},
			},
			missionDate: "",
			missionName: "",
			rocketId: "",
			sucessfull: false,
		}
	}
}
