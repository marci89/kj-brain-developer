import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateUserRequest, User } from '../interfaces/user.interface';
import { BaseService } from '../common/services/base.service';

//User service
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  //Read by id
  readById(id: number) {
    return this.http.get<User>(this.baseUrl + 'user/' + id);
  }

  //Update user's name
  update(request: UpdateUserRequest) {
    return this.http.put(this.baseUrl + 'user', request);
  }

  //Delete user by id
  delete(id: number) {
    return this.http.delete(`${this.baseUrl}user/${id}`);
  }
}
