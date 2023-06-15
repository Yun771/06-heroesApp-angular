import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import {MaterialModule} from "../material/material.module";
import { HttpClientModule} from "@angular/common/http";
import { HeroCardComponent } from './pages/components/hero-card/hero-card.component';
import { HeroImagePipe } from './pages/pipes/hero-image.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import { ConfirDialogComponent } from './pages/components/confir-dialog/confir-dialog.component';


@NgModule({
  declarations: [
    HeroPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    HeroCardComponent,
    HeroImagePipe,
    ConfirDialogComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class HeroesModule { }
