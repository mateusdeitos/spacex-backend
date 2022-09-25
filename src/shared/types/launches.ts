import { TGetCrewDetails } from "./crew";

export namespace LaunchesControllerResponse {
	export type One = { launch: TRawLaunch, crew: TGetCrewDetails[] };
	export type Single = TRawLaunch;
	export type TPastLaunchSummary = {
		totalFlights: number;
		successfulFlights: number;
		failedFlights: number;
	}

	export type TUpcomingLaunchSummary = {
		totalFlights: number;
		flightsPerMonth: {
			currentMonth: number;
			nextMonth: number;
		}
	}
}

export namespace LaunchesApiResponse {
	export type One = TGetLaunchDetails;
	export type Single = TSingleLaunchSummary;
}

export type TGetLaunchDetails = {
	id: string;
	missionName: string;
	missionDate: string;
	flightNumber: number;
	details: string;
	crew: TGetCrewDetails[];
	failure: TRawLaunch["failures"]
	media: {
		reddit: {
			campaign: string;
			launch: string;
			media: string;
			recovery: string;
		},
		youTube: {
			videoId: string;
		}
	},
	rocketId: string;
	sucessfull: boolean;
}

type TSingleLaunchSummary = {
	id: string;
	missionName: string;
	missionDate: string;
	flightNumber: number;
}


export type TRawLaunch = {
	"id": string;
	"flight_number": number,
	"name": string,
	"date_utc": string,
	"date_unix": number,
	"date_local": string,
	"date_precision": "half" | "quarter" | "year" | "month" | "day" | "hour",
	"static_fire_date_utc"?: string,
	"static_fire_date_unix"?: number,
	"tdb"?: boolean,
	"net"?: boolean,
	"window"?: number,
	"rocket"?: string,
	"success"?: boolean,
	"failures": Array<{
		"time": number,
		"altitude": number,
		"reason": string,
	}>,
	"upcoming": boolean,
	"details"?: string,
	"fairings": {
		"reused"?: boolean,
		"recovery_attempt"?: boolean,
		"recovered"?: boolean,
		"ships": string[]
	},
	"crew": Array<
		{
			"crew"?: string
			"role"?: string
		}
	>,
	"ships": string[],
	"capsules": string[],
	"payloads": string[],
	"launchpad"?: string,
	"cores": Array<{
		"core"?: string,
		"flight"?: number,
		"gridfins"?: boolean,
		"legs"?: boolean,
		"reused"?: boolean,
		"landing_attempt"?: boolean,
		"landing_success"?: boolean,
		"landing_type"?: string,
		"landpad"?: string
	}>,
	"links": {
		"patch": {
			"small"?: string,
			"large"?: string
		},
		"reddit": {
			"campaign"?: string,
			"launch"?: string,
			"media"?: string,
			"recovery"?: string
		},
		"flickr": {
			"small": string[],
			"original": string[]
		},
		"presskit"?: string,
		"webcast"?: string,
		"youtube_id"?: string,
		"article"?: string,
		"wikipedia"?: string
	},
	"auto_update"?: boolean
}