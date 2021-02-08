import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { take } from 'rxjs/operators';
import { ItemPage } from '@app/model/itemPage.modal';
import { Categories } from '@app/model/categories.modal';

@Component({
  selector: 'app-add-edit-item-page-admin',
  templateUrl: './add-edit-item-page-admin.component.html',
  styleUrls: ['./add-edit-item-page-admin.component.scss'],
})
export class AddEditItemPageAdminComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  itemPageForm: FormGroup;
  editMode = false;
  editedReportId: string;
  caterogyList: Categories[];
  selectedCategoryId: String[];

  ngOnInit(): void {
    this.dataService.getAllCategory();

    this.dataService.categoryListUpdated.pipe(take(1)).subscribe((categoriess) => {
      this.caterogyList = categoriess;

      this.itemPageForm = this._fb.group({
        categories: this.addControl('categories'),
        pageTitle: '',
        pageUrl: '',
        thumnbnailImgUrl: '',
        createdOn: '',
        createdBy: '',
        modifiedOn: '',
        contantArea: '',
        isActive: false,
      });
    });
  }

  addControl(type: string) {
    let controlArray = [];
    controlArray = this.caterogyList.map(() => {
      return this._fb.control(false);
    });
    return this._fb.array(controlArray);
  }

  //Test undertaken section
  get categoryControlArray() {
    return this.itemPageForm.get('categories') as FormArray;
  }

  ngAfterViewInit() {
    this.route.params.subscribe((params: Params) => {
      this.editedReportId = params.id;
      this.editMode = params.id != null;
    });
    this.initForm();
  }

  private initForm() {
    if (this.editMode) {
      this.dataService.getItemPageById(this.editedReportId);
      this.dataService.itemPageListUpdated.pipe(take(1)).subscribe((itempages) => {
        if (itempages.length > 0) {
          this.itemPageForm.controls['pageTitle'].setValue(itempages[0].pageTitle);
          this.itemPageForm.controls['pageUrl'].setValue(itempages[0].pageUrl);
          this.itemPageForm.controls['thumnbnailImgUrl'].setValue(itempages[0].thumnbnailImgUrl);
          this.itemPageForm.controls['contantArea'].setValue(itempages[0].contantArea);
          this.selectedCategoryId = itempages[0].categories;
          this.editControl('categories');
        }
      });
    }
  }

  editControl(type: string) {
    let controlArray = [];
    controlArray = this.caterogyList.map((category) => {
      console.log('This is the selected category list ' + this.selectedCategoryId);
      console.log('This is the selected category ID ' + category._id);
      const hasSome = this.selectedCategoryId.includes(category._id.trim());
      return hasSome ? true : false;
    });

    this.itemPageForm.controls['categories'].patchValue(controlArray);
  }

  setCheckBoxSelectedValues(type: string) {
    this.selectedCategoryId = [];

    this.categoryControlArray.controls.forEach((control, i) => {
      if (control.value) {
        let optionVal = this.caterogyList[i]._id;
        this.selectedCategoryId.push(optionVal);
      }
    });
  }

  onSubmit() {
    console.log('submitted now');
    let formData = this.itemPageForm.value;
    let date = new Date();
    var itemPageObject = new ItemPage(
      this.selectedCategoryId,
      formData.pageTitle,
      formData.pageUrl,
      formData.thumnbnailImgUrl,
      date.toLocaleDateString(),
      date.toLocaleDateString(),
      formData.contantArea,
      true
    );

    if (!this.editMode) {
      this.dataService.postNewItemPage(itemPageObject);
    } else {
      itemPageObject.setItemPageId(this.editedReportId);
      this.dataService.updateItemPage(itemPageObject);
    }
  }

  goBack() {
    this.router.navigateByUrl('admin/itemPage');
  }
}
