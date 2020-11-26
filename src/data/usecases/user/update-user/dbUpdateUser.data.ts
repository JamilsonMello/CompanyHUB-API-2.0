import { IFindUserByEmailRepository, IHasher } from "@/data/protocols";
import { ICompare } from "@/data/protocols/bcryptAdapter/ICompare.interface";
import { IFindUserByIdRepository } from "@/data/protocols/db/user/findUserByIdRepository.interface";
import { IUpdateUserDTO, IUpdateUserRepository } from "@/data/protocols/db/user/updateUserRepository.interface";


export class DbUpdateUser implements IUpdateUserRepository {
  constructor (
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly findUserByEmailRepo: IFindUserByEmailRepository,
    private readonly UpdateUserRepo: IUpdateUserRepository,
    private readonly bcryptCompare: ICompare,
    private readonly hasher: IHasher
  ) {}

  async update (id: number, data: IUpdateUserDTO): Promise<boolean> {


    const user = await this.findUserByIdRepository.findId(id)

    if(!user) return null

    const { password, confirmPassword, ...rest } = data

    if(rest.email) {
      if(user.email !== rest.email) {
      return await this.findUserByEmailRepo.findEmail(rest.email) && null
      }
    }

    if (data.oldPassword) {

      return !(await this.bcryptCompare.compare(data.oldPassword, user.password_hash)) && null

      const { oldPassword, ...rest } = data

      return await this.UpdateUserRepo.update(user.id, {
        password_hash: await this.hasher.hash(password),
        ...rest,
      })
    }

    return await this.UpdateUserRepo.update(user.id, {
      ...data
    })
  }

}