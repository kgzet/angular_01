import { Component } from '@angular/core';
import { PeriodicTableComponent } from './components/periodic-table/periodic-table.component';

@Component({
  selector: 'app-root',
  imports: [PeriodicTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected title = 'Angular-task-Kinga-Zajdel';
}
