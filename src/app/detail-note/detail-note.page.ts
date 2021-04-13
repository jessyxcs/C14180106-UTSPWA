import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-note',
  templateUrl: './detail-note.page.html',
  styleUrls: ['./detail-note.page.scss'],
})
export class DetailNotePage implements OnInit {
  index: string;
  constructor(private route: ActivatedRoute) {
    let indx = this.route.snapshot.paramMap.get('index');
    this.index = indx;
  }

  ngOnInit() {}
}
