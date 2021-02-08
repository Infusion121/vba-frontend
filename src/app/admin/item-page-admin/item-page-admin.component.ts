import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { Router } from '@angular/router';
import { ItemPage } from '@app/model/itemPage.modal';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-item-page-admin',
  templateUrl: './item-page-admin.component.html',
  styleUrls: ['./item-page-admin.component.scss'],
})
export class ItemPageAdminComponent implements OnInit {
  constructor(private dataservice: DataService, private router: Router) {}

  itempages: ItemPage[] = [];

  ngOnInit(): void {
    this.dataservice.getAllCategoryPages();
    this.dataservice.itemPageListUpdated.pipe(take(1)).subscribe((itempages) => {
      this.itempages = itempages;
    });
  }

  addItemPage() {
    this.router.navigateByUrl('admin/itemPage/add');
  }

  editItemPage(itemPageId: string) {
    this.router.navigateByUrl('/admin/itemPage/edit/' + itemPageId);
  }
}
