import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule, MatProgressSpinnerModule, MatDialogModule, MatSnackBarModule, MatRadioModule, MatSlideToggleModule, MatSliderModule, MatSelectModule, MatStepperModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { EmpAddComponent } from './components/emp-add/emp-add.component';
import { EmpUpdateComponent, empIDialogU } from './components/emp-update/emp-update.component';
import { EmpDeleteComponent, empIDialogD } from './components/emp-delete/emp-delete.component';
import { EmpSearchComponent } from './components/emp-search/emp-search.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpAddComponent,
    EmpUpdateComponent,
    EmpDeleteComponent,
    EmpSearchComponent,
    empIDialogU,
    empIDialogD
  ],
  entryComponents: [
    empIDialogU,
    empIDialogD
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatExpansionModule
  ]
})
export class AppModule { }