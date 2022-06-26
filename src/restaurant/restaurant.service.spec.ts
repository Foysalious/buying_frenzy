import { Test, TestingModule } from '@nestjs/testing';
import { GetRestaurantDto } from './dto/get-restaurant.dto';
import { SearchDto } from './dto/search.dto';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

class ApiServiceMock {
  findAll(dto: GetRestaurantDto) {
    return [];
  }

  searchRestauratDish(dto: SearchDto) {
    return [];
  }
}
describe.only("NoteService", () => {

  let restaurantService: RestaurantService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: RestaurantService,
      useClass: ApiServiceMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService, ApiServiceProvider
      ],
    }).compile();
    restaurantService = module.get<RestaurantService>(RestaurantService);
  })

  it('should get all restaurant name', async () => {
    const getAllRestaurant = jest.spyOn(restaurantService, 'findAll');
    const getRestaurantOptions: GetRestaurantDto = { time: "10:15 am", day: "Sat" };
    restaurantService.findAll(getRestaurantOptions);
    expect(getAllRestaurant).toHaveBeenCalledWith(getRestaurantOptions);
  });

  it('should return search results', async () => {
    const search = jest.spyOn(restaurantService, 'searchRestauratDish');
    const getRestaurantOptions: SearchDto = { search: "024 Grille" };
    restaurantService.searchRestauratDish(getRestaurantOptions);
    expect(search).toHaveBeenCalledWith(getRestaurantOptions);
  });

})