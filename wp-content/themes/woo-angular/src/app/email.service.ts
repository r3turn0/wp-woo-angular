import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

export class EmailStatus {
  status: number
}

export class MailChimpResponse {
  result: string;
  msg: string;
}

@Injectable()
export class EmailService {

  private emailUrl = environment.host + '/wp-content/themes/vpn/inc/email.php';
  private userRegisterUrl = environment.host + '/wp-content/themes/vpn/inc/userRegister.php';

  formatPhone(number:string) : string {
    if(number && number.length === 10){
      return '(' + number.substring(0,3) + ') ' + number.substring(3,6) + '-' + number.substr(6,number.length);
    }
    else {
      return number;
    }
  }

  sendEmail(submit:boolean, to:string, firstName:string, lastName:string, phone:string, email:string, subject:string, message:string) : Observable<any> {
    const body = new HttpParams().set('submit', submit.toString()).set('to', to).set('first_name', firstName).set('last_name', lastName).set('email', email).set('phone', this.formatPhone(phone)).set('subject',subject).set('message', message);
    return this.http.post<EmailStatus>(this.emailUrl, body.toString(), { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}) });
  }

  sendUserRegisterConfirmation(submit:boolean, to:string, email:string, password:string, link:string) : Observable<any> {
    const body = new HttpParams().set('submit', submit.toString()).set('to', to).set('email', email).set('password', password).set('link', link);
    return this.http.post<EmailStatus>(this.userRegisterUrl, body.toString(), { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}) });
  }

  subscribeUser(mailchimpEndPoint:string, hiddenInput:string, email:string) : Observable<MailChimpResponse> {
    const body = new HttpParams().set('EMAIL', email).set(hiddenInput, '');
    const mailChimpUrl = mailchimpEndPoint + body;
    return this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c');
  }

  constructor(private http:HttpClient) { }

}
