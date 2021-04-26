export class Newsletter {
  constructor(
    public _id: string,
    public description: string,
		public date: string,
		public file: string,
    public isActive: boolean,
    public createdOn: string
  ) {}
}
