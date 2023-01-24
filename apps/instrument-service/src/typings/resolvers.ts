import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type AddInstrumentInput = {
  family: InstrumentFamily;
  name: Scalars['String'];
};

export type Instrument = {
  __typename?: 'Instrument';
  createdAt: Scalars['Date'];
  family: InstrumentFamily;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type InstrumentFamily =
  | 'ELECTRONIC'
  | 'PERCUSSION'
  | 'STRING'
  | 'WIND';

export type Musician = {
  __typename?: 'Musician';
  instruments?: Maybe<Array<Instrument>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addInstrument?: Maybe<Instrument>;
};


export type MutationAddInstrumentArgs = {
  input: AddInstrumentInput;
};

export type Query = {
  __typename?: 'Query';
  _instruments?: Maybe<Musician>;
  _sdl: Scalars['String'];
  instruments?: Maybe<Array<Instrument>>;
};


export type Query_InstrumentsArgs = {
  ids: Array<Scalars['ID']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddInstrumentInput: AddInstrumentInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Instrument: ResolverTypeWrapper<Instrument>;
  InstrumentFamily: InstrumentFamily;
  Musician: ResolverTypeWrapper<Musician>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddInstrumentInput: AddInstrumentInput;
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  ID: Scalars['ID'];
  Instrument: Instrument;
  Musician: Musician;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
};

export type CanonicalDirectiveArgs = { };

export type CanonicalDirectiveResolver<Result, Parent, ContextType = Context, Args = CanonicalDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ComputedDirectiveArgs = {
  selectionSet: Scalars['String'];
};

export type ComputedDirectiveResolver<Result, Parent, ContextType = Context, Args = ComputedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type KeyDirectiveArgs = {
  selectionSet: Scalars['String'];
};

export type KeyDirectiveResolver<Result, Parent, ContextType = Context, Args = KeyDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MergeDirectiveArgs = {
  additionalArgs?: Maybe<Scalars['String']>;
  argsExpr?: Maybe<Scalars['String']>;
  key?: Maybe<Array<Scalars['String']>>;
  keyArg?: Maybe<Scalars['String']>;
  keyField?: Maybe<Scalars['String']>;
};

export type MergeDirectiveResolver<Result, Parent, ContextType = Context, Args = MergeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type InstrumentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Instrument'] = ResolversParentTypes['Instrument']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  family?: Resolver<ResolversTypes['InstrumentFamily'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MusicianResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Musician'] = ResolversParentTypes['Musician']> = {
  instruments?: Resolver<Maybe<Array<ResolversTypes['Instrument']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addInstrument?: Resolver<Maybe<ResolversTypes['Instrument']>, ParentType, ContextType, RequireFields<MutationAddInstrumentArgs, 'input'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _instruments?: Resolver<Maybe<ResolversTypes['Musician']>, ParentType, ContextType, RequireFields<Query_InstrumentsArgs, 'ids'>>;
  _sdl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  instruments?: Resolver<Maybe<Array<ResolversTypes['Instrument']>>, ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Date?: GraphQLScalarType;
  Instrument?: InstrumentResolvers<ContextType>;
  Musician?: MusicianResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = Context> = {
  canonical?: CanonicalDirectiveResolver<any, any, ContextType>;
  computed?: ComputedDirectiveResolver<any, any, ContextType>;
  key?: KeyDirectiveResolver<any, any, ContextType>;
  merge?: MergeDirectiveResolver<any, any, ContextType>;
};
