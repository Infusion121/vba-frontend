import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { take } from 'rxjs/operators';
import { Categories } from '@app/model/categories.modal';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss'],
})
export class AddEditCategoryComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  categoryForm: FormGroup;
  editMode = false;
  editedReportId: string;

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
      name: '',
      createdOn: '',
      createdBy: '',
      modifiedOn: '',
      isActive: false,
    });
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
      this.dataService.getCategoryById(this.editedReportId);
      this.dataService.categoryListUpdated.pipe(take(1)).subscribe((categories) => {
        if (categories.length > 0) {
          this.categoryForm.controls['name'].setValue(categories[0].name);
        }
      });
    }
  }

  onSubmit() {
    console.log('submitted now');
    let formData = this.categoryForm.value;
    let date = new Date();
    var categoryObject = new Categories(
      formData.name,
      date.toLocaleDateString(),
      'Admin',
      date.toLocaleDateString(),
      true
    );
    if (!this.editMode) {
      this.dataService.postNewCategory(categoryObject);
    } else {
      categoryObject.setReportId(this.editedReportId);
      this.dataService.updateCategory(categoryObject);
    }
  }

  goBack() {
    this.router.navigateByUrl('admin/category');
  }
}
