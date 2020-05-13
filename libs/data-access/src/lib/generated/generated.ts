import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};



export type User = {
   __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  getAll: Array<User>;
};

export type Mutation = {
   __typename?: 'Mutation';
  putUser: User;
};


export type MutationPutUserArgs = {
  input: PutUserInput;
};

export type PutUserInput = {
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type UserListQueryVariables = {};


export type UserListQuery = (
  { __typename?: 'Query' }
  & { getAll: Array<(
    { __typename?: 'User' }
    & Pick<User, 'email'>
  )> }
);

export type AddUserMutationVariables = {
  input: PutUserInput;
};


export type AddUserMutation = (
  { __typename?: 'Mutation' }
  & { putUser: (
    { __typename?: 'User' }
    & Pick<User, 'email'>
  ) }
);

export const UserListDocument = gql`
    query userList {
  getAll {
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserListGQL extends Apollo.Query<UserListQuery, UserListQueryVariables> {
    document = UserListDocument;
    
  }
export const AddUserDocument = gql`
    mutation addUser($input: PutUserInput!) {
  putUser(input: $input) {
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddUserGQL extends Apollo.Mutation<AddUserMutation, AddUserMutationVariables> {
    document = AddUserDocument;
    
  }