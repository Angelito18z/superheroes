
import { Component, Inject } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
constructor(  public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  @Inject(MAT_DIALOG_DATA)public data: Hero){
}

onNoClick():void{
this.dialogRef.close(false);
}

onConfirm():void{
  this.dialogRef.close(true);
}
}
