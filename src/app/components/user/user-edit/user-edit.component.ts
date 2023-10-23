import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Avatar, ChangePasswordRequest, LoginUser } from 'src/app/common/interfaces/account.interface';
import { AccountService } from 'src/app/common/services/account.service';
import { ModalService } from 'src/app/common/services/modal.service';
import { UpdateUserRequest, User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { ChangeEmailComponent } from '../change-email/change-email.component';
import { LanguageService } from 'src/app/common/services/language.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  languages: any[] = [];
  selectedLanguage: any | undefined;
  selectedAvatarId: number = 1;
  avatars: Avatar[] = [];

  loginedUser: LoginUser | null | undefined;
  user: User | null | undefined;
  userProfileForm: FormGroup = new FormGroup({})
  changePasswordForm: FormGroup = new FormGroup({})
  updateUserRequest: UpdateUserRequest = {} as UpdateUserRequest;
  changePasswordRequest: ChangePasswordRequest = {} as ChangePasswordRequest;

  //subscription
  private CurrentUserSubscription$: Subscription | undefined;

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private modalService: ModalService,
    private router: Router,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    //take logined user once
    this.CurrentUserSubscription$ = this.accountService.currentUser$.subscribe({
      next: loginedUser => {
        this.loginedUser = loginedUser
      }
    });

    this.languages = this.languageService.getLanguages();
    this.selectedLanguage = this.languageService.getSelectedLanguage();


    this.initForms();
    this.readUser();
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

  // Init all of forms
  initForms() {
    this.userProfileForm = new FormGroup({
      username: new FormControl('', Validators.required),
      language: new FormControl(this.selectedLanguage, Validators.required)
    });

    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('newPassword')])
    });

    this.changePasswordForm.controls['newPassword'].valueChanges.subscribe({
      next: () => this.changePasswordForm.controls['confirmPassword'].updateValueAndValidity()
    });
  }

  // Password match helper
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value ? null : { isMatching: true }
    }
  }

  //Add values for userProfileForm
  addValuesToUserProfileForm() {
    this.userProfileForm.setValue({
      username: this.user?.username,
      language: this.selectedLanguage
    })
  }

  // Read user by id
  readUser() {
    if (!this.loginedUser) return;

    this.userService.readById(this.loginedUser.id).subscribe({
      next: user => {
        this.user = user;
        this.selectedAvatarId = user.avatarId
        this.addValuesToUserProfileForm();
      },
      error: error => {
        this.toastr.error(this.translate.instant(error.error))
      }
    });
  }

  //Update user
  updateUser() {
    if (!this.loginedUser) return;
    const language = this.userProfileForm.controls['language'].value;

    this.updateUserRequest = this.userProfileForm.value;
    this.updateUserRequest.id = this.loginedUser.id,
    this.updateUserRequest.avatarId = this.selectedAvatarId;
    this.updateUserRequest.language = language.code;

    this.userService.update(this.updateUserRequest).subscribe({
      next: _ => {
        this.languageService.switchLanguage(language.code);
        this.toastr.success(this.translate.instant('EditSuccess'))
        this.accountService.updateCurrentUser('username', this.updateUserRequest.username);
        this.accountService.updateCurrentUser('avatarId', this.updateUserRequest.avatarId);
        this.accountService.updateCurrentUser('language', language.code);
      },
      error: error => {
        this.toastr.error(this.translate.instant(error.error))
      }
    })
  }

  //Change email popup
  openChangeEmailDialog() {
    this.modalService.openDialog(ChangeEmailComponent, 600);
  }

  // change password
  changePassword() {
    this.changePasswordRequest = {
      password: this.changePasswordForm.controls['currentPassword'].value,
      newPassword: this.changePasswordForm.controls['newPassword'].value,
    };

    this.accountService.changePassword(this.changePasswordRequest).subscribe({
      next: _ => {
        this.toastr.success(this.translate.instant('EditSuccess'))
        this.changePasswordForm.reset();
      },
      error: error => {
        this.toastr.error(this.translate.instant(error.error))
      }
    })
  }

  //select avatar
  selectAvatar(id: number) {
    this.selectedAvatarId = id;
  }

  // return game page
  cancel() {
    this.router.navigateByUrl('/game');
  }

  ngOnDestroy() {
    if (this.CurrentUserSubscription$) {
      this.CurrentUserSubscription$.unsubscribe();
    }
  }
}
