export class InfoSheet {
  constructor(
    public _id: string,
    public description: string,
    public subject: string,
    public file: string,
    public isActive: boolean,
    public createdOn: string
  ) {}
}
