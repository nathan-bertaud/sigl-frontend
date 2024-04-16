import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Pagination } from 'src/shared/models/Pagination.model';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  lastName: string = sessionStorage.getItem('nom')!;
  firstName: string = sessionStorage.getItem('prenom')!;
  displayedColumns: string[] = [
    'title',
    'startDate',
    'endDate',
    'place',
    'semestre',
  ];

  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  eventsDataSource: MatTableDataSource<Event> = new MatTableDataSource<Event>();
  constructor(
    private homeService: HomeService,
    private authService: AuthentificationService
  ) {}
  ngOnInit(): void {
    if (this.hasRole('ROLE_APPRENTI')) {
      this.fetchEventsData();
    }
  }

  fetchEventsData() {
    this.homeService
      .getAllEventByApprentice(this.currentPage, this.pageSize)
      .subscribe((data: Pagination) => {
        this.eventsDataSource.data = data.content;
        this.totalElements = data.totalElements;
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchEventsData();
  }

  hasRole(role: string): boolean {
    return this.authService.getRoles().includes(role);
  }
}
