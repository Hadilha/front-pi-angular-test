import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBubbleComponent } from './message-bubble/chat-bubble.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ChatBubbleComponent],
  imports: [CommonModule, FormsModule],
  exports: [ChatBubbleComponent]
})
export class SharedModule {}
