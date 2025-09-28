import { Component, signal } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { abnValidator } from 'ng-aus-lib/validators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, JsonPipe, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ng-aus-lib Demo');
  protected readonly demoForm = new FormGroup({
    sampleText: new FormControl<string>('', { nonNullable: true }),
    abn: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, abnValidator()],
    }),
  });

  protected get abnControl(): FormControl<string> {
    return this.demoForm.get('abn') as FormControl<string>;
  }

  protected onSubmit(): void {
    if (this.demoForm.invalid) {
      this.demoForm.markAllAsTouched();
      return;
    }

    console.log('Demo form value', this.demoForm.getRawValue());
  }
}
