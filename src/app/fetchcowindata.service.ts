import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FetchcowindataService {

  constructor(private http:HttpClient, private _datePipe:DatePipe) { }

  private _stateUrl = "http://api.ngminds.com/states.json"

  getStateData()
  {
    return this.http.get(this._stateUrl)
  }
  getDistrictData(id:any)
  {
    return this.http.get(`http://api.ngminds.com/${id}.json`)
  }

  slotUsingDistrictId(id:any,date:any)
  {
    let d = this._datePipe.transform(date , 'dd-MM-yyyy')
    //console.log(d);
    
    return this.http.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${d}`)
  }

  slotUsingPin(pin:string,date:any)
  {
    console.log(pin)
    let d = this._datePipe.transform(date , 'dd-MM-yyyy')
    console.log(d);
    let p : number = +pin
    
    return this.http.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${p}&date=${d}`)
  }
}
