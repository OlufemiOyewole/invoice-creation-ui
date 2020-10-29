import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from './core/material-components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditInvoiceMobileComponent } from './edit-invoice-mobile/edit-invoice-mobile.component';

@NgModule({
  declarations: [AppComponent, EditInvoiceMobileComponent],
  imports: [
    MaterialComponentsModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
