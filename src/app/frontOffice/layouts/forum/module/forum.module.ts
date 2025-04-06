// forum.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { PostListComponent } from '../components/post-list/post-list.component';
import { ReactionButtonsComponent } from '../components/reaction-buttons/reaction-buttons.component';
import { CommentListComponent } from '../components/comment-list/comment-list.component';

@NgModule({
  imports: [
    CommonModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    PostListComponent,
    ReactionButtonsComponent, // Add this
    CommentListComponent,     // Add this
    TimeAgoPipe
  ],
  exports: [
    PostListComponent
  ]
})
export class ForumModule { }