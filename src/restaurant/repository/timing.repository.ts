import { Timing } from 'src/restaurant/entities/timing.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';


@EntityRepository(Timing)
export class TimingRepository extends Repository<Timing> {}
