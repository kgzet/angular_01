import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { debounceTime, Subject } from 'rxjs';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialog } from '@angular/material/dialog';
import { ELEMENT_DATA } from "../../data/element-data";
import { EditPeriodicElementDialogComponent } from '../edit-periodic-element-dialog/edit-periodic-element-dialog.component';
import { PeriodicElement } from '../../models/periodic-element.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'periodic-table',
  templateUrl: 'periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss'],
  imports: [
    MatTableModule, 
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class PeriodicTableComponent implements OnInit, AfterViewInit  {
  columnsToDisplay: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  private filterSubject = new Subject<string>();

  @ViewChild(MatSort) sort: MatSort | null = null;

  ngOnInit() {
    this.dataSource.data = []; // simulation
    setTimeout(() => {
      this.dataSource.data = ELEMENT_DATA;
    }, 1000);
    this.filterSubject.pipe(debounceTime(2000)).subscribe(filterValue => {
      this.dataSource.filter = filterValue;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string | null): void {
    if (filterValue) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.filterSubject.next(filterValue);
    }
  }

  constructor(private dialog: MatDialog) {}

  openEditDialog(element: PeriodicElement): void {
    const allPositions = this.dataSource.data.map(e => e.position);
    const dialogRef = this.dialog.open(EditPeriodicElementDialogComponent, {
      width: '400px',
      data: { element, allPositions }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(e => e.position === element.position);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data];
        }
      }
    });
  }
}
