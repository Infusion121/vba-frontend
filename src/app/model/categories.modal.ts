export class Categories {
  public _id: string;
  public name: string;
  public createdOn: string;
  public createdBy: string;
  public modifiedOn: string;
  public isActive: boolean;

  constructor(name: string, createdOn: string, createdBy: string, modifiedOn: string, isActive: boolean) {
    this.name = name;
    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.modifiedOn = modifiedOn;
    this.isActive = isActive;
  }

  setReportId(id: string) {
    this._id = id;
  }
}
