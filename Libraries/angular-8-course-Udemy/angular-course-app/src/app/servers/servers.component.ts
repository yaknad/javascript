import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // selector: `.app-servers`,
  // selector: `[app-servers]`,
  // template: `<div>
  //               Server 1:
  //               <app-server></app-server>
  //               Server 2:
  //               <app-server></app-server>
  //            </div>`,
  // template: '<div><app-server></app-server><app-server></app-server></div>',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer: boolean = false;
  serverCreationStatus: string = 'no server was created';
  currentServerName: string = 'Test server';

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true
    }, 2000);
  }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server was created! Name is ' + this.currentServerName;
  }

  onUpdateServerName(event: Event) {
    this.currentServerName = (<HTMLInputElement>event.target).value;
  }

  getAllowNewServer(): string {
    return this.allowNewServer + "";
  }

}
