import { EntityRepository, Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { Timing } from '../entities/timing.entity';


@EntityRepository(Timing)
export class TimingRepository extends Repository<Timing> {}
