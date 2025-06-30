import { Component } from '@angular/core';
import { PeriodicTableComponent } from './components/periodic-table/periodic-table.component';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-root',
  imports: [
    PeriodicTableComponent,
    MatInputModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected title = 'Angular-project_01-KZ';
}
