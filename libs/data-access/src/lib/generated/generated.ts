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


export type LoginOutput = {
   __typename?: 'LoginOutput';
  accessToken: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  getMyTasks: Array<Task>;
  getAll: Array<User>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createTask: Task;
  updateTask: Task;
  completeTask: Task;
  removeTask: Task;
  registerUser: User;
  login: LoginOutput;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type RegisterUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
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

export type RegisterUserMutationVariables = {
  input: RegisterUserInput;
};


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
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
export const RegisterUserDocument = gql`
    mutation registerUser($input: RegisterUserInput!) {
  registerUser(input: $input) {
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterUserGQL extends Apollo.Mutation<RegisterUserMutation, RegisterUserMutationVariables> {
    document = RegisterUserDocument;
    
  }