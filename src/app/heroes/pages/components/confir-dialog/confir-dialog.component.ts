import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Hero} from "../../../interfaces/hero.interface";

@Component({
  selector: 'heroes-component-confir-dialog',
  templateUrl: './confir-dialog.component.html',
})
export class ConfirDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public hero: Hero
  ) {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm():void {
    this.dialogRef.close(true)
  }
}
