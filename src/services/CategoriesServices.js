import HttpClient from './utils/HttpClient';
import CategoryMapper from './mappers/CategoryMapper';

class CategoriesServices {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:13999');
  }

  async getCategories(abortSignal) {
    const categories = await this.httpClient.get('/categories', { signal: abortSignal });
    return categories.map((category) => CategoryMapper.toDomain(category));
  }
}

export default new CategoriesServices();
