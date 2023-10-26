import { Injectable } from '@angular/core';
import { BaseService } from '../common/services/base.service';
import { HttpClient } from '@angular/common/http';
import { CreateMemoryCardStatisticsRequest, CreateTrainingStatisticsRequest, ListMemoryCardStatisticsChartRequest, ListTrainingStatisticsChartRequest, MemoryCardStatistics, MemoryCardStatisticsChart, TrainingStatistics, TrainingStatisticsChart } from '../interfaces/training.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  //Get training statistics list
  listTraining() {
    return this.http.get<TrainingStatistics[]>(this.baseUrl + 'Statistics/ListTraining');
  }
  //Get Training statistics list for chart
  listTrainingForChart(request: ListTrainingStatisticsChartRequest) {
    const params = this.createParams(request);
    return this.http.get<TrainingStatisticsChart>(this.baseUrl + 'Statistics/listTrainingForChart', { params });
  }
  //Create Training statistics
  createTraining(request: CreateTrainingStatisticsRequest) {
    return this.http.post<TrainingStatistics>(this.baseUrl + 'Statistics/CreateTraining', request);
  }

  // Delete all Training statistics by logined user id
  deleteAllTraining() {
    return this.http.delete(`${this.baseUrl}Statistics/DeleteAllTraining`);
  }


   //Get MemoryCard statistics list
   listMemoryCard() {
    return this.http.get<MemoryCardStatistics[]>(this.baseUrl + 'Statistics/ListMemoryCard');
  }
  //Get MemoryCard statistics list for chart
  listMemoryCardForChart(request: ListMemoryCardStatisticsChartRequest) {
    const params = this.createParams(request);
    return this.http.get<MemoryCardStatisticsChart>(this.baseUrl + 'Statistics/listMemoryCardForChart', { params });
  }
  //Create MemoryCard statistics
  createMemoryCard(request: CreateMemoryCardStatisticsRequest) {
    return this.http.post<MemoryCardStatistics>(this.baseUrl + 'Statistics/CreateMemoryCard', request);
  }

  // Delete all MemoryCard statistics by logined user id
  deleteAllMemoryCard() {
    return this.http.delete(`${this.baseUrl}Statistics/DeleteAllMemoryCard`);
  }
}
