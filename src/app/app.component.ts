import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from 'selenium-webdriver/http';
import * as Query from './query';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Task } from 'src/model/Task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  taskForm: FormGroup;
  tasks = [];

  /**
   * Creates an instance of AppComponent.
   *
   * @param {Apollo} apollo
   *
   * @memberof AppComponent
   */
  constructor(private apollo: Apollo) {
    this.taskForm = new FormGroup({
      taskName : new FormControl('')
    });
  }


  /**
   * Implements OnInit().
   *
   * @memberof AppComponent
   */
  ngOnInit() {
    this.subscribeToTasks();
  }

  /**
   * Get tasks grapqhl getTasks query.
   *
   * @param {*} response
   * @returns
   * @memberof AppComponent
   */
  getTasksFromResponse(response) {
    return response.data.task;
  }

  /**
   * Construct tasks fromt task list response.
   *
   * @param {*} tasks
   *   Tasks.
   *
   * @returns
   * @memberof AppComponent
   */
  constructTasks(tasks) {
    for (var index in tasks) {
      tasks[index] = new Task(tasks[index].name, tasks[index].complete ? tasks[index].complete : false, tasks[index].id);
    }
    return tasks;
  }

  /**
   * Set tasks.
   *
   * @param {Task[]} tasks
   *   Task list.
   *
   * @memberof AppComponent
   */
  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  /**
   * Subscription to task list.
   *
   * @memberof AppComponent
   */
  subscribeToTasks() {
    this.apollo.subscribe<any>({
      query: Query.SubscribeTasks
    })
    .pipe(
      map(this.getTasksFromResponse),
      map(this.constructTasks)
    ).subscribe(
      (tasks) => this.setTasks(tasks)
    );
  }

  /**
   * React when the form is submit.
   */
  onSubmit() {
    if (this.taskForm.value.taskName.length > 0) {
      this.addTask(this.taskForm.value.taskName);
    }
  }

  /**
   * Add new task to the system.
   *
   * @param {*} name
   * @memberof AppComponent
   */
  addTask(name) {
    console.log(Query.AddTasks);
    this.apollo.mutate<any>({
      mutation: Query.AddTasks,
      variables: {
        tasks: [{
          "name": name
        }]
      }
    }).subscribe((data)=> console.log(data));
  }
 
}
