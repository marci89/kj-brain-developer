import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/common/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  languages: any[] = [];
  selectedLanguage: any | undefined;

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selectedLanguage = this.languageService.getSelectedLanguage();
  }

  //Change language
  switchLang(lang: string) {
    this.languageService.switchLanguage(lang);
  }
}
