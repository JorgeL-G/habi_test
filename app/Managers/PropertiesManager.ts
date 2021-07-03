import Repository from 'App/Repositories/PropertiesRepository'
import { PropertyFilter } from 'App/Interfaces/Properties'

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
  public getProperties({ year, city }: PropertyFilter, page: number, limit: number) {
    return new Repository().getProperties({ year, city }, page, limit)
  }
}
