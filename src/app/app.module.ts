import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Apollo, ApolloModule} from 'apollo-angular';
import { InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    HttpLinkModule,
    ApolloModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  /**
   * Creates an instance of AppModule.
   *
   * @param {Apollo} apollo
   *   Apollo.
   * @param {HttpLink} httpLink
   *   Http link service.
   *
   * @memberof AppModule
   */
  constructor(protected apollo: Apollo, protected httpLink: HttpLink) {
    this.setupApollo();
  }

  /**
   * Setup apollo client so we can call our hasura engine.
   */
  private setupApollo() {
    const ws_uri = 'ws://localhost:5000/v1/graphql';
    const http_uri = 'http://localhost:5000/v1/graphql';

    const http = this.httpLink.create({
      uri: http_uri
    });

    const ws = new WebSocketLink({
      uri: ws_uri,
      options: {
        reconnect: true
      }
    });

    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      ws,
      http,
    );

    this.apollo.create({
      link,
      cache: new InMemoryCache()
    });

  }

}
