import { IDbFindAllServices } from '@/domain/usecases/service/findAllService.interface'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'

export class FindAllServicesController implements IController {
  constructor (
    private readonly dbFindAllServices: IDbFindAllServices
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const services = await this.dbFindAllServices.findAll()

      return {
        statusCode: 200,
        body: services
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: err
      }
    }
  }
}
