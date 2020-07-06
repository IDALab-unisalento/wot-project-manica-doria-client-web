import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import {UserMaintenanceService} from '../../../../services/user-maintenance.service';
import {Router} from '@angular/router';
import {Maintenance} from '../../../../models/maintenance';
import {Machine} from '../../../../models/machine';
import {MachineService} from '../../../../services/machine.service';
import {MaintenanceService} from '../../../../services/maintenance.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  myChart: any;
  myPieChart: any;
  machineChart: any;
  myLineChart: any;
  userMaintenanceListStarted: Maintenance[] = [];
  userMaintenanceListInProgress: Maintenance[] = [];
  userMaintenanceListCompleted: Maintenance[] = [];

  machineList: Machine[];
  maintenanceList: Maintenance[];

  constructor(private userMaintenanceService: UserMaintenanceService,
              private machineService: MachineService,
              private maintenanceService: MaintenanceService,
              private router: Router) { }

  ngOnInit(): void {
    this.createPieChart();
    this.getAllUserMaintenanceByStatusStarted();
    this.getAllUserMaintenanceByStatusInProgress();
    this.getAllUserMaintenanceByStatusCompleted();
    this.getAllMachine();
    this.createMachineChart();

    /*this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });*/
  }

  /*createLineChart() {
    this.myLineChart = new Chart('myLineChart', {
      type: 'line',
      data: data,
      options: options
    });
  }*/

  createMachineChart() {
    this.machineChart = [];
    this.machineChart = new Chart('bar-chart', {
      type: 'bar',
      data: {
        labels: ['Ordinaria', 'Straordinaria'],
        datasets: [
          {
            label: 'Tipo Manutenzione',
            backgroundColor: ['#3e95cd', '#8e5ea2'],
            data: [],
          }
        ]
      },
      options: {
        legend: {display: true},
        title: {
          display: true,
          text: 'Numero Manutenzioni Ordianrie/Straordinarie'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createPieChart() {
    this.myPieChart = new Chart('myPieChart', {
      type: 'doughnut',
      data: {
        labels: ['Attive', 'In Corso', 'Completate'],
        datasets: [{
          label: 'Numero Manutenzioni',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
          ],
          /*borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],*/
          borderWidth: [1, 1, 1]
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        title: {
          display: true,
          text: 'Numero Manutenzioni'
        }
      }
    });
  }

  getAllUserMaintenanceByStatusStarted() {
    this.userMaintenanceService.getAllUMByStatus('started').subscribe(data => {
      console.log(data);
      this.userMaintenanceListStarted = data;
      this.addData(this.myPieChart, this.userMaintenanceListStarted.length);
    });
  }
  getAllUserMaintenanceByStatusInProgress() {
    this.userMaintenanceService.getAllUMByStatus('in-progress').subscribe(data => {
      console.log(data);
      this.userMaintenanceListInProgress = data;
      this.addData(this.myPieChart, this.userMaintenanceListInProgress.length);
    });
  }
  getAllUserMaintenanceByStatusCompleted() {
    this.userMaintenanceService.getAllUMByStatus('completed').subscribe(data => {
      console.log(data);
      this.userMaintenanceListCompleted = data;
      this.addData(this.myPieChart, this.userMaintenanceListCompleted.length);
    });
  }

  getAllMachine() {
    this.machineService.getAllMachine().subscribe(data => {
      this.machineList = data;
    });
  }

  getAllMaintenanceByMachine() {
    const machine = (document.getElementById('inputGroupSelect01') as HTMLInputElement).value;
    this.maintenanceService.getMaintenanceByMachine(machine).subscribe(data => {
      this.maintenanceList = data;
      console.log(this.maintenanceList);
      const ordinaria = [];
      const straordinaria = [];
      for (let i = 0; i < this.maintenanceList.length; i++) {
        if (this.maintenanceList[i].type === 'Ordinaria') {
          ordinaria.push(this.maintenanceList[i]);
        }
        if (this.maintenanceList[i].type === 'Straordinaria') {
          straordinaria.push(this.maintenanceList[i]);
        }
      }
      console.log(ordinaria);
      console.log(straordinaria);

      this.removeData(this.machineChart);
      this.removeData(this.machineChart);
      this.addData(this.machineChart, ordinaria.length);
      this.addData(this.machineChart, straordinaria.length);
    });
  }

  addData(chart, data) {
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  removeData(chart) {
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }
}
