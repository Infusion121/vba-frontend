import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { take } from 'rxjs/operators';
import { ItemPage } from '@app/model/itemPage.modal';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss'],
})
export class ItemPageComponent implements OnInit {
  pageUrl: string;
  itemPage: ItemPage;

  constructor(private router: Router, private route: ActivatedRoute, private dataservice: DataService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.pageUrl = params.url;
      this.dataservice.getCategoryPageByUrl(this.pageUrl);
      this.dataservice.itemPageByURLUpdated.pipe(take(1)).subscribe((itempage) => {
        if (itempage == null) {
          this.router.navigateByUrl('/');
        } else {
          this.itemPage = itempage;
        }
      });
    });
  }
}
