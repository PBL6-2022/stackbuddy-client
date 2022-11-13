import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  constructor(
    private chatService: ChatService,
  ) {}

  ngOnInit(): void {}

  hashtags: string[] = [];
  chipInputKeyCodes = [ENTER, COMMA];
  remove(hashtag: string): void {
    const index = this.hashtags.indexOf(hashtag);
    if (index >= 0) {
      this.hashtags.splice(index, 1);
    }
  }
  add(event: MatChipInputEvent): void {
    const chipInputCtrl = event.input;
    let value = event.value;
    if ((value || '').trim()) {
      value = value.trim();
      if (value.substr(0, 1) != '#') value = '#' + value;
      this.hashtags.push(value.trim());
    }
    chipInputCtrl.value = '';
  }

  findBySymptons() {

  }

  getListOfDoctors() {

  }

  testSocket() {
    this.chatService.sendMessage('hehe');
  }
}
