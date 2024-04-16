import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuppressionDialogComponent } from './suppression-dialog/suppression-dialog.component';
import { UserListService } from './user-list.service';
import { UserRequest } from 'src/shared/models/UserRequest.model';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { errorMessages } from 'src/shared/errorMessages';
import { HttpResponse } from '@angular/common/http';
import { UserResponse } from 'src/shared/models/UserResponse.model';
import { Pagination } from 'src/shared/models/Pagination.model';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { ChangepasswordDialogComponent } from './changepassword-dialog/changepassword-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  usersDataSource: MatTableDataSource<UserResponse> = new MatTableDataSource<UserResponse>();
  displayedColumns: string[] = [
    'id',
    'lastName',
    'firstName',
    'email',
    'birthDate',
    'changePassword',
    'deleteButton',
  ];
  currentPage = 0;
  pageSize = 10; // Choisissez la taille de la page selon votre besoin
  totalElements = 0;

  constructor(
    public dialog: MatDialog,
    private userListService: UserListService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchUsersData();
  }

  fetchUsersData() {
    this.userListService.getUsers(this.currentPage, this.pageSize).subscribe((data: Pagination) => {
      this.usersDataSource.data = data.content;
      this.totalElements = data.totalElements;
    });
  }

  deleteUser(user: UserResponse): void {
    const dialogRef = this.dialog.open(SuppressionDialogComponent, {
      data: {
        title: 'Voulez vous vraiment supprimer cet utilisateur',
        animal: user.email,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userListService.deleteUserById(user.id).subscribe(
          (response: HttpResponse<any>) => {
            if (response.status === 200) {
              this.toastr.success(errorMessages.userDeleteSucces, 'Succès', { closeButton: true });
              this.fetchUsersData();
            }
          },
          (error) => {
            this.toastr.error(errorMessages.erreurHTTP, 'error', { closeButton: true });
            this.fetchUsersData();
          }
        );
      }
    });
  }

  changePasswordById(user: UserResponse): void {
    const dialogRef = this.dialog.open(ChangepasswordDialogComponent, {
      data: {
        title: 'Voulez vous vraiment changer le mot de passe de cet utilisateur',
        animal: user.email,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userListService.changePasswordById(user.id, result).subscribe(
          (response: HttpResponse<any>) => {
            if (response.status === 200) {
              this.toastr.success(errorMessages.passwordChangedByAdminSuccess, 'Succès', { closeButton: true });
              this.fetchUsersData();
            }
          },
          (error) => {
            this.toastr.error(errorMessages.erreurHTTP, 'error', { closeButton: true });
            this.fetchUsersData();
          }
        );
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchUsersData();
  }
}
