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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};



export type User = {
   __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type LoginOutput = {
   __typename?: 'LoginOutput';
  accessToken: Scalars['String'];
};

export type Task = {
   __typename?: 'Task';
  _id: Scalars['ID'];
  user: User;
  userId: Scalars['String'];
  name: Scalars['String'];
  completed: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
};


export type Query = {
   __typename?: 'Query';
  login: LoginOutput;
  getMyTasks: Array<Task>;
  getMyUser: User;
};


export type QueryLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  registerUser: User;
  createMyTask: Task;
  updateMyTask: Task;
  completeMyTask: Task;
  removeMyTask: Task;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationCreateMyTaskArgs = {
  input: CreateMyTaskInput;
};


export type MutationUpdateMyTaskArgs = {
  input: CreateMyTaskInput;
};


export type MutationCompleteMyTaskArgs = {
  input: CreateMyTaskInput;
};


export type MutationRemoveMyTaskArgs = {
  input: CreateMyTaskInput;
};

export type RegisterUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type CreateMyTaskInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
};

export type GetMyUserQueryVariables = {};


export type GetMyUserQuery = (
  { __typename?: 'Query' }
  & { getMyUser: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'firstName' | 'lastName'>
  ) }
);

export type RegisterUserMutationVariables = {
  input: RegisterUserInput;
};


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'firstName' | 'lastName'>
  ) }
);

export const GetMyUserDocument = gql`
    query getMyUser {
  getMyUser {
    _id
    email
    firstName
    lastName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetMyUserGQL extends Apollo.Query<GetMyUserQuery, GetMyUserQueryVariables> {
    document = GetMyUserDocument;
    
  }
export const RegisterUserDocument = gql`
    mutation registerUser($input: RegisterUserInput!) {
  registerUser(input: $input) {
    _id
    email
    firstName
    lastName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterUserGQL extends Apollo.Mutation<RegisterUserMutation, RegisterUserMutationVariables> {
    document = RegisterUserDocument;
    
  }