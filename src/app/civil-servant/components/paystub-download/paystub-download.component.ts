import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IPaystubYear, IPaystubMonth, IPaystubSheet } from '../../interfaces';

@Component({
  selector: 'paystub-download',
  templateUrl: 'paystub-download.component.html'
})
export class PaystubDownloadComponent {

  @Input() years: IPaystubYear[] = [];
  @Output() onSelectYear: EventEmitter<IPaystubYear> = new EventEmitter();
  @Input() months: IPaystubMonth[] = [];
  @Output() onSelectMonth: EventEmitter<IPaystubMonth> = new EventEmitter();
  @Input() sheets: IPaystubSheet[] = [];
  @Output() onSelectSheet: EventEmitter<IPaystubSheet> = new EventEmitter();
  @Input() numVinc: number;
  @Input() numFunc: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  selectYear(year: IPaystubYear): void {
    this.onSelectYear.emit(year);
  }

  selectMonth(month: IPaystubMonth): void {
    this.onSelectMonth.emit(month);
  }

  selectSheet(sheet: IPaystubSheet): void {
    this.onSelectSheet.emit(sheet);
  }

}

