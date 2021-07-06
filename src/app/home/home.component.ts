import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs/operators';
import { DataService } from '@app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  slides = [
    { img: 'http://placehold.it/350x150/000000.jpg' },
    { img: 'http://placehold.it/350x150/111111.jpg' },
    { img: 'http://placehold.it/350x150/333333.jpg' },
    { img: 'http://placehold.it/350x150/666666.jpg' },
  ];

  slideConfig = { slidesToShow: 4, slidesToScroll: 4 };

  constructor(private dataservice: DataService, private router: Router) {
    //Redirect to the registration page
    this.router.navigateByUrl('/admin/dashboard');
  }

  ngOnInit() {}

  gotoItemPage(pageUrl: string) {
    this.router.navigateByUrl(pageUrl);
  }

  //Function to get all category pages by category id
  getCategoryPages(catId: string, numberofItems: number, sortBy: string, ascending: boolean) {
    // let categoryPages = this.itemPageList.filter((x) => x.categories.includes(catId)).slice(0, numberofItems);
    // if (sortBy != '') {
    //   categoryPages = categoryPages.sort((a: any, b: any) => {
    //     if (a[sortBy] < b[sortBy]) {
    //       return -1;
    //     } else if (a[sortBy] > b[sortBy]) {
    //       return 1;
    //     } else {
    //       return 0;
    //     }
    //   });
    // }
    // if (!ascending) {
    //   return categoryPages.reverse();
    // }
    // return categoryPages;
  }
}
