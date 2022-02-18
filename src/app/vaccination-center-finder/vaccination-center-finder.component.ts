import { Component, OnInit } from '@angular/core';
import { FetchcowindataService } from '../fetchcowindata.service';

@Component({
  selector: 'app-vaccination-center-finder',
  templateUrl: './vaccination-center-finder.component.html',
  styleUrls: ['./vaccination-center-finder.component.css']
})
export class VaccinationCenterFinderComponent implements OnInit {

  pin?:string | undefined
  page:number | string = 1
  dataCount : number | string = 3
  myDate:Date = new Date()
  stateId?:number
  districtId?:any
  statesArray?:any = []
  districtArray?:any = []
  allDataByDistrictId?:any = []
  districtData :any[] = []
  dateArray:any[] =[]

  data1:any=[]
  data2:any=[]
  data3:any=[]

  arr : any[] = [1,2,3,4]
  constructor( private _fetch:FetchcowindataService) { }
  changeField = true
  ngOnInit(): void {    
    this.getStates()
    this.dateArray.push(new Date(this.myDate.setDate(this.myDate.getDate())))
    this.getDate()
    this.remove()
  }

  remove()
  {
    this.arr.shift()
    console.log(this.arr);
    
  }
  getDate()
  {
    for(let i=0; i<2; i++)
    {
      this.dateArray.push(new Date(this.myDate.setDate(this.myDate.getDate()+1)))
    }
    console.log(this.myDate);
  }
  changeTab(bool:boolean)
  { 
    this.changeField = bool
  }

  getStates()
  {
    this._fetch.getStateData().subscribe((data) => {
      this.statesArray = data
      //console.log(this.statesArray);
    })
  }

  getStateId(val:any)
  {
    this.stateId = val.target.value
    this._fetch.getDistrictData(this.stateId).subscribe((data) =>{
      this.districtArray = data
    })

    
  }

  getDistrictId(val:any)
  {
    this.districtId = val.target.value
    console.log(this.districtId);
    
  }

  getAllData()
  {
      this._fetch.slotUsingDistrictId(this.districtId,this.myDate).subscribe((data) =>{
        this.allDataByDistrictId = data,
        this.districtData = this.allDataByDistrictId.sessions        
        this.dataCount  = this.districtData.length 
      })
      this.allArrayByDistrictId()
  } 
  
  nextDate()
  {
    this.dateArray = []
    this.dateArray.push(new Date(this.myDate.setDate(this.myDate.getDate()+1)))
    this.getDate()  
  }
  previousDate()
  {
    this.dateArray = []
    let date = new Date()
    this.myDate = new Date(this.myDate.setDate(this.myDate.getDate()-5))
    console.log(this.myDate);
    
    console.log(date.getTime()<this.myDate.getTime());
    
    this.dateArray.push(new Date(this.myDate.setDate(this.myDate.getDate())))
    this.getDate() 
    
  }

  getPin(value:string)
  {
    this.pin = value  
    this._fetch.slotUsingPin(this.pin,this.myDate).subscribe((data) =>{
      this.allDataByDistrictId = data,
      this.districtData = this.allDataByDistrictId.sessions
      this.dataCount  = this.districtData.length 
    })  
    this._fetch.slotUsingPin(this.pin,this.dateArray[0]).subscribe( (data)=>{this.data1 = data})
      
      this._fetch.slotUsingPin(this.pin,this.dateArray[1]).subscribe( (data)=>{this.data2 = data})
      
      this._fetch.slotUsingPin(this.pin,this.dateArray[2]).subscribe( (data)=>{this.data3 = data}) 
  }

  allArrayByDistrictId()
  {
      this._fetch.slotUsingDistrictId(this.districtId,this.dateArray[0]).subscribe( (data)=>{this.data1 = data})
      
      this._fetch.slotUsingDistrictId(this.districtId,this.dateArray[1]).subscribe( (data)=>{this.data2 = data})
      
      this._fetch.slotUsingDistrictId(this.districtId,this.dateArray[2]).subscribe( (data)=>{this.data3 = data})     
  }

  
  
}
