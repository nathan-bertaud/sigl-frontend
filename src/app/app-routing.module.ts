import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './admin/admin.component';
import { CompteEntrepriseComponent } from './compte-entreprise/compte-entreprise.component';
import { NotificationComponent } from './notification/notification.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { LivrableComponent } from './livrable/livrable.component';
import { AuthGuard } from './authentification/guards/authentification.gard';
import { MensualNoteComponent } from './mensual-note/mensual-note.component';
import { AdminGuard } from './authentification/guards/admin.guard';
import { ApprentiGuard } from './authentification/guards/apprenti.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ApprenticeInfoComponent } from './apprentice-info/apprentice-info.component';
import { ApprenticeMentorGuard } from './authentification/guards/apprenticeMentor.guard';
import { CoordinatorGuard } from './authentification/guards/coordinator.guard';
import { BiannualMeetingComponent } from './event/biannual-meeting/biannual-meeting.component';
import { KeydateComponent } from './event/key-date/key-date.component';
import { CertificatCerfaComponent } from './certificat-cerfa/certificat-cerfa.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { HRGuard } from './authentification/guards/hr.guard';
import { EducationalTutorGuard } from './authentification/guards/educationalTutor.guard';
import { GrilleEvaluationComponent } from './grille-evaluation/grille-evaluation.component';
import { NewEventComponent } from './event/new-event/new-event.component';
import { ListePromotionsComponent } from './liste-promotions/liste-promotions.component';
import { AfficherEtudiantsComponent } from './afficher-etudiants/afficher-etudiants.component';
import { GetDocument } from './get-documents/get-documents.component';
import { JuryComponent } from './jury/jury.component';
import { VivaComponent } from './viva/viva.component';
import { EducationalTutorOrApprentiGuard } from './authentification/guards/apprenticeEducationalTutor.guard';
import { ListeApprentisTuteurComponent } from './liste-apprentis-tuteur/liste-apprentis-tuteur.component';

const routes: Routes = [
  { path: 'login', component: AuthentificationComponent },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-document',
        component: AddDocumentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'get-document',
        component: GetDocument,
        canActivate: [AuthGuard],
      },
      {
        path: 'company-account',
        component: CompteEntrepriseComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'notification',
        component: NotificationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-list',
        component: UserListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'livrable',
        component: LivrableComponent,
        canActivate: [AuthGuard, ApprentiGuard],
      },
      {
        path: 'mensual-note',
        component: MensualNoteComponent,
        canActivate: [AuthGuard, ApprentiGuard],
      },
      {
        path: 'createUser',
        component: CreateUserComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'apprentice-info',
        component: ApprenticeInfoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'biannual-meeting',
        component: BiannualMeetingComponent,
        canActivate: [AuthGuard,ApprentiGuard],
      },
      {
        path: 'key-date',
        component: KeydateComponent,
        canActivate: [AuthGuard,CoordinatorGuard],
      },
      {
        path: 'evaluation',
        component: ListeApprentisTuteurComponent,
        canActivate: [AuthGuard, EducationalTutorGuard],
      },
      {
        path: 'grille-evaluation/:id',
         component: GrilleEvaluationComponent,
         canActivate: [AuthGuard, EducationalTutorOrApprentiGuard],
      },
      {
        path: 'certificat-cerfa',
        component: CertificatCerfaComponent,
        canActivate: [AuthGuard, HRGuard],
      },
      {
        path: 'event',
        component: NewEventComponent,
        canActivate: [AuthGuard,AdminGuard],
      },
      {
        path: 'jury',
        component: JuryComponent,
        canActivate: [AuthGuard, CoordinatorGuard],
      },
      {
        path: 'vivas',
        component: VivaComponent,
        canActivate: [AuthGuard,CoordinatorGuard],
      },
      {
        path: 'liste-promotions',
        component: ListePromotionsComponent,
        canActivate: [AuthGuard],
      },
      { path: 'afficher-etudiants/:promotion', component: AfficherEtudiantsComponent, canActivate: [AuthGuard] },
      { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
