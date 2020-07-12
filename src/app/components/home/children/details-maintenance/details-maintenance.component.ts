import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { Maintenance } from '../../../../models/maintenance';
import { StepService } from '../../../../services/step.service';
import { Step } from '../../../../models/step';
import { UserMaintenance } from '../../../../models/user-maintenance';
import { UserMaintenanceService } from '../../../../services/user-maintenance.service';
import Chart from 'chart.js';
import {TimeStepPipe} from '../../../../services/pipes/time-step.pipe';

@Component({
  selector: 'app-details-maintenance',
  templateUrl: './details-maintenance.component.html',
  styleUrls: ['./details-maintenance.component.scss']
})
export class DetailsMaintenanceComponent implements OnInit {

  userMaintenance: UserMaintenance = {} as UserMaintenance;
  stepList: Step[];
  stepChart: any;

  constructor(private route: ActivatedRoute,
              private userMaintenanceService: UserMaintenanceService,
              private stepService: StepService,
              private pipeStep: TimeStepPipe) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id-maintenance');
    console.log(id);
    this.getDetailsMaintenance(id);
  }

  getDetailsMaintenance(id: number) {
    this.userMaintenanceService.getUMById(id).subscribe(data => {
      console.log(data);
      this.userMaintenance = data;
      this.getStepsByMaintenance(this.userMaintenance.maintenance.id);
    });
  }

  getStepsByMaintenance(id: number) {
    this.stepService.getStepByMaintenanceId(id).subscribe(data => {
      console.log(data);
      this.stepList = data;
      this.stepChartGrouped();
    });
  }

  stepChartGrouped() {
    const numberStep = [];
    const stepDuration = [];
    const stepEstimateDuration = [];
    for (let i = 0; i < this.stepList.length; i++) {
      const t = this.pipeStep.transform(this.stepList[i].estimateDuration);
      console.log(t);
      numberStep.push('Step ' + (this.stepList[i].numbered).toString());
      console.log(numberStep);
      stepDuration.push(this.pipeStep.transform(this.stepList[i].duration));
      stepEstimateDuration.push(this.pipeStep.transform(this.stepList[i].estimateDuration));
    }
    this.stepChart = new Chart('bar-chart-grouped', {
      type: 'bar',
      data: {
        labels: numberStep,
        datasets: [
          {
            label: 'Durata Stimata',
            backgroundColor: 'rgba(229, 85, 81)',
            data: stepEstimateDuration
          }, {
            label: 'Durata Effettiva',
            backgroundColor: 'rgba(245, 183, 109)',
            data: stepDuration
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Durata Step'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
      }
    });
    /*this.stepChart = new Chart('bar-chart-grouped', {
      type: 'bar',
      data: {
        labels: ['1900', '1950', '1999', '2050'],
        datasets: [
          {
            label: 'Africa',
            backgroundColor: "#3e95cd",
            data: [133,221,783,2478]
          }, {
            label: 'Europe',
            backgroundColor: "#8e5ea2",
            data: [408,547,675,734]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Population growth (millions)'
        }
      }
    });*/
  }

}
