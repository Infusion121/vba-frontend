import { Categories } from './categories.modal';
export class ItemPage {
  public _id: string;
  public categories: Array<String>;
  public pageTitle: string;
  public pageUrl: string;
  public thumnbnailImgUrl: string;
  public createdOn: string;
  public modifiedOn: string;
  public contantArea: string;
  public isActive: boolean;

  constructor(
    categories: Array<String>,
    pageTitle: string,
    pageUrl: string,
    thumnbnailImgUrl: string,
    createdOn: string,
    modifiedOn: string,
    contantArea: string,
    isActive: boolean
  ) {
    this.categories = categories;
    this.pageTitle = pageTitle;
    this.pageUrl = pageUrl;
    this.thumnbnailImgUrl = thumnbnailImgUrl;
    this.createdOn = createdOn;
    this.modifiedOn = modifiedOn;
    this.contantArea = contantArea;
    this.isActive = isActive;
  }

  setItemPageId(id: string) {
    this._id = id;
  }
}
