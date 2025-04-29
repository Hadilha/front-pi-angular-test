import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from './frontOffice/views/doctor/doctor.component';
import { AdminComponent } from './backOffice/views/admin/admin.component';
import { DashboardComponent } from './frontOffice/views/admin/dashboard/dashboard.component';
import { MapsComponent } from './frontOffice/views/admin/maps/maps.component';
import { SettingsComponent } from './frontOffice/views/admin/settings/settings.component';
import { TablesComponent } from './frontOffice/views/admin/tables/tables.component';
import { AppointmentListComponent } from './backOffice/views/appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './backOffice/components/appointments/appointment-form/appointment-form.component';
import { CalendarListComponent } from './backOffice/views/calendar-list/calendar-list.component';
import { CalendarFormComponent } from './backOffice/components/calendars/calendar-form/calendar-form.component';
import { AppointmentStatisticsComponent } from './backOffice/components/appointment-statistics/appointment-statistics.component';
import { HomeComponent } from './frontOffice/views/home/home.component';
import { PatientspaceComponent } from './frontOffice/views/patientspace/patientspace.component';
import { CalendarViewComponent } from './frontOffice/views/calendar-view/calendar-view.component';
import { VideoCallComponent } from './frontOffice/views/video-call/video-call.component';
import { VideoCallEntryComponent } from './frontOffice/views/video-call-entry/video-call-entry.component';
import { PatientCalendarComponent } from './frontOffice/views/patient-calendar/patient-calendar.component';
import { CombatGameComponent } from './frontOffice/views/combat-game/combat-game.component';
import { SlidingPuzzleComponent } from './frontOffice/views/sliding-puzzle/sliding-puzzle.component';
import { QuizListUserComponent } from './frontOffice/views/quiz-list-user/quiz-list-user.component';
import { ScoreListUserComponent } from './frontOffice/views/score-list-user/score-list-user.component';
import { TakeTestComponent } from './frontOffice/views/take-test/take-test.component';
import { TestListComponent } from './frontOffice/views/test-list/test-list.component';
import { QuizListComponent } from './backOffice/views/quiz-list/quiz-list.component';
import { QuizFormComponent } from './backOffice/views/quiz-form/quiz-form.component';
import { QuizTestComponent } from './backOffice/views/quizz-test/quizz-test.component';
import { VisualisationComponent } from './backOffice/views/visualisation/visualisation.component';
import { QuizDetailsComponent } from './backOffice/views/quiz-details/quiz-details.component';
import { QuestionFormComponent } from './backOffice/views/question-form/question-form.component';
import { ChoiceFormComponent } from './backOffice/views/choice-form/choice-form.component';
import { TestComponent } from './backOffice/views/test/test.component';
import { QuestionResponseComponent } from './backOffice/views/question-response/question-response.component';

const routes: Routes = [
  // Doctor Dashboard
  {
    path: 'doctor',
    component: DoctorComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'maps', component: MapsComponent },
      { path: 'calendar-view', component: CalendarViewComponent },
      { path: 'video-call/appointment/:appointmentId', component: VideoCallComponent },
      { path: 'video-call/:roomId', component: VideoCallComponent },
      { path: 'join-video-call', component: VideoCallEntryComponent },
      { path: ':role/video-call/:roomId', component: VideoCallComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  // Admin (Back Office) Dashboard
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'appointments', component: AppointmentListComponent },
      { path: 'appointments/new', component: AppointmentFormComponent },
      { path: 'appointments/:id/edit', component: AppointmentFormComponent },
      { path: 'calendars', component: CalendarListComponent },
      { path: 'calendars/new', component: CalendarFormComponent },
      { path: 'calendars/:id/edit', component: CalendarFormComponent },
      { path: 'appointment-statistics', component: AppointmentStatisticsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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
    ],
  },
  // Standalone Routes
  {
    path: 'patientspace',
    component: PatientspaceComponent,
    children: [
      { path: 'calendar/:patientId', component: PatientCalendarComponent },
      { path: 'join-video-call', component: VideoCallEntryComponent },
      { path: 'video-call/:roomId', component: VideoCallComponent },
      { path: 'combatgame', component: CombatGameComponent },
      { path: 'SlidingPuzzle', component: SlidingPuzzleComponent },
      {path:'quizzeslist',component:QuizListUserComponent},
      {path:'scorelist',component:ScoreListUserComponent},
      {path:'taketest/:id',component:TakeTestComponent},
      { path: 'testlist', component: TestListComponent },
      {path:'quizztest/:id',component:QuizTestComponent},
      { path: '', redirectTo: 'join-video-call', pathMatch: 'full' },
    ],
  },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}