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
    public telephoneBetting: [{ _id: string; telephone: string }],
    public isApproved: boolean,
    public isFeatured: boolean,
    public isOnlineFeatured: boolean,
    public isTelephoneFeatured: boolean,
    public isOnCourseFeatured: boolean,
    public isSportsFeatured: boolean,
    public isActive: boolean,
    public createdOn: string
  ) {}
}
