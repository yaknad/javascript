import { Component, OnInit } from '@angular/core';

@Component({
  // selector: 'app-servers',
  // selector: '.app-servers',
  selector: '[app-servers]',
  template: `<div>
                Server 1:
                <app-server></app-server>
                Server 2:
                <app-server></app-server>
             </div>`,
  // template: '<div><app-server></app-server><app-server></app-server></div>',
  // templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
