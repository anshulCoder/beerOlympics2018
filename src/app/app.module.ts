import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import {ModalModule, PopoverModule} from "ngx-bootstrap";
import { SharingService } from './services/sharing.service';
import { BeerOlympicsApiService } from './services/beer-olympics-api.service';
import { HttpService } from './services/http.service';
import {HttpClientModule} from "@angular/common/http";
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonsOptions, IShareButtons } from '@ngx-share/core';
import { TooltipModule } from 'ngx-bootstrap';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  keyboard: true,
  navigation: true,
  pagination: false
};

const customOptions: ShareButtonsOptions = {
  include: ['facebook', 'twitter', 'copy', 'whatsapp']
};
const customProp: IShareButtons = {
  facebook: {
    text: 'Facebook'
  },
  twitter: {
    text: 'Tweet'
  },
  whatsapp: {
    text: 'Whatsapp'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterFormComponent,
    PageNotFoundComponent,
    HomeComponent,
    ThankYouComponent
  ],
  imports: [
    BrowserModule,
    SwiperModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    HttpClientModule,
    ShareButtonsModule.forRoot({
      options: customOptions,
      prop: customProp
    }),
    TooltipModule.forRoot()
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    SharingService,
    BeerOlympicsApiService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
