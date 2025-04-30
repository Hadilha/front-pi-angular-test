import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./frontOffice/views/user/login/login.component";
import { RegisterComponent } from "./frontOffice/views/user/register/register.component";
import { ProfilePatientComponent } from "./frontOffice/views/user/profile-patient/profile-patient.component";
import { ForgotpwComponent } from "./frontOffice/views/user/forgotpw/forgotpw.component";
import { ResetpwComponent } from "./frontOffice/views/user/resetpw/resetpw.component";
import { DoctorComponent } from "./frontOffice/views/user/doctor/doctor.component";
import { AdminComponent } from "./backOffice/views/user/admin/admin.component";
import { ListusersComponent } from "./backOffice/views/user/listusers/listusers.component";
import { AdduserComponent } from "./backOffice/views/user/adduser/adduser.component";
import { AuthComponent } from "./frontOffice/views/user/auth/auth.component";
import { PatientspaceComponent } from "./frontOffice/views/user/patientspace/patientspace.component";
import { CredentialsPatientComponent } from "./frontOffice/views/user/credentials-patient/credentials-patient.component";
import { NotificationDropdownComponent } from "./frontOffice/components/user/dropdowns/notification-dropdown/notification-dropdown.component";
import { IndexNavbarComponent } from "./frontOffice/components/user/navbars/index-navbar/index-navbar.component";
import { TableDropdownComponent } from "./frontOffice/components/user/dropdowns/table-dropdown/table-dropdown.component";
import { UserDropdownComponent } from "./frontOffice/components/user/dropdowns/user-dropdown/user-dropdown.component";
import { FooterComponent } from "./frontOffice/components/user/footers/footer/footer.component";
import { HomeComponent } from "./frontOffice/views/user/home/home.component";
import { profileDoctorComponent } from "./frontOffice/views/user/profileDoctor/profileDoctor.component";
import { TablesDoctorComponent } from "./frontOffice/views/user/tablesDoctor/tablesDoctor.component";
import { StatisticsAdminComponent } from "./backOffice/views/user/statistics-admin/statistics-admin.component";
import { JournalComponent } from "./frontOffice/views/user/journal/journal.component";
import { RoleGuard } from "./shared/role.guard";
import { AdminForumComponent } from "./backOffice/views/forum/admin-forum/admin-forum.component";
import { ForumSpaceComponent } from "./frontOffice/views/forum/forum-space/forum-space.component";
import { CalendarViewComponent } from "./frontOffice/views/appointments/calendar-view/calendar-view.component";
import { VideoCallComponent } from "./frontOffice/views/appointments/video-call/video-call.component";
import { VideoCallEntryComponent } from "./frontOffice/views/appointments/video-call-entry/video-call-entry.component";
import { AppointmentListComponent } from "./backOffice/views/appointments/appointment-list/appointment-list.component";
import { AppointmentFormComponent } from "./backOffice/components/appointments/appointments/appointment-form/appointment-form.component";
import { CalendarListComponent } from "./backOffice/views/appointments/calendar-list/calendar-list.component";
import { CalendarFormComponent } from "./backOffice/components/appointments/calendars/calendar-form/calendar-form.component";
import { AppointmentStatisticsComponent } from "./backOffice/components/appointments/appointment-statistics/appointment-statistics.component";
import { PatientCalendarComponent } from "./frontOffice/views/appointments/patient-calendar/patient-calendar.component";
import { ListNotesComponent } from "./backOffice/components/prescription_note/note-management/list-notes/list-notes.component";
import { AddNoteComponent } from "./backOffice/components/prescription_note/note-management/add-note/add-note.component";
import { UpdateNoteComponent } from "./backOffice/components/prescription_note/note-management/update-note/update-note.component";
import { DetailsNoteComponent } from "./backOffice/components/prescription_note/note-management/details-note/details-note.component";
import { ListPrescriptionsComponent } from "./backOffice/components/prescription_note/prescription-management/list-prescriptions/list-prescriptions.component";
import { AddPrescriptionComponent } from "./backOffice/components/prescription_note/prescription-management/add-prescription/add-prescription.component";
import { UpdatePrescriptionComponent } from "./backOffice/components/prescription_note/prescription-management/update-prescription/update-prescription.component";
import { DetailsPrescriptionComponent } from "./backOffice/components/prescription_note/prescription-management/details-prescription/details-prescription.component";
import { PatientPrescriptionComponent } from "./backOffice/components/prescription_note/prescription-management/patient-prescription/patient-prescription.component";
import { PatientPrescriptionDetailsComponent } from "./frontOffice/components/prescription_note/patient-prescription-details/patient-prescription-details.component";
import { PatientNotesDetailsComponent } from "./frontOffice/components/prescription_note/patient-notes-details/patient-notes-details.component";
import { PatientNotesComponent } from "./backOffice/components/prescription_note/note-management/patient-notes/patient-notes.component";
import { ChatBubbleComponent } from "./frontOffice/components/chat/message-bubble/chat-bubble.component";
import { ChatManagementComponent } from "./backOffice/views/Chat/chat-management/chat-management.component";
import { MoodTrackerManagementComponent } from "./backOffice/views/Chat/mood-tracker-management/mood-tracker-management.component";
import { MoodTrackerComponent } from "./frontOffice/views/chat/mood-tracker/mood-tracker.component";
import { CoachingProgramAjouterUpdateComponent } from "./backOffice/views/coashing/coachingprogramajouter-update/coachingprogramajouter-update.component";
import { ContentprogramComponent } from "./backOffice/views/coashing/contentprogram/contentprogram.component";
import { ContentProgramComponent } from "./frontOffice/views/coashing/contentprogram/contentprogram.component";
import { CoachingprogramComponent } from "./backOffice/views/coashing/coachingprogram/coachingprogram.component";
import { CoachFeedbackComponent } from "./backOffice/components/coashing/coach-feedback/coach-feedback.component";
import { ContentProgramAjouterupdateComponent } from "./backOffice/views/coashing/content-program-ajouterupdate/content-program-ajouterupdate.component";
import { FeedbackFormComponent } from "./backOffice/components/coashing/feedback/feedback-form/feedback-form.component";
import { CombatGameComponent } from "./frontOffice/views/quizz/combat-game/combat-game.component";
import { SlidingPuzzleComponent } from "./frontOffice/views/quizz/sliding-puzzle/sliding-puzzle.component";
import { QuizListUserComponent } from "./frontOffice/views/quizz/quiz-list-user/quiz-list-user.component";
import { ScoreListUserComponent } from "./frontOffice/views/quizz/score-list-user/score-list-user.component";
import { TakeTestComponent } from "./frontOffice/views/quizz/take-test/take-test.component";
import { TestListComponent } from "./frontOffice/views/quizz/test-list/test-list.component";
import { QuizTestComponent } from "./backOffice/views/quizz/quizz-test/quizz-test.component";
import { QuizFormComponent } from "./backOffice/views/quizz/quiz-form/quiz-form.component";
import { QuizDetailsComponent } from "./backOffice/views/quizz/quiz-details/quiz-details.component";
import { QuestionFormComponent } from "./backOffice/views/quizz/question-form/question-form.component";
import { ChoiceFormComponent } from "./backOffice/views/quizz/choice-form/choice-form.component";
import { VisualisationComponent } from "./backOffice/views/quizz/visualisation/visualisation.component";
import { QuizListComponent } from "./backOffice/views/quizz/quiz-list/quiz-list.component";
import { TestComponent } from "./backOffice/views/quizz/test/test.component";
import { QuestionResponseComponent } from "./backOffice/views/quizz/question-response/question-response.component";

