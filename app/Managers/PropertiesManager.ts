import Repository from 'App/Repositories/PropertiesRepository'
import { Property } from 'App/Interfaces/Properties'

/*
 * Define all logic to business in properties.
 *
 */
export default class PropertiesManager {
  /**
   * function that returns filtered properties
   *
   * @param {Property} ctx
   * @param {number} page
   * @param {numer} limit
   */
  public getProperties(
    { year, city, address, price, description }: Property,
    page: number,
    limit: number
  ) {
    return new Repository().getProperties({ year, city, address, price, description }, page, limit)
  }
}
