import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListNotesComponent } from "./backOffice/components/note-management/list-notes/list-notes.component";
import { AddNoteComponent } from "./backOffice/components/note-management/add-note/add-note.component";
import { UpdateNoteComponent } from "./backOffice/components/note-management/update-note/update-note.component";
import { DetailsNoteComponent } from "./backOffice/components/note-management/details-note/details-note.component";
import { ListPrescriptionsComponent } from "./backOffice/components/prescription-management/list-prescriptions/list-prescriptions.component";
import { AddPrescriptionComponent } from "./backOffice/components/prescription-management/add-prescription/add-prescription.component";
import { UpdatePrescriptionComponent } from "./backOffice/components/prescription-management/update-prescription/update-prescription.component";
import { DetailsPrescriptionComponent } from "./backOffice/components/prescription-management/details-prescription/details-prescription.component";
import { AdminComponent } from "./backOffice/views/admin/admin.component";
import { PatientPrescriptionComponent } from "./backOffice/components/prescription-management/patient-prescription/patient-prescription.component";
import { PatientNotesComponent } from "./backOffice/components/note-management/patient-notes/patient-notes.component";
import { DoctorComponent } from "./frontOffice/views/doctor/doctor.component";
import { AuthComponent } from "./frontOffice/views/auth/auth.component";
import { LoginComponent } from "./frontOffice/views/login/login.component";
import { RegisterComponent } from "./frontOffice/views/register/register.component";
import { PatientspaceComponent } from "./frontOffice/views/patientspace/patientspace.component";
import { PatientPrescriptionDetailsComponent } from "./frontOffice/components/patient-prescription-details/patient-prescription-details.component";
import { PatientNotesDetailsComponent } from "./frontOffice/components/patient-notes-details/patient-notes-details.component";
import { HomeComponent } from "./frontOffice/views/home/home.component";

const routes: Routes = [
  // Doctor Dashboard
  {
    path: 'doctor',
    component: DoctorComponent,
    children: [
    
    
      { path: 'notes', component: ListNotesComponent },
      { path: 'add-note', component: AddNoteComponent },
     
      { path: 'update-note/:id', component: UpdateNoteComponent },
      { path: 'details-note/:id', component: DetailsNoteComponent },

      { path: 'prescriptions', component: ListPrescriptionsComponent },
      { path: 'add-prescription', component: AddPrescriptionComponent },
      {
        path: 'update-prescription/:id',
        component: UpdatePrescriptionComponent,
      },
      {
        path: 'details-prescription/:id',
        component: DetailsPrescriptionComponent,
      },
     
    ],
  },

  {
    path: 'admin',
    component: AdminComponent,
    children: [
     
       

    ],
  },

  // auth views
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  {
    path: "patientspace",
    component: PatientspaceComponent,
    children: [
      { path: "patient", component: 
        PatientPrescriptionComponent },
      { path: 'details-prescription/:id', 
        component: PatientPrescriptionDetailsComponent },
      { path: 'details-note/:id', 
        component: PatientNotesDetailsComponent },
        
  { path: 'patient-notes', 
    component: PatientNotesComponent },
    ],
  },

  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
