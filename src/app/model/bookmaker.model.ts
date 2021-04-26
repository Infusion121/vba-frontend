export class Bookmaker {
  constructor(
    public _id: string,
    public bookmakingEntityName: string,
    public aboutUs: string,
    public contactName: string,
    public contactEmail: string,
    public contactNumber: string,
    public bookmakingServices: string[],
    public betTypes: string[],
    public websiteAddress: string,
    public licenseNumber: string,
    public yearEstablished: string,
    public profilePicCompanyLogo: string,
    public telephoneBetting: [{_id: string, telephone: string}],
    public isApproved: boolean,
    public createdOn: string
  ) {}
}
