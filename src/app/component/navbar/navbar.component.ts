import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId: string;

  constructor() { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
  }

}
