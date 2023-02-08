

export declare module SpaceDevsApi {
	module Launches {
		interface ISingle {
			id: string;
			url: string;
			slug: string;
			name: string;
			status: IStatus;
			last_updated: string;
			net: string;
			window_end: string;
			window_start: string;
			probability?: number;
			holdreason: number;
			failreason: number;
			hashtag?: number;
			launch_service_provider: ILaunchServiceProvider;
			rocket: IRocket;
			mission: IMission;
			pad: IPad;
			webcast_live: boolean;
			image: string;
			infographic?: number;
			program: [];
			orbital_launch_attempt_count: number;
			location_launch_attempt_count: number;
			pad_launch_attempt_count: number;
			agency_launch_attempt_count: number;
			orbital_launch_attempt_count_year: number;
			location_launch_attempt_count_year: number;
			pad_launch_attempt_count_year: number;
			agency_launch_attempt_count_year: number;
		}

		interface IStatus {
			id: number;
			name: string;
			abbrev: string;
			description: string;
		}

		interface ILaunchServiceProvider {
			id: number;
			url: string;
			name: string;
			type: string;
		}

		interface IRocket {
			id: number;
			configuration: IConfiguration;
		}

		interface IConfiguration {
			id: number;
			url: string;
			name: string;
			family: string;
			full_name: string;
			variant: string;
		}

		interface IMission {
			id: number;
			name: string;
			description: string;
			launch_designator?: number;
			type: string;
			orbit: IOrbit;
		}

		interface IOrbit {
			id: number;
			name: string;
			abbrev: string;
		}

		interface IPad {
			id: number;
			url: string;
			agency_id?: number;
			name: string;
			info_url?: number;
			wiki_url: number;
			map_url: number;
			latitude: number;
			longitude: number;
			location: ILocation;
			map_image: string;
			total_launch_count: number;
			orbital_launch_attempt_count: number;
		}

		interface ILocation {
			id: number;
			url: string;
			name: string;
			country_code: string;
			map_image: string;
			total_launch_count: number;
			total_landing_count: number;
		}
	}
}
