import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  ngOnInit(): void {  
  }


  containsSubstring(text: string, substring: string): boolean {
    return text.includes(substring);
  }
}
