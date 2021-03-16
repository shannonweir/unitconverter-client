import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-unitconversion',
  templateUrl: './unitconversion.component.html',
  styleUrls: ['./unitconversion.component.css']
})
export class UnitconversionComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  metricTypes = [];
  units = [];
  selectedMetric = null;
  selectedFromUnit: { symbol: '' };
  selectedToUnit: { symbol: '' };
  measurement = null;
  result = null;

  formGroup = new FormGroup({
    metricTypeSelect: new FormControl('', Validators.required),
    fromUnitSelect: new FormControl('', Validators.required),
    toUnitSelect: new FormControl('', Validators.required),
    measurementInput: new FormControl(this.measurement, [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern('^[0-9]*$')
    ]),
    resultInput: new FormControl(this.result),
  });

  ngOnInit() {
    this.apiService.getAllMetricTypes().subscribe((data: any[]) => {
      console.log(data);
      this.metricTypes = data;
    });
  }

  selectMetricType(value) {
    if (value != null) {
      this.selectedMetric = value;
      this.getUnits(this.selectedMetric.name.toUpperCase());
    }
  }

  getUnits(metricType) {
    this.apiService.getAllUnitsByMetricType(metricType).subscribe((data: any[]) => {
      console.log(data);
      this.units = data;
      this.selectedFromUnit = this.units[0];
      this.selectedToUnit = this.units[0];
      this.calc();
    });
  }

  compute(event, control) {
    this.selectedFromUnit = (control === 'fromUnit') ? event : this.selectedFromUnit;
    this.selectedToUnit = (control === 'toUnit') ? event : this.selectedToUnit;
    this.calc();
  }

  calc() {
    if (this.measurement != null && this.selectedFromUnit != null && this.selectedToUnit != null) {
      console.log('measurement: ' + this.measurement);
      console.log('selectedFromUnit: ' + this.selectedFromUnit.symbol);
      console.log('selectedToUnit: ' + this.selectedToUnit.symbol);
      const metricType = this.selectedMetric.name.toUpperCase();
      const selectFromUnitSymbol = this.selectedFromUnit.symbol;
      const selectToUnitSymbol = this.selectedToUnit.symbol;
      const unitConversion = selectFromUnitSymbol.concat('_').concat(selectToUnitSymbol);
      this.apiService.convert(parseFloat(this.measurement), metricType, unitConversion).subscribe((result: any) => {
        console.log('result: ' + result);
        this.result = result.result;
      });
    }
  }

}
