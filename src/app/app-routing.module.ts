import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// admin views
import { AdminDashboardComponent } from "./backOffice/views/admin-dashboard/admin-dashboard.component"; 

// no layouts views
import { PatientspaceComponent } from "./frontOffice/views/patientspace/patientspace.component";
import { AdminComponent } from "./backOffice/views/admin/admin.component";
import { AdminTablesComponent } from "./backOffice/components/admin-tables/admin-tables.component";
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
import { HomeComponent } from "./frontOffice/views/home/home.component";

const routes: Routes = [
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

  { path: "patientspace",
     component: PatientspaceComponent,
    children:[
      {path:'scorelist',component:ScoreListUserComponent},
      {path:'quizzeslist',component:QuizListUserComponent},
      {path: 'test/:id',component: QuizTestComponent},
      {path:'taketest/:id',component:TakeTestComponent},
    ] },

  { path: "", component: HomeComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
  {path:'combatgame',component:CombatGameComponent},
  {path:'slide',component:SlidingPuzzleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
