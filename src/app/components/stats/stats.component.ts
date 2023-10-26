import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ListMemoryCardStatisticsChartRequest, ListTrainingStatisticsChartRequest, MemoryCardStatisticsChart, TrainingStatisticsChart } from 'src/app/interfaces/training.interface';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  trainingQuantity: number = 10;
  memoryCardQuantity: number = 10;
  trainingStatistics: TrainingStatisticsChart = {} as TrainingStatisticsChart;
  memoryCardStatistics: MemoryCardStatisticsChart = {} as MemoryCardStatisticsChart;
  trainingChartData: any;
  trainingChartOptions: any;

  memoryCardChartData: any;
  memoryCardChartOptions: any;

  constructor(
    private statisticsService: StatisticsService,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.listMemoryCardStatistics();
    this.listTrainingStatistics();
  }

  // list training statics for diagram
  listTrainingStatistics() {
    // Initialize the serviceRequest object
    const serviceRequest: ListTrainingStatisticsChartRequest = {
      quantity: this.trainingQuantity
    };

    this.statisticsService.listTrainingForChart(serviceRequest).subscribe({
      next: statistics => {
        this.trainingStatistics = statistics;
        this.setTrainingChart();
      },
      error: error => {
        this.toastr.error(this.translate.instant(error.error))
      }
    })
  }

   // list memoryCard statics for diagram
   listMemoryCardStatistics() {
    // Initialize the serviceRequest object
    const serviceRequest: ListMemoryCardStatisticsChartRequest = {
      quantity: this.memoryCardQuantity
    };

    this.statisticsService.listMemoryCardForChart(serviceRequest).subscribe({
      next: statistics => {
        this.memoryCardStatistics = statistics;
        this.setMemoryCardChart();
      },
      error: error => {
        this.toastr.error(this.translate.instant(error.error))
      }
    })
  }

  //numeric input change detection
  handleTrainingInput(event: any) {
    const value = event.value;
    if(value >= 500){
      this.trainingQuantity = 500;
      return;
    }

    this.trainingQuantity = value;
    this.listTrainingStatistics();
  }

  //numeric input change detection
  handleMemoryCardInput(event: any) {
    const value = event.value;
    if(value >= 500){
      this.memoryCardQuantity = 500;
      return;
    }

    this.memoryCardQuantity = value;
    this.listMemoryCardStatistics();
  }

  //Set chart
  setTrainingChart() {
    //Set colors
    const textColor = 'black';
    const textColorSecondary = 'black';
    const surfaceBorder = 'black';
    const memorySoundColor = 'green';
    const memoryNumerColor = 'purple';
    const memoryMatrixColor = 'red';
    const mathColor = 'blue';

    //Set chart data
    this.trainingChartData = {
      labels: this.trainingStatistics?.chartLabel,
      datasets: [
        {
          label: this.translate.instant('MemorySound'),
          data: this.trainingStatistics.memorySoundChartData,
          fill: false,
          borderColor: memorySoundColor,
          tension: 0.4
        },
        {
          label: this.translate.instant('MemoryNumber'),
          data: this.trainingStatistics.memoryNumberChartData,
          fill: false,
          borderColor: memoryNumerColor,
          tension: 0.4
        },
        {
          label:this.translate.instant('MemoryMatrix'),
          data: this.trainingStatistics.memoryMatrixChartData,
          fill: false,
          borderColor: memoryMatrixColor,
          tension: 0.4
        },
        {
          label: this.translate.instant('Math'),
          data: this.trainingStatistics.mathChartData,
          fill: false,
          borderColor: mathColor,
          tension: 0.4
        }
      ]
    };

    this.trainingChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          title: {
            display: true,
            text: 'score',
            color: textColorSecondary
          },
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

   //Set chart
   setMemoryCardChart() {
    //Set colors
    const textColor = 'black';
    const textColorSecondary = 'black';
    const surfaceBorder = 'black';
    const easyColor = 'green';
    const mediumColor = 'blue';
    const hardColor = 'red';
    const nightmareColor = 'purple';

    //Set chart data
    this.memoryCardChartData = {
      labels: this.memoryCardStatistics?.chartLabel,
      datasets: [
        {
          label: this.translate.instant('Easy'),
          data: this.memoryCardStatistics.easyChartData,
          fill: false,
          borderColor: easyColor,
          tension: 0.4
        },
        {
          label: this.translate.instant('Medium'),
          data: this.memoryCardStatistics.mediumChartData,
          fill: false,
          borderColor: mediumColor,
          tension: 0.4
        },
        {
          label:this.translate.instant('Hard'),
          data: this.memoryCardStatistics.hardChartData,
          fill: false,
          borderColor: hardColor,
          tension: 0.4
        },
        {
          label: this.translate.instant('Nightmare'),
          data: this.memoryCardStatistics.nightmareChartData,
          fill: false,
          borderColor: nightmareColor,
          tension: 0.4
        }
      ]
    };

    this.memoryCardChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          title: {
            display: true,
            text: 'steps',
            color: textColorSecondary
          },
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
}

