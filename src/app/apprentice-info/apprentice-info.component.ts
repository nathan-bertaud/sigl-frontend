import { Component } from '@angular/core';
import { ApprenticeInfoService } from './apprentice-info.service';
import { Apprentice } from 'src/shared/models/Apprentice.model';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-apprentice-info',
  templateUrl: './apprentice-info.component.html',
  styleUrls: ['./apprentice-info.component.css'],
  providers: [DatePipe],
})
export class ApprenticeInfoComponent {
  apprenticeList: Apprentice[] = [];
  loading: boolean = true;
  selectedApprentice: Apprentice | null = null;

  constructor(
    private apprenticeInfoService: ApprenticeInfoService,
    private toastr: ToastrService
  ) {
    this.apprenticeInfoService.getApprenticesInfo().subscribe(
      (response) => {
        this.apprenticeList = response.body;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la requête', error);
        this.toastr.error('Erreur lors du changement de mot passe', 'Erreur', {
          closeButton: true,
        });
      }
    );
  }
}
