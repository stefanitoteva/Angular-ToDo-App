import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
    });
  }

  onSave(name: string, description: string, category: string) {
    console.log(category);
    
    if (category === 'toDo') {
      this.tasks.push({
        name,
        description,
        category:category,
      });
    } else if (category === 'inProgress') {
      this.inProgress.push({
        name,
        description,
        category: category,
      });
    } else if (category === 'done') {
      this.done.push({
        name,
        description,
        category:category,
      });
    }

    console.log(this.tasks, this.inProgress, this.done);
    
  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
