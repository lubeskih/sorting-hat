import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import { NgModule } from '@angular/core';

export const uri = "http://localhost:3000/graphql"; // GraphQL API

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
    return {
        link: httpLink.create({
            uri: uri,
          }),
        cache: new InMemoryCache(),
    }
}

@NgModule({
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        }
    ],
})
export class GraphQLModule {}