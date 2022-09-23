export type TCrewDetails = {
	name: string;
	agency: string;
	image: string;
	wikipedia: string;
	launches: string[];
	status: string;
	id: string;
}

export type TGetCrewDetails = TCrewDetails & {
	role: string;
}