import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-changepassword-dialog',
  templateUrl: './changepassword-dialog.component.html',
  styleUrls: ['./changepassword-dialog.component.css']
})
export class ChangepasswordDialogComponent {
  
  newPassword: string = ''; 

  constructor(
    public dialogRef: MatDialogRef<ChangepasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  title: string;
  userEmail: string;
}
