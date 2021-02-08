import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { take } from 'rxjs/operators';
import { Categories } from '@app/model/categories.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(private dataservice: DataService, private router: Router) {}

  categories: Categories[] = [];

  ngOnInit(): void {
    this.dataservice.getAllCategory();
    this.dataservice.categoryListUpdated.pipe(take(1)).subscribe((categories) => {
      this.categories = categories;
    });
  }

  addCategory() {
    this.router.navigateByUrl('admin/category/add');
  }

  editCategory(catId: string) {
    this.router.navigateByUrl('/admin/category/edit/' + catId);
  }
}
