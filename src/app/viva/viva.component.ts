import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/shared/models/Pagination.model';
import { errorMessages } from 'src/shared/errorMessages';import { VivaService } from './viva.service';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Viva } from 'src/shared/models/Viva.model';
import { MatDialog } from '@angular/material/dialog';
import { EditVivaComponent } from './edit-viva/edit-viva.component';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viva',
  templateUrl: './viva.component.html',
  styleUrls: ['./viva.component.css']
})
export class VivaComponent implements OnInit{
  displayedColumns: string[] = [
    'juries',
    'apprentice',
    'startDate',
    'endDate',
    'place',
    'semestre',
    'title',
    'edit'
  ];
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  vivasDataSource: MatTableDataSource<Viva> = new MatTableDataSource<Viva>();

  constructor(
    private vivaService: VivaService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchJuriesVivasData();
  }

  fetchJuriesVivasData() {
    this.vivaService
      .getJuries(this.currentPage, this.pageSize)
      .subscribe((data: Pagination) => {
        this.vivasDataSource.data = data.content;
        this.totalElements = data.totalElements;
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchJuriesVivasData();
  }

  editViva(element:any): void {
    const dialogRef = this.dialog.open(EditVivaComponent, {
      data: {
        id: element.id,
        title: element?.title,
        startDate: element?.startDate,
        endDate:element?.endDate,
        semestre:element?.semestre,
        place:element?.place,
        idApprentice:element?.apprentice?.idApprentice,
        nameApprentice:element?.apprentice?.nameApprentice,
        firstNameApprentice:element?.apprentice?.firstNameApprentice,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vivaService.editViva(result.id, result.startDate,result.endDate,result.idApprenti,result.title,result.semestre,result.place).subscribe(
          (response: HttpResponse<any>) => {
            if (response.status === 200) {
              this.toastr.success(errorMessages.passwordChangedByAdminSuccess, 'Succès', { closeButton: true });
              this.fetchJuriesVivasData();
            }
          },
          (_error: any) => {
            this.toastr.error(errorMessages.erreurHTTP, 'error', { closeButton: true });
            this.fetchJuriesVivasData();
          }
        );
      }
    });
  }
}
