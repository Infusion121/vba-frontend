export class User {
  constructor(
    public _id: string,
    // public username: string,
    // public name: string,
    // public phone: string,
    public email: string // public address: string, // public role: string, // public isActive: boolean, // public additionalInfo: string, // public createdBy: User,
  ) // public createdOn: string,
  // public updatedBy: User,
  // public updatedOn: string,
  // public password?: string
  {}

  setUserId(id: string) {
    this._id = id;
  }
}
