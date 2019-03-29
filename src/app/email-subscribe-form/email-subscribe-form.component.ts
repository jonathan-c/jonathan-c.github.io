import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface MailChimpResponse {
  result: string;
  msg: string;
}

@Component({
  selector: 'app-email-subscribe-form',
  templateUrl: './email-subscribe-form.component.html',
  styleUrls: ['./email-subscribe-form.component.css']
})
export class EmailSubscribeFormComponent implements OnInit {
  email:string = "";
  submitted = false;
  mailChimpEndpoint = 'https://pollsports.us20.list-manage.com/subscribe/post-json?u=9a10d01d53cc47349a4615fc4&amp;id=e386189b3f&';
  error = '';
  referrer:string = "";

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.referrer = params['referrer'];
    });
  }

  // reactive form components
  emailControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nameControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit() {
  }

  submit() {
    let shareId = (Math.floor(Math.random() * 100000000)+1).toString();
    this.error = '';
    // if (this.emailControl.status === 'VALID') {

      const params = new HttpParams()
        .set('EMAIL', this.email)
        .set('REFERRER', this.referrer)
        .set('SHAREID', shareId)
        .set('b_9a10d01d53cc47349a4615fc4_e386189b3f', ''); // hidden input name

      const mailChimpUrl = this.mailChimpEndpoint + params.toString();

      // 'c' refers to the jsonp callback param key. This is specific to Mailchimp
      this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c').subscribe(response => {
        if (response.result && response.result !== 'error') {
          this.submitted = true;
          this.router.navigate(['/confirmed', parseInt(shareId)]);
        }
        else {
          this.error = response.msg;
        }
      }, error => {
        console.error(error);
        this.error = 'Sorry, an error occurred.';
      });

    // }
  }


}
