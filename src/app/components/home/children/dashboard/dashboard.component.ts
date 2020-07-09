import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { UserMaintenanceService } from '../../../../services/user-maintenance.service';
import { Router } from '@angular/router';
import { Maintenance } from '../../../../models/maintenance';
import { Machine } from '../../../../models/machine';
import { MachineService } from '../../../../services/machine.service';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { UserMaintenance } from '../../../../models/user-maintenance';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  myChart: any;
  myPieChart: any;
  machineChart: any;
  lineChart: any;
  maintenanceToSend: Maintenance[];
  userMaintenanceListStarted: UserMaintenance[] = [];
  userMaintenanceListInProgress: UserMaintenance[] = [];
  userMaintenanceListCompleted: UserMaintenance[] = [];
  userMaintenance: UserMaintenance[] = [];

  machineList: Machine[];
  maintenanceList: Maintenance[];

  year: number;

  constructor(private userMaintenanceService: UserMaintenanceService,
    private machineService: MachineService,
    private maintenanceService: MaintenanceService,
    private router: Router) { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.createPieChart();
    this.getAllMaintenanceToSend();
    this.getAllUserMaintenanceByStatusStarted();
    this.getAllUserMaintenanceByStatusInProgress();
    this.getAllUserMaintenanceByStatusCompleted();
    this.getAllUserMaintecance();
    this.getAllMachine();
    this.createMachineChart();
    this.createLineChart();

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

  createMachineChart() {
    this.machineChart = [];
    this.machineChart = new Chart('bar-chart', {
      type: 'bar',
      data: {
        labels: ['Ordinaria', 'Straordinaria'],
        datasets: [
          {
            label: 'Tipo Manutenzione',
            backgroundColor: ['rgba(229, 85, 81)', 'rgba(245, 183, 109)'],
            data: [],
          }
        ]
      },
      options: {
        legend: { display: false },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              line: false
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
        labels: ['To Send', 'Active', 'In Progress', 'Completed'],
        show: true,
        datasets: [{
          label: '# Status Maintenance',
          data: [],
          backgroundColor: [
            'rgba(128, 128, 128)',
            'rgba(229, 85, 81)',
            'rgba(245, 183, 109)',
            'rgba(106, 188, 189)',
          ],

          borderWidth: [1, 1, 1, 1]
        }],
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: true,
      },
    });
  }

  getAllMaintenanceToSend() {
    this.maintenanceService.getAllByStatus('to-send').subscribe(data => {
      this.maintenanceToSend = data;
      this.addData(this.myPieChart, this.maintenanceToSend.length);
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

  getAllUserMaintecance() {


    this.userMaintenanceService.getAllUM().subscribe(data => {
      this.userMaintenance = data;

      const ordinaria = [];
      const straordinaria = [];

      const ord1 = [];
      const ord2 = [];
      const ord3 = [];
      const ord4 = [];
      const ord5 = [];
      const ord6 = [];
      const ord7 = [];
      const ord8 = [];
      const ord9 = [];
      const ord10 = [];
      const ord11 = [];
      const ord12 = [];

      const stra1 = [];
      const stra2 = [];
      const stra3 = [];
      const stra4 = [];
      const stra5 = [];
      const stra6 = [];
      const stra7 = [];
      const stra8 = [];
      const stra9 = [];
      const stra10 = [];
      const stra11 = [];
      const stra12 = [];

      for (let i = 0; i < this.userMaintenance.length; i++) {
        if (this.userMaintenance[i].maintenance.type === 'Ordinaria') {
          if (this.userMaintenance[i].date.includes(this.year + '-01')) {
            ord1.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-02')) {
            ord2.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-03')) {
            ord3.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-04')) {
            ord4.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-05')) {
            ord5.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-06')) {
            ord6.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-07')) {
            ord7.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-08')) {
            ord8.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-09')) {
            ord9.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-10')) {
            ord10.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-11')) {
            ord11.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-12')) {
            ord12.push(this.userMaintenance[i]);
          }
        }
        if (this.userMaintenance[i].maintenance.type === 'Straordinaria') {
          if (this.userMaintenance[i].date.includes(this.year + '-01')) {
            stra1.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-02')) {
            stra2.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-03')) {
            stra3.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-04')) {
            stra4.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-05')) {
            stra5.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-06')) {
            stra6.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-07')) {
            stra7.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-08')) {
            stra8.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-09')) {
            stra9.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-10')) {
            stra10.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-11')) {
            stra11.push(this.userMaintenance[i]);
          }
          if (this.userMaintenance[i].date.includes(this.year + '-12')) {
            stra12.push(this.userMaintenance[i]);
          }
        }
      }
      ordinaria.push(ord1.length);
      ordinaria.push(ord2.length);
      ordinaria.push(ord3.length);
      ordinaria.push(ord4.length);
      ordinaria.push(ord5.length);
      ordinaria.push(ord6.length);
      ordinaria.push(ord7.length);
      ordinaria.push(ord8.length);
      ordinaria.push(ord9.length);
      ordinaria.push(ord10.length);
      ordinaria.push(ord11.length);
      ordinaria.push(ord12.length);

      straordinaria.push(stra1.length);
      straordinaria.push(stra2.length);
      straordinaria.push(stra3.length);
      straordinaria.push(stra4.length);
      straordinaria.push(stra5.length);
      straordinaria.push(stra6.length);
      straordinaria.push(stra7.length);
      straordinaria.push(stra8.length);
      straordinaria.push(stra9.length);
      straordinaria.push(stra10.length);
      straordinaria.push(stra11.length);
      straordinaria.push(stra12.length);

      const dataChart = [];
      dataChart.push(ordinaria);
      dataChart.push(straordinaria);
      this.addDataLine(dataChart);
    });
  }

  createLineChart() {
    this.lineChart = new Chart('line-chart', {
      type: 'line',
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        },
      }
    });
  }

  addDataLine(data) {
    this.lineChart.config.data.datasets = [];
    this.lineChart.config.data.labels = [];

    const labels = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settmbre', 'Ottobre', 'Novenmbre', 'Dicembre'];
    const colors = ['rgba(229, 85, 81)', 'rgba(245, 183, 109)'];
    let label: string;

    this.lineChart.config.data.labels = labels;

    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        label = 'Ordinarie';
      }
      if (i === 1) {
        label = 'Straordinarie';
      }
      const dataSet = {
        label,
        data: data[i],
        borderColor: colors[i],
        fill: false,
      };

      this.lineChart.config.data.datasets.push(dataSet);
    }

    this.lineChart.update();
  }
}
