export class MemberInfo {
  constructor(
    public _id: string,
    public description: string,
    public file: string,
    public isActive: boolean,
    public createdOn: string
  ) {}
}
