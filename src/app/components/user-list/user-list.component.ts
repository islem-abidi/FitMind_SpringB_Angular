import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}
  selectedUser: any = null;

  openUpdateForm(user: any) {
    this.selectedUser = { ...user }; // clone
  }
  
  cancelEdit() {
    this.selectedUser = null;
  }
  
  updateUser() {
    this.userService.updateUser(this.selectedUser.idUser, this.selectedUser).subscribe({
      next: () => {
        this.fetchAllUsers();
        this.selectedUser = null;
      },
      error: (err) => console.error('Erreur de mise à jour', err)
    });
  }
  
  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => this.users = res,
      error: (err) => console.error('Erreur:', err)
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => this.fetchAllUsers());
  }

  archiveUser(id: number) {
    this.userService.archiveUser(id).subscribe(() => this.fetchAllUsers());
  }

  restoreUser(id: number) {
    this.userService.restoreUser(id).subscribe(() => this.fetchAllUsers());
  }
  
  filterUsers(field: string, value: string) {
    this.userService.filterByField(field, value).subscribe({
      next: (res) => this.users = res,
      error: (err) => console.error('Erreur:', err)
    });
  }
  getSortedUsers(page: number = 0, size: number = 10) { 
    this.userService.getSortedUsers(page, size).subscribe({
      next: (res) => this.users = res,
      error: (err) => console.error('Erreur:', err)
    });
  }
  getUserStats() {
    this.userService.getUserStats().subscribe({
      next: (res) => console.log('Statistiques utilisateurs:', res),
      error: (err) => console.error('Erreur:', err)
    });
  }
  checkEmail(email: string) {
    this.userService.checkEmail(email).subscribe({
      next: (res) => console.log('Email vérifié:', res),
      error: (err) => console.error('Erreur:', err)
    });
  }
}
