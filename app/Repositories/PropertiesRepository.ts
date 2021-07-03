import Database from '@ioc:Adonis/Lucid/Database'
import { PropertyFilter } from 'App/Interfaces/Properties'

/*
 * Define all queries from property table.
 *
 */
export default class PropertiesRepository {
  /**
   * function that returns filtered properties
   *
   * @param {Property} ctx
   * @param {number} page
   * @param {numer} limit
   */
  public getProperties({ year, city }: PropertyFilter, page: number, limit: number) {
    const statusIds = [3, 4, 5] // "pre_venta", "en_venta", "vendido"
    // query that returns property id last state (3, 4, 5) for properties
    const subQuery = Database.from('status_history')
      .max('id')
      .select('property_id')
      .whereIn('status_id', statusIds)
      .groupByRaw('property_id DESC')
      .as('latest_status')

    const query = Database.from(subQuery)
      .select('property.address', 'property.city', 'property.description', 'property.price')
      .innerJoin('property', 'property.id', 'latest_status.property_id')

    if (year) {
      query.where('year', year)
    }

    if (city) {
      query.where('city', city)
    }

    return query.paginate(page, limit)
  }
}
