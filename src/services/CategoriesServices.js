import HttpClient from './utils/HttpClient';
import CategoryMapper from './mappers/CategoryMapper';

class CategoriesServices {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async getCategories() {
    const categories = await this.httpClient.get('/categories');
    return categories.map((category) => CategoryMapper.toDomain(category));
  }
}

export default new CategoriesServices();
