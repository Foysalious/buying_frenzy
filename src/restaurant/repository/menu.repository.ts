import { Timing } from 'src/restaurant/entities/timing.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Menu } from '../entities/menu.entity';

@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {}
