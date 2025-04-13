import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  page: number = 0;
  size: number = 5;
  totalPages: number = 0;

  filterField: string = '';
  filterValue: string = '';
  fieldOptions: string[] = ['nom', 'prenom', 'sexe', 'archived'];
  valueOptions: string[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadSortedUsers();
  }

  loadSortedUsers() {
    this.userService.getSortedUsers(this.page, this.size).subscribe({
      next: (res) => {
        console.log('📦 Pagination response:', res);
        this.users = res.content;
        this.totalPages = res.totalPages;
      },
      error: (err) => console.error('❌ Erreur pagination:', err)
    });
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadSortedUsers();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadSortedUsers();
    }
  }

  archiveUser(id: number) {
    this.userService.archiveUser(id).subscribe(() => this.loadSortedUsers());
  }

  restoreUser(id: number) {
    this.userService.restoreUser(id).subscribe(() => this.loadSortedUsers());
  }

  applyFilter() {
    if (this.filterField && this.filterValue) {
      this.userService.filterByField(this.filterField, this.filterValue).subscribe({
        next: (res) => {
          this.users = res;
          this.totalPages = 1;
        },
        error: (err) => console.error('❌ Erreur filtre:', err)
      });
    } else {
      this.loadSortedUsers();
    }
  }

  clearFilter() {
    this.filterField = '';
    this.filterValue = '';
    this.valueOptions = [];
    this.loadSortedUsers();
  }

  onFieldChange() {
    if (this.filterField === 'sexe') {
      this.valueOptions = ['Homme', 'Femme'];
    } else if (this.filterField === 'archived') {
      this.valueOptions = ['true', 'false'];
    } else {
      this.valueOptions = [];
    }
    this.filterValue = '';
  }
}
