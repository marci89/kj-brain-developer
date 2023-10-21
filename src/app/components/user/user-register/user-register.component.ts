import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Avatar } from 'src/app/common/interfaces/account.interface';
import { AccountService } from 'src/app/common/services/account.service';
import { LanguageService } from 'src/app/common/services/language.service';
import { RegistrationRequest } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  languages: any[] = [];
  selectedLanguage: any | undefined;
  selectedAvatarId: number = 1;
  avatars: Avatar[] = [];
  createUserRequest: RegistrationRequest = {} as RegistrationRequest;
  registerForm: FormGroup = new FormGroup({})
  serverError: string = "";

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router,
    private translate: TranslateService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.languages = this.languageService.getLanguages();
    this.selectedLanguage = this.languageService.getSelectedLanguage();
    this.initForm();
    this.initAvatars();
  }

  //Init avatars
  initAvatars() {
    for (let i = 1; i <= 8; i++) {
      this.avatars.push({
        id: i,
        imageUrl: `./assets/images/avatar/${i}.svg`,
      });
    }
  }

  //Init form
  initForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')]),
      language: new FormControl(this.selectedLanguage, Validators.required),
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    });
  }

  // Password match helper
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value ? null : { isMatching: true }
    }
  }

  //User create (registration)
  register() {
    this.createUserRequest = this.registerForm.value;
    this.createUserRequest.avatarId = this.selectedAvatarId;
    this.createUserRequest.language = this.selectedLanguage.code;
    console.log(this.createUserRequest);

    this.accountService.register(this.createUserRequest).subscribe({
      next: _ => {
        this.toastr.success(this.translate.instant('RegisterSuccess'))
        this.router.navigateByUrl('/login');
      },
      error: error => {
        this.serverError = error.error;
      }
    })
  }

  //Change language
  chooseLang(lang: string) {
    console.log(lang)
  }

  //select avatar
  selectAvatar(id: number) {
    this.selectedAvatarId = id;
  }

  // return home
  cancel() {
    this.router.navigateByUrl('/');
  }
}
