import { Component, OnInit } from '@angular/core';
import { BadgeService } from 'src/app/services/badge.service';

@Component({
  selector: 'app-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.css']
})
export class BadgeListComponent implements OnInit {
  badges: string[] = [];
  loading = true;
  badge: string = '';

  constructor(private badgeService: BadgeService) {}

  ngOnInit(): void {

    const userId = 1; // Remplacer par l'ID réel de l'utilisateur
    this.badgeService.getBadges(userId).subscribe(res => {
      this.badges = res;
    });

  }
}
