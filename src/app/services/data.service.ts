import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ItemPage } from '@app/model/itemPage.modal';
import { Subject } from 'rxjs';
import { Categories } from '@app/model/categories.modal';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  rooturl = 'http://server.metco.infusion121.com';

  itemPageList: ItemPage[] = [];
  itemPageListUpdated = new Subject<ItemPage[]>();
  itemPageByURLUpdated = new Subject<ItemPage>();

  categoryList: Categories[] = [];
  categoryListUpdated = new Subject<Categories[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getCategoryPagesByCatId(categoryId: string) {
    const opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(this.rooturl + '/api/get_category_pages/' + categoryId, opts).subscribe((itemPage: any) => {
      let itemPages: ItemPage[] = itemPage;
      this.setCategoryPageList(itemPages);
    });
  }

  getAllCategoryPages() {
    const opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(this.rooturl + '/api/get_all_item_pages', opts).subscribe((itemPage: any) => {
      let itemPages: ItemPage[] = itemPage;
      this.setCategoryPageList(itemPages);
    });
  }

  setCategoryPageList(itemPages: ItemPage[]) {
    this.itemPageList = itemPages;
    this.itemPageListUpdated.next(this.itemPageList.slice());
  }

  getCategoryPageList() {
    return this.itemPageList;
  }

  getCategoryPageByUrl(pageUrl: string) {
    const opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(this.rooturl + '/api/get_all_item_pages', opts).subscribe((itemPage: any) => {
      let itemPages: ItemPage[] = itemPage;
      let categoryPage = itemPages.find((x) => x.pageUrl == '/' + pageUrl);
      if (categoryPage) {
        this.itemPageByURLUpdated.next(categoryPage);
      } else {
        this.itemPageByURLUpdated.next(null);
      }
    });
  }

  getItemPageById(pageId: string) {
    const opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(this.rooturl + '/api/get_one_page/' + pageId, opts).subscribe((itemPageReturn: any) => {
      let itemPage: ItemPage[] = itemPageReturn;
      this.setCategoryPageList(itemPage);
    });
  }

  postNewItemPage(itempage: ItemPage) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.rooturl + '/api/create_new_item_page', itempage, { headers: headers })
      .subscribe((response: any) => {
        console.log(response.success);
        this.router.navigateByUrl('admin/itemPage');
      });
  }

  updateItemPage(itempage: ItemPage) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .put(this.rooturl + '/api/update_itemPage', itempage, { headers: headers })
      .subscribe((response: any) => {
        console.log(response.success);
        this.router.navigateByUrl('admin/itemPage');
      });
  }

  //Categories API function

  getAllCategory() {
    const opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(this.rooturl + '/api/get_all_categories', opts).subscribe((categoriesReturn: any) => {
      let categories: Categories[] = categoriesReturn;
      this.setCategoriesList(categories);
    });
  }

  setCategoriesList(categories: Categories[]) {
    this.categoryList = categories;
    this.categoryListUpdated.next(this.categoryList.slice());
  }

  getCategoriesList() {
    return this.categoryList;
  }

  getCategoryById(catId: string) {
    const opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(this.rooturl + '/api/get_one_category/' + catId, opts).subscribe((categoriesReturn: any) => {
      let categories: Categories[] = categoriesReturn;
      this.setCategoriesList(categories);
    });
  }

  postNewCategory(category: Categories) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.rooturl + '/api/create_new_category', category, { headers: headers })
      .subscribe((response: any) => {
        console.log(response.success);
        this.router.navigateByUrl('admin/category');
      });
  }

  updateCategory(category: Categories) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .put(this.rooturl + '/api/update_category', category, { headers: headers })
      .subscribe((response: any) => {
        console.log(response.success);
        this.router.navigateByUrl('admin/category');
      });
  }
}
