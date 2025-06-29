import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { PeriodicElement } from '../../models/periodic-element.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'edit-periodic-element-dialog',
  templateUrl: './edit-periodic-element-dialog.component.html',
  styleUrls: ['./edit-periodic-element-dialog.component.scss'],
  imports: [
    MatFormFieldModule,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class EditPeriodicElementDialogComponent {
  elementForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditPeriodicElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { element: PeriodicElement, allPositions: number[] },
    private fb: FormBuilder
  ) {
    this.elementForm = this.fb.group({
      position: [data.element.position, [Validators.required, Validators.min(1), this.uniquePositionValidator(data.allPositions, data.element.position)]],
      name: [data.element.name, [Validators.required]],
      weight: [data.element.weight, [Validators.required]],
      symbol: [data.element.symbol, [Validators.required]]
    });
  }

  uniquePositionValidator(allPositions: number[], currentPosition: number): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (allPositions.filter(pos => pos !== currentPosition).includes(Number(value))) {
        return { notUnique: true };
      }
      return null;
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.elementForm.valid) {
      this.dialogRef.close(this.elementForm.value);
    }
  }
}
