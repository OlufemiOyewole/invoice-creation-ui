import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from './core/material-components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { EditPreviewInvoiceComponent } from './edit-preview-invoice/edit-preview-invoice.component';
import { StopClickPropagationDirective } from './shared/stop-click-propagation.directive';
import { InputComponent } from './shared/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    EditInvoiceComponent,
    EditPreviewInvoiceComponent,
    StopClickPropagationDirective,
    InputComponent,
  ],
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
