import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Manager from 'App/Managers/PropertiesManager'
import ListPropertyValidator from 'App/Validators/ListPropertyValidator'

/*
 * Define Controller to properties.
 *
 */
export default class PropertiesController {
  /**
   * list
   * URL /properties
   * OPERATOR GET
   * QUERY PARAMS ?year:number&city:string&page:number&limit:number
   *
   * RETURN
   * {
   *  "meta": {
   *  "total": 1,
   *  "per_page": 20,
   *  "current_page": 1,
   *  "last_page": 1,
   *  "first_page": 1,
   *  "first_page_url": "/?page=1",
   *  "last_page_url": "/?page=1",
   *  "next_page_url": null,
   *  "previous_page_url": null
   *  },
   *  "data": [
   *    {
   *      "address": "carrera 100 #15-90",
   *      "city": "barranquilla",
   *      "price": 35000000,
   *      "description": null,
   *    }
   *   ]
   *  }
   * @param {HttpContextContract} ctx
   */

  public async list(ctx: HttpContextContract) {
    await ctx.request.validate(ListPropertyValidator)

    const year = ctx.request.input('year', null)
    const city = ctx.request.input('city', null)

    const page = ctx.request.input('page', 1)
    const limit = ctx.request.input('limit', 20)

    return new Manager().getProperties({ year, city }, page, limit)
  }
}
