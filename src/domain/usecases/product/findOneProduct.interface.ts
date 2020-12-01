import { ICompanyModel } from '@/domain/models/company.interface'
import { IServiceModel } from '@/domain/models/service.interface'

export interface IDbFindOneProductResult {
  error?: string
  id?: number
  name?: string
  company_id?: number
  companyConnection?: ICompanyModel
  serviceConnection?: IServiceModel[]
}

export interface IDbFindOneProduct {
  findOne(id: number): Promise<IDbFindOneProductResult[]>
}
