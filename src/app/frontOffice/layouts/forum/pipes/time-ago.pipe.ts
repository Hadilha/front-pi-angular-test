// src/app/shared/pipes/time-ago.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date): string {
    const seconds = Math.floor((+new Date() - +new Date(value))) / 1000;
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };

    let counter: number;
    for (const unit in intervals) {
      counter = Math.floor(seconds / intervals[unit as keyof typeof intervals]);
      if (counter > 0) {
        return `${counter} ${unit}${counter !== 1 ? 's' : ''} ago`;
      }
    }
    return 'Just now';
  }
}