import { makeAutoObservable } from "mobx";

class userData {
  constructor() {
    makeAutoObservable(this);
  }

  UserIsAuth = false;
  StorageUserData = {};

  AuthUser(user) {
    this.UserIsAuth = true;
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  GetUser(){
    this.StorageUserData = sessionStorage.getItem("user");
  }

  LogOut() {
    this.UserIsAuth = false;
    sessionStorage.removeItem("user");
    this.StorageUserData = {}
    console.log("Разлогинились");
  }
}

export default new userData();
