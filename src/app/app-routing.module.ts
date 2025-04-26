import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { DoctorComponent } from "./frontOffice/layouts/doctor/doctor.component";
import { AuthComponent } from "./frontOffice/layouts/auth/auth.component";

// doctor views
import { DashboardComponent } from "./frontOffice/views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./frontOffice/views/admin/maps/maps.component";
import { SettingsComponent } from "./frontOffice/views/admin/settings/settings.component";
import { TablesComponent } from "./frontOffice/views/admin/tables/tables.component";

// admin views
import { AdminDashboardComponent } from "./backOffice/admin-dashboard/admin-dashboard.component"; 


// auth views
import { LoginComponent } from "./frontOffice/views/auth/login/login.component";
import { RegisterComponent } from "./frontOffice/views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./frontOffice/views/index/index.component";
import { LandingComponent } from "./frontOffice/views/landing/landing.component";
import { ProfileComponent } from "./frontOffice/views/profile/profile.component";
import { PatientspaceComponent } from "./frontOffice/layouts/patientspace/patientspace.component";
import { AdminComponent } from "./backOffice/admin/admin.component";
import { AdminTablesComponent } from "./backOffice/admin-tables/admin-tables.component";
import { QuizFormComponent } from "./component/admin/quiz-form/quiz-form.component";
import { QuizDetailsComponent } from "./component/admin/quiz-details/quiz-details.component";
import { QuestionFormComponent } from "./component/admin/question-form/question-form.component";
import { ChoiceFormComponent } from "./component/admin/choice-form/choice-form.component";
import { QuizTestComponent } from "./component/admin/quizz-test/quizz-test.component";
import { QuizListComponent } from "./component/admin/quiz-list/quiz-list.component";
import { QuizListUserComponent } from "./component/user/quiz-list-user/quiz-list-user.component";
import { ScoreListUserComponent } from "./component/user/score-list-user/score-list-user.component";
import { CombatGameComponent } from "./game/combat-game/combat-game.component";
import { TestComponent } from "./component/admin/test/test.component";
import { QuestionResponseComponent } from "./component/admin/question-response/question-response.component";
import { VisualisationComponent } from "./component/admin/visualisation/visualisation.component";
import { TakeTestComponent } from "./component/user/take-test/take-test.component";
import { SlidingPuzzleComponent } from "./game/sliding-puzzle/sliding-puzzle.component";

const routes: Routes = [
  // Doctor Dashboard
  {
    path: "doctor",
    component: DoctorComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },

  //Admin Dashboard
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: AdminDashboardComponent },
      { path: "tables", component: AdminTablesComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: 'quizzes/new', component: QuizFormComponent },
      { path: 'quizzes/:id', component: QuizDetailsComponent },
      { path: 'quizzes/edit/:id', component: QuizFormComponent },
      { path: 'quizzes/:quizId/questions/new', component: QuestionFormComponent },
      { path: 'quizzes/:quizId/questions/:questionId/edit', component: QuestionFormComponent },
      { path: 'quizzes/:quizId/questions/:questionId/choices/new', component: ChoiceFormComponent },
      { path: 'quizzes/:quizId/questions/:questionId/choices/:choiceId/edit', component: ChoiceFormComponent },
      { path: 'quizzes', component: QuizListComponent },
      {path:'tests',component:TestComponent},
      { path: 'question-responses', component: QuestionResponseComponent },
      { path: 'admin/visualisation', component: VisualisationComponent },
      
    ],
  },

  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
      {path:'scorelist',component:ScoreListUserComponent},
      {path:'quizzeslist',component:QuizListUserComponent},
      {path: 'test/:id',component: QuizTestComponent},
      {path:'taketest/:id',component:TakeTestComponent},
    ],
  },
  { path: "patientspace", component: PatientspaceComponent },
  { path: "profile", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
  {path:'combatgame',component:CombatGameComponent},
  {path:'slide',component:SlidingPuzzleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
