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
  removeMyTask: Task;
  completeMyTask: Task;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationCreateMyTaskArgs = {
  input: CreateMyTaskInput;
};


export type MutationUpdateMyTaskArgs = {
  input: UpdateMyTaskInput;
};


export type MutationRemoveMyTaskArgs = {
  input: RemoveMyTaskInput;
};


export type MutationCompleteMyTaskArgs = {
  input: CompleteMyTaskInput;
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

export type UpdateMyTaskInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  _id: Scalars['ID'];
};

export type RemoveMyTaskInput = {
  _id: Scalars['ID'];
};

export type CompleteMyTaskInput = {
  _id: Scalars['ID'];
};

export type LoginQueryVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginQuery = (
  { __typename?: 'Query' }
  & { login: (
    { __typename?: 'LoginOutput' }
    & Pick<LoginOutput, 'accessToken'>
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

export type GetMyTasksQueryVariables = {};


export type GetMyTasksQuery = (
  { __typename?: 'Query' }
  & { getMyTasks: Array<(
    { __typename?: 'Task' }
    & Pick<Task, '_id' | 'name' | 'description' | 'completed' | 'date'>
  )> }
);

export type CreateMyTaskMutationVariables = {
  input: CreateMyTaskInput;
};


export type CreateMyTaskMutation = (
  { __typename?: 'Mutation' }
  & { createMyTask: (
    { __typename?: 'Task' }
    & Pick<Task, '_id' | 'name' | 'completed' | 'description' | 'date'>
  ) }
);

export type UpdateMyTaskMutationVariables = {
  input: UpdateMyTaskInput;
};


export type UpdateMyTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateMyTask: (
    { __typename?: 'Task' }
    & Pick<Task, '_id' | 'name' | 'completed' | 'description' | 'date'>
  ) }
);

export type RemoveMyTaskMutationVariables = {
  input: RemoveMyTaskInput;
};


export type RemoveMyTaskMutation = (
  { __typename?: 'Mutation' }
  & { removeMyTask: (
    { __typename?: 'Task' }
    & Pick<Task, '_id'>
  ) }
);

export type CompleteMyTaskMutationVariables = {
  input: CompleteMyTaskInput;
};


export type CompleteMyTaskMutation = (
  { __typename?: 'Mutation' }
  & { completeMyTask: (
    { __typename?: 'Task' }
    & Pick<Task, '_id'>
  ) }
);

export type GetMyUserQueryVariables = {};


export type GetMyUserQuery = (
  { __typename?: 'Query' }
  & { getMyUser: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'firstName' | 'lastName'>
  ) }
);

export const LoginDocument = gql`
    query login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Query<LoginQuery, LoginQueryVariables> {
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
    providedIn: 'root'
  })
  export class RegisterUserGQL extends Apollo.Mutation<RegisterUserMutation, RegisterUserMutationVariables> {
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
    providedIn: 'root'
  })
  export class GetMyTasksGQL extends Apollo.Query<GetMyTasksQuery, GetMyTasksQueryVariables> {
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
    providedIn: 'root'
  })
  export class CreateMyTaskGQL extends Apollo.Mutation<CreateMyTaskMutation, CreateMyTaskMutationVariables> {
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
    providedIn: 'root'
  })
  export class UpdateMyTaskGQL extends Apollo.Mutation<UpdateMyTaskMutation, UpdateMyTaskMutationVariables> {
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
    providedIn: 'root'
  })
  export class RemoveMyTaskGQL extends Apollo.Mutation<RemoveMyTaskMutation, RemoveMyTaskMutationVariables> {
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
    providedIn: 'root'
  })
  export class CompleteMyTaskGQL extends Apollo.Mutation<CompleteMyTaskMutation, CompleteMyTaskMutationVariables> {
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
    providedIn: 'root'
  })
  export class GetMyUserGQL extends Apollo.Query<GetMyUserQuery, GetMyUserQueryVariables> {
    document = GetMyUserDocument;
    
  }