import './polyfills';

import { Component, OnInit } from '@angular/core';
import { NgIf, TitleCasePipe } from '@angular/common'; // includes NgIf and TitleCasePipe
import { bootstrapApplication } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { ImageComponent } from './app/image.component';
import { HighlightDirective } from './app/highlight.directive';
import {
  JsonReactiveComponents,
  JsonReactiveFormModule,
  ReactiveJsonFormsService,
} from 'json-reactive-form-angular-18';

let comps = [ImageComponent, HighlightDirective];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    JsonReactiveComponents,
    comps,
    NgIf,
    TitleCasePipe,
    MatCardModule,
    JsonReactiveFormModule,
  ],
  providers: [ReactiveJsonFormsService],
  template: `
    <mat-card *ngIf="url">
      <app-image-component [url]="url"></app-image-component>
      <h2 app-highlight>{{name | titlecase}}</h2>
    </mat-card>
    <Json-Reactive-Forms id="newform"></Json-Reactive-Forms>
  `,
})
export class ExampleStandaloneComponent implements OnInit {
  name = 'emma';
  url = 'https://i.imgur.com/4Xxh3QW.png';
  constructor(public form_service: ReactiveJsonFormsService) {}
  ngOnInit() {
    this.form_service
      .buildForm(
        {
          name: {
            type: 'text',
            value: '',
            label: 'Your First Name',
            rules: {
              required: true,
            },
            placeholderText: '',
            maxLength: 6,
          },
          lastname: {
            type: 'SelectOption',
            value: '',
            label: 'Your Last Name',
            rules: {
              required: true,
            },
            items: ['helllo'],
          },
          address: {
            type: 'formGroup',
            value: '',
            label: 'Payment Terms',
            GroupLabel: ['adasdas'],
            AddNewRequried: true,
            rules: {
              required: false,
            },
            formArray: [
              [
                {
                  type: 'text',
                  value: '',
                  label: 'Your Last Name',
                  name: 'lastname2',
                  rules: {
                    required: true,
                  },
                  placeholderText: '',
                },
                {
                  type: 'text',
                  value: '',
                  label: 'Your Last Name',
                  name: 'lastname',
                  rules: {
                    required: true,
                  },
                  placeholderText: '',
                },
                {
                  type: 'text',
                  value: '',
                  label: 'Your Last Name',
                  name: 'lastname1',
                  rules: {
                    required: true,
                  },
                  placeholderText: '',
                },
              ],
            ],
          },
        },
        'newform'
      )
      .then((res: any) => {});
  }
}

bootstrapApplication(ExampleStandaloneComponent)
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = ref;

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));