//import { JournalComponent } from "./frontOffice/views/journal/journal.component";

const routes: Routes = [
  // Doctor Dashboard
  {
    path: "doctor",
    component: DoctorComponent,
    canActivate: [RoleGuard],
    data: { roles: ['DOCTOR'] },
    children: [
      { path: "profile", component: profileDoctorComponent },
      { path: "patientList", component: TablesDoctorComponent },
      { path: "updateuser/:id", component: AdduserComponent },
      { path: 'calendar-view', component: CalendarViewComponent },
      {path: 'video-call/appointment/:appointmentId', component: VideoCallComponent},
      {path: 'video-call/:roomId', component: VideoCallComponent},
      { path: 'join-video-call', component: VideoCallEntryComponent },
  { path: ':role/video-call/:roomId', component: VideoCallComponent },
  { path: 'notes', component: ListNotesComponent },
  { path: 'add-note', component: AddNoteComponent },
  { path: 'update-note/:id', component: UpdateNoteComponent },
  { path: 'details-note/:id', component: DetailsNoteComponent },
  { path: 'prescriptions', component: ListPrescriptionsComponent },
  { path: 'add-prescription', component: AddPrescriptionComponent },
    {path: 'update-prescription/:id', component: UpdatePrescriptionComponent,},
  { path: 'details-prescription/:id',component: DetailsPrescriptionComponent},

      { path: "", redirectTo: "patientList", pathMatch: "full" },
    ],
  },

  // Admin Dashboard
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: "appointments", component: AppointmentListComponent },
      { path: "appointments/new", component: AppointmentFormComponent },
      { path: "appointments/:id/edit", component: AppointmentFormComponent },
      { path: "calendars", component: CalendarListComponent },
      { path: "calendars/new", component: CalendarFormComponent },
      { path: "calendars/:id/edit", component: CalendarFormComponent },
      { path: 'appointment-statistics', component: AppointmentStatisticsComponent },
      { path: 'forum', component: AdminForumComponent },
      { path: "usermanagment", component: ListusersComponent },
      { path: "adduser", component: AdduserComponent },
      { path: "updateuser/:id", component: AdduserComponent },
      { path: "statistics", component: StatisticsAdminComponent },
      {
        path:"ChatManagement", component: ChatManagementComponent
      },
      {
        path:"MoodTrackerManagement" , component:MoodTrackerManagementComponent
      },

      { path: 'backoffice/coachingprogram/programs', component: CoachingprogramComponent },
      { path: '', redirectTo: 'backoffice/coachingprogram/programs', pathMatch: 'full' },

      { path: 'backoffice/content-program', component: ContentprogramComponent }, // Define route for ContentProgramComponent
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'coaching-program',
        component: CoachingProgramAjouterUpdateComponent
      },
      { path: 'coaching-programs/coachingProgram/:id', component: CoachingProgramAjouterUpdateComponent },
      { path: 'feedback', component: CoachFeedbackComponent },
      //{
       // path: 'backoffice/coachingprogramajouter-update/:id',
        //component: CoachingProgramAjouterUpdateComponent
      //},
      { path: 'content-programs/programcontent', component: ContentProgramAjouterupdateComponent },
      { path: 'content-programs/programcontent/:id', component: ContentProgramAjouterupdateComponent },

      { path: 'feedback/feedback', component: FeedbackFormComponent },
      { path: 'coach-feedback', component: CoachFeedbackComponent },
      { path: 'quizzes/new', component: QuizFormComponent },
      { path: 'quizzes/:id', component: QuizDetailsComponent },
      { path: 'quizzes/edit/:id', component: QuizFormComponent },
      { path: 'quizzes/:quizId/questions/new', component: QuestionFormComponent },
      { path: 'quizzes/:quizId/questions/:questionId/edit', component: QuestionFormComponent },
      { path: 'quizzes/:quizId/questions/:questionId/choices/new', component: ChoiceFormComponent },
      { path: 'quizzes/:quizId/questions/:questionId/choices/:choiceId/edit', component: ChoiceFormComponent },
      {path:'visualisation',component:VisualisationComponent},
      { path: 'quizzes', component: QuizListComponent },
      {path:'tests',component:TestComponent},
      { path: 'question-responses', component: QuestionResponseComponent },








      { path: "", redirectTo: "usermanagment", pathMatch: "full" },
    ],
  },

  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },

  {
    path: "patientspace",
    component: PatientspaceComponent,
    canActivate: [RoleGuard],
    data: { roles: ['PATIENT'] },
    children: [
      { path: 'calendar/:patientId', component: PatientCalendarComponent },
      { path: 'join-video-call', component: VideoCallEntryComponent },
      { path: 'video-call/:roomId', component: VideoCallComponent },
      {path: 'forum', component: ForumSpaceComponent,},
      { path: "profile", component: ProfilePatientComponent },
      { path: 'credentials', component: CredentialsPatientComponent },
      { path: 'journal', component: JournalComponent },
      { path: "patient", component:PatientPrescriptionComponent },
      { path: 'details-prescription/:id',component: PatientPrescriptionDetailsComponent },
      { path: 'details-note/:id',component: PatientNotesDetailsComponent },
    { path: 'patient-notes', component: PatientNotesComponent },
    {path:"mood_tarcker", component:MoodTrackerComponent},
    { path: 'frontOffice/content-program', component: ContentProgramComponent },
    { path: 'combatgame', component: CombatGameComponent },
    { path: 'SlidingPuzzle', component: SlidingPuzzleComponent },
    {path:'quizzeslist',component:QuizListUserComponent},
    {path:'scorelist',component:ScoreListUserComponent},
    {path:'taketest/:id',component:TakeTestComponent},
    { path: 'testlist', component: TestListComponent },
    {path:'quizztest/:id',component:QuizTestComponent},

    ],

  },

  { path: "forgotpassword", component: ForgotpwComponent },
  { path: "reset-password", component: ResetpwComponent },
  { path: "", component: HomeComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
