export interface RepositoryInterface<t> {
  create(entity: t):Promise<void>
  update(entity: t):Promise<void>
  find(id: string):Promise<t>
  findAll():Promise<t[]>
}