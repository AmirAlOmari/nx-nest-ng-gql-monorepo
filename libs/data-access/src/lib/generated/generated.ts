import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
}

export interface User {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
}

export interface LoginOutput {
  __typename?: 'LoginOutput';
  accessToken: Scalars['String'];
  me: User;
}

export interface Task {
  __typename?: 'Task';
  _id: Scalars['ID'];
  user: User;
  userId: Scalars['String'];
  name: Scalars['String'];
  completed: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
}

export interface Query {
  __typename?: 'Query';
  getMyTasks: Array<Task>;
  getMyUser: User;
}

export interface Mutation {
  __typename?: 'Mutation';
  login: LoginOutput;
  registerUser: User;
  createMyTask: Task;
  updateMyTask: Task;
  removeMyTask: Task;
  completeMyTask: Task;
}

export interface MutationLoginArgs {
  password: Scalars['String'];
  email: Scalars['String'];
}

export interface MutationRegisterUserArgs {
  input: RegisterUserInput;
}

export interface MutationCreateMyTaskArgs {
  input: CreateMyTaskInput;
}

export interface MutationUpdateMyTaskArgs {
  input: UpdateMyTaskInput;
}

export interface MutationRemoveMyTaskArgs {
  input: RemoveMyTaskInput;
}

export interface MutationCompleteMyTaskArgs {
  input: CompleteMyTaskInput;
}

export interface RegisterUserInput {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
}

export interface CreateMyTaskInput {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
}

export interface UpdateMyTaskInput {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  _id: Scalars['ID'];
}

export interface RemoveMyTaskInput {
  _id: Scalars['ID'];
}

export interface CompleteMyTaskInput {
  _id: Scalars['ID'];
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'LoginOutput' } & Pick<LoginOutput, 'accessToken'> & {
      me: { __typename?: 'User' } & Pick<
        User,
        '_id' | 'firstName' | 'lastName' | 'email'
      >;
    };
};

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;

export type RegisterUserMutation = { __typename?: 'Mutation' } & {
  registerUser: { __typename?: 'User' } & Pick<
    User,
    '_id' | 'email' | 'firstName' | 'lastName'
  >;
};

export type GetMyTasksQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyTasksQuery = { __typename?: 'Query' } & {
  getMyTasks: Array<
    { __typename?: 'Task' } & Pick<
      Task,
      '_id' | 'name' | 'description' | 'completed' | 'date'
    >
  >;
};

export type CreateMyTaskMutationVariables = Exact<{
  input: CreateMyTaskInput;
}>;

export type CreateMyTaskMutation = { __typename?: 'Mutation' } & {
  createMyTask: { __typename?: 'Task' } & Pick<
    Task,
    '_id' | 'name' | 'completed' | 'description' | 'date'
  >;
};

export type UpdateMyTaskMutationVariables = Exact<{
  input: UpdateMyTaskInput;
}>;

export type UpdateMyTaskMutation = { __typename?: 'Mutation' } & {
  updateMyTask: { __typename?: 'Task' } & Pick<
    Task,
    '_id' | 'name' | 'completed' | 'description' | 'date'
  >;
};

export type RemoveMyTaskMutationVariables = Exact<{
  input: RemoveMyTaskInput;
}>;

export type RemoveMyTaskMutation = { __typename?: 'Mutation' } & {
  removeMyTask: { __typename?: 'Task' } & Pick<Task, '_id'>;
};

export type CompleteMyTaskMutationVariables = Exact<{
  input: CompleteMyTaskInput;
}>;

export type CompleteMyTaskMutation = { __typename?: 'Mutation' } & {
  completeMyTask: { __typename?: 'Task' } & Pick<Task, '_id'>;
};

export type GetMyUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyUserQuery = { __typename?: 'Query' } & {
  getMyUser: { __typename?: 'User' } & Pick<
    User,
    '_id' | 'email' | 'firstName' | 'lastName'
  >;
};

export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      me {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class LoginGQL extends Apollo.Mutation<
  LoginMutation,
  LoginMutationVariables
> {
  document = LoginDocument;
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
  providedIn: 'root',
})
export class RegisterUserGQL extends Apollo.Mutation<
  RegisterUserMutation,
  RegisterUserMutationVariables
> {
  document = RegisterUserDocument;
}
export const GetMyTasksDocument = gql`
  query getMyTasks {
    getMyTasks {
      _id
      name
      description
      completed
      date
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetMyTasksGQL extends Apollo.Query<
  GetMyTasksQuery,
  GetMyTasksQueryVariables
> {
  document = GetMyTasksDocument;
}
export const CreateMyTaskDocument = gql`
  mutation createMyTask($input: CreateMyTaskInput!) {
    createMyTask(input: $input) {
      _id
      name
      completed
      description
      date
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateMyTaskGQL extends Apollo.Mutation<
  CreateMyTaskMutation,
  CreateMyTaskMutationVariables
> {
  document = CreateMyTaskDocument;
}
export const UpdateMyTaskDocument = gql`
  mutation updateMyTask($input: UpdateMyTaskInput!) {
    updateMyTask(input: $input) {
      _id
      name
      completed
      description
      date
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UpdateMyTaskGQL extends Apollo.Mutation<
  UpdateMyTaskMutation,
  UpdateMyTaskMutationVariables
> {
  document = UpdateMyTaskDocument;
}
export const RemoveMyTaskDocument = gql`
  mutation removeMyTask($input: RemoveMyTaskInput!) {
    removeMyTask(input: $input) {
      _id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class RemoveMyTaskGQL extends Apollo.Mutation<
  RemoveMyTaskMutation,
  RemoveMyTaskMutationVariables
> {
  document = RemoveMyTaskDocument;
}
export const CompleteMyTaskDocument = gql`
  mutation completeMyTask($input: CompleteMyTaskInput!) {
    completeMyTask(input: $input) {
      _id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CompleteMyTaskGQL extends Apollo.Mutation<
  CompleteMyTaskMutation,
  CompleteMyTaskMutationVariables
> {
  document = CompleteMyTaskDocument;
}
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
  providedIn: 'root',
})
export class GetMyUserGQL extends Apollo.Query<
  GetMyUserQuery,
  GetMyUserQueryVariables
> {
  document = GetMyUserDocument;
}
