import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import {UserMaintenanceService} from '../../../../services/user-maintenance.service';
import {Router} from '@angular/router';
import {Maintenance} from '../../../../models/maintenance';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  myChart: any;
  myPieChart: any;
  myLineChart: any;
  userMaintenanceListStarted: Maintenance[] = [];
  userMaintenanceListInProgress: Maintenance[] = [];
  userMaintenanceListCompleted: Maintenance[] = [];

  constructor(private userMaintenanceService: UserMaintenanceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUserMaintenanceByStatusStarted();
    this.getAllUserMaintenanceByStatusInProgress();
    this.getAllUserMaintenanceByStatusCompleted();
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

  createPieChart() {
    this.myPieChart = new Chart('myPieChart', {
      type: 'pie',
      data: {
        labels: ['Attive', 'In Corso', 'Completate'],
        datasets: [{
          label: 'Numero Manutenzioni',
          data: [this.userMaintenanceListStarted.length, this.userMaintenanceListInProgress.length, this.userMaintenanceListCompleted.length],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: [1, 1, 1]
        }],
      },
      options: {
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
      this.createPieChart();
    });
  }
  getAllUserMaintenanceByStatusInProgress() {
    this.userMaintenanceService.getAllUMByStatus('in-progress').subscribe(data => {
      console.log(data);
      this.userMaintenanceListInProgress = data;
      this.createPieChart();
    });
  }
  getAllUserMaintenanceByStatusCompleted() {
    this.userMaintenanceService.getAllUMByStatus('completed').subscribe(data => {
      console.log(data);
      this.userMaintenanceListCompleted = data;
      this.createPieChart();
    });
  }
}
