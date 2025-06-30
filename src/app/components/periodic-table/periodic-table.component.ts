import { AfterViewInit, Component, ViewChild, OnInit } from "@angular/core";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, Subject } from 'rxjs';
import { EditPeriodicElementDialogComponent } from '../edit-periodic-element-dialog/edit-periodic-element-dialog.component';
import { PeriodicElement } from '../../models/periodic-element.model';
import { ELEMENT_DATA } from "../../data/element-data";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  selector: 'periodic-table',
  templateUrl: 'periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss'],
  imports: [
    CommonModule,
    MatTableModule, 
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class PeriodicTableComponent implements OnInit, AfterViewInit  {
  columnsToDisplay: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  private filterSubject = new Subject<string>();
  isLoading = true;

  @ViewChild(MatSort) sort: MatSort | null = null;

  ngOnInit() {
    this.dataSource.data = []; // simulation
    this.isLoading = true;
    setTimeout(() => {
      this.dataSource.data = ELEMENT_DATA;
      this.isLoading = false;
    }, 2000);
    this.filterSubject.pipe(debounceTime(2000)).subscribe(filterValue => {
      this.dataSource.filter = filterValue;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string | null): void {
    if (filterValue !== null && filterValue !== undefined) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.filterSubject.next(filterValue);
    } else {
    this.dataSource.filter = '';
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
