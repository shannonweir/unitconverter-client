import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllMetricTypes() {
    return this.httpClient.get('http://localhost:8080/ayo/api/metric/types');
  }

  public getAllUnitsByMetricType(metricType) {
    const params = new HttpParams()
      .set('metricType', metricType);
    return this.httpClient.get('http://localhost:8080/ayo/api/metric/units', {params: params});
  }

  public convert(measurement, metricType, unitConversion) {
    const params = new HttpParams()
      .set('measurement', measurement)
      .set('metricType', metricType)
      .set('unitConversion', unitConversion);
    return this.httpClient.post('http://localhost:8080/ayo/api/convert', null,{params: params});
  }
}
