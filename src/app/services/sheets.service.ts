import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  private v4API = "https://sheets.googleapis.com/v4/spreadsheets";
  private xanaduSheetId = "1q9moPkLlk1qX6RqdtD2znTkTOlkFTNUkaoO1y7BVLZ8";
  private deliSheetId = "1MrF3IBS6988rsFecQhWqwzkQpRfKAoDZ1anmjVuAylw";
  private pristineSheet = "1K_9_n41ophXBu-GcCtRmylKWZU0MlmqNePME1PbF7w8";
  // https://docs.google.com/spreadsheets/d/1FwcMF6JPeLMH2JdnyqF7d6TGBt9E5YV1paEhUN39ImE/edit?usp=sharing
  private harmonySheet = "1FwcMF6JPeLMH2JdnyqF7d6TGBt9E5YV1paEhUN39ImE";
  private q1 = "ranges=Deeds!A2:D";
  private q2 = "ranges=Canals!A2:I";
  private q3 = "ranges=Bridges!A2:E";
  private q4 = "ranges=Landmarks!A2:E";
  private q5 = "ranges=Highways!A2:B";
  private yourMotherSmokesCrack = "AIzaSyDi4nKWGegwmPuesj8GLa3kRaiFw0I-v2g";

  private _v4SheetsAPIXanaduCombinedData: string = `${this.v4API}/${this.xanaduSheetId}/values:batchGet?${this.q1}&${this.q2}&${this.q3}&${this.q4}&key=${this.yourMotherSmokesCrack}`;
  private _v4SheetsAPIDeliCombinedData: string = `${this.v4API}/${this.deliSheetId}/values:batchGet?${this.q1}&${this.q2}&${this.q3}&${this.q4}&${this.q5}&key=${this.yourMotherSmokesCrack}`;
  private _v4SheetsAPIPristineCombinedData: string = `${this.v4API}/${this.pristineSheet}/values:batchGet?${this.q1}&${this.q2}&${this.q3}&${this.q4}&${this.q5}&key=${this.yourMotherSmokesCrack}`;
  private _v4SheetsAPIHarmonyCombinedData: string = `${this.v4API}/${this.harmonySheet}/values:batchGet?${this.q1}&${this.q2}&${this.q3}&${this.q4}&${this.q5}&key=${this.yourMotherSmokesCrack}`;


  constructor(private http: HttpClient) { }

  getXanaduData() {
    return this.http.get(this._v4SheetsAPIXanaduCombinedData);
  }

  getDeliData() {
    return this.http.get(this._v4SheetsAPIDeliCombinedData);
  }

  getPristineData() {
    return this.http.get(this._v4SheetsAPIPristineCombinedData);
  }

  getHarmonyData() {
    return this.http.get(this._v4SheetsAPIHarmonyCombinedData);
  }
}
