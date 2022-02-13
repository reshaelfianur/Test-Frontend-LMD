import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/services/task.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public tasks: number = 0;
  public users: number = 0;
  public roles: number = 0;

  public accessRights: any = null;

  constructor(
    private sessionService: SessionService,
    private taskService: TaskService,
    private roleService: RoleService,
    private userService: UserService
  ) {
    this.accessRights = this.sessionService.getAccessRights();
  }

  ngOnInit(): void {
    this.countTasks();
    this.countRoles();
    this.countUsers();
  }

  countTasks(): void {
    let args: null | any = this.accessRights.role.id == 1 ? null : `?created_by=${this.accessRights.user.user_id}`;

    this.taskService.list(args).subscribe(respond => {
      if (respond) {
        this.tasks = respond.data.length;
      }
    });
  }

  countRoles(): void {
    this.roleService.list().subscribe(respond => {
      if (respond) {
        this.roles = respond.data.length;
      }
    });
  }

  countUsers(): void {
    this.userService.list().subscribe(respond => {
      if (respond) {
        this.users = respond.data.length;
      }
    });
  }

}
