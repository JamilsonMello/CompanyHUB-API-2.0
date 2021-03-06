import { IUpdateService } from '@/domain/usecases/service/updateService.interface'
import { BadRequest, Ok, ServerError } from '../../http/http-helper'
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@/presentation/protocols'

export class UpdateServiceController implements IController {
  constructor(private readonly dbUpdateService: IUpdateService) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { updateId } = httpRequest.params
      const { userId } = httpRequest

      const service = await this.dbUpdateService.update(
        updateId,
        userId,
        httpRequest.body
      )

      if (service.error) return BadRequest(service.error)

      return Ok({ message: 'Serviço atualizado com sucesso!' })
    } catch (err) {
      return ServerError(err)
    }
  }
}
