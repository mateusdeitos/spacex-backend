import { Injectable } from '@nestjs/common';
import { LaunchesService } from './abstract.launches.service';

@Injectable()
export class V5LaunchesService extends LaunchesService {
	protected baseUrl = 'https://api.spacexdata.com';
	protected version = "v5";
}
