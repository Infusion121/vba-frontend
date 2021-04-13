export class Bookmaker {
  constructor(
    public _id: string,
    public bookmakingEntityName: string,
    public aboutUs: string,
    public contactName: string,
    public contactEmail: string,
    public contactNumber: string,
    public serviceTypes: string[],
    public betTypes: string[],
    public websiteAddress: string,
    public licenseNumber: string,
    public yearEstablished: string,
    public profilePicCompanyLogo: string,
    public telephoneBetting: string
  ) {}
}
