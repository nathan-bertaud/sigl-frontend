import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HeaderComponent } from './header/header.component';
import { AuthentificationService } from './authentification/authentification.service';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ContentComponent } from './content/content.component';
import { LayoutComponent } from './layout/layout.component';
import { MatIconModule } from '@angular/material/icon';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateUserService } from './create-user/create-user.service';
import { CompteEntrepriseComponent } from './compte-entreprise/compte-entreprise.component';
import { CompteEntrepriseService } from './compte-entreprise/compte-entreprise.service';
import { UserListComponent } from './user-list/user-list.component';
import { SuppressionDialogComponent } from './user-list/suppression-dialog/suppression-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LivrableComponent } from './livrable/livrable.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AuthInterceptor } from './authentification/authentification.interceptor';
import { MensualNoteComponent } from './mensual-note/mensual-note.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ChangePasswordService } from './change-password/change-password.service';
import { MensualNoteService } from './mensual-note/mensual-note.component.service';
import { BiannualMeetingComponent } from './event/biannual-meeting/biannual-meeting.component';
import { ApprenticeInfoComponent } from './apprentice-info/apprentice-info.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CertificatCerfaComponent } from './certificat-cerfa/certificat-cerfa.component';
import { CertificatCerfaService } from './certificat-cerfa/certificat-cerfa.service';
import { AddDocumentComponent } from './add-document/add-document.component';
import { AddDocumentService } from './add-document/add-document.service';
import { ChangepasswordDialogComponent } from './user-list/changepassword-dialog/changepassword-dialog.component';

import { KeydateComponent } from './event/key-date/key-date.component';
import { NewEventComponent } from './event/new-event/new-event.component';
import { GrilleEvaluationComponent } from './grille-evaluation/grille-evaluation.component';
import { GetDocument} from './get-documents/get-documents.component';
import { DocumentService } from './get-documents/get-documents.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { JuryComponent } from './jury/jury.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { VivaComponent } from './viva/viva.component';
import { EditVivaComponent } from './viva/edit-viva/edit-viva.component';
import { GrilleEvaluationService } from './grille-evaluation/grille-evaluation.service';
import { ListeApprentisTuteurComponent } from './liste-apprentis-tuteur/liste-apprentis-tuteur.component';
import { ListeApprentisTuteurService } from './liste-apprentis-tuteur/liste-apprentis-tuteur.service';
import { ListePromotionsComponent } from './liste-promotions/liste-promotions.component';
import { AfficherEtudiantsComponent } from './afficher-etudiants/afficher-etudiants.component';
import { AfficherEtudiantService } from './afficher-etudiants/afficher-etudiant.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    HomeComponent,
    LayoutComponent,
    AdminComponent,
    ContentComponent,
    ChangePasswordComponent,
    CompteEntrepriseComponent,
    HeaderComponent,
    NotificationComponent,
    CreateUserComponent,
    CompteEntrepriseComponent,
    ProfileComponent,
    HeaderComponent,
    NotificationComponent,
    CompteEntrepriseComponent,
    LivrableComponent,
    UserListComponent,
    SuppressionDialogComponent,
    MensualNoteComponent,
    LivrableComponent,
    MensualNoteComponent,
    UnauthorizedComponent,
    ApprenticeInfoComponent,
    BiannualMeetingComponent,
    NotFoundComponent,
    CertificatCerfaComponent,
    AddDocumentComponent,
    ChangepasswordDialogComponent,
    KeydateComponent,
    NewEventComponent,
    GrilleEvaluationComponent,
    GetDocument,
    AfficherEtudiantsComponent,
    ListePromotionsComponent,
    ListeApprentisTuteurComponent,
    JuryComponent,
    VivaComponent,
    EditVivaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
    }),
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatAutocompleteModule
  ],
  providers: [
    AuthentificationService,
    HttpClient,
    CreateUserService,
    CompteEntrepriseService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ChangePasswordService,
    MensualNoteService,
    CertificatCerfaService,
    AddDocumentService,
    AfficherEtudiantService,
    DocumentService,
    GrilleEvaluationService,
    ListeApprentisTuteurService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
