import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document:any, private http: HttpClient) { }

  ngOnInit() {
  }

  submitEmail(e) {
    // audience id: e386189b3f
    // api key f979424e1601607cf9057748a5585076-us20
    // https://pollsports.us20.list-manage.com/subscribe/post-json?u=9a10d01d53cc47349a4615fc4&amp;id=e386189b3f
    let apiKey = "f979424e1601607cf9057748a5585076-us20";
    let headers = new HttpHeaders()
      .set("user", "anystring:"+apiKey);
    this.http.post('https://us20.api.mailchimp.com/3.0/lists/e386189b3f/members/', {
        "email_address": "johny5@gmail.com",
        "status": "subscribed",
        "merge_fields": {
            "REFERRER": "My boy Tyga",
            "SHAREID": "Random Share ID Generated"
        }
    }, { headers }).subscribe(data => {
      console.log("success!", data);
    },
    err => {
      console.log("error", err);
    });
  }
}
