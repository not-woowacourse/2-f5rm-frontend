/* eslint-disable */

/* tslint:disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
import {
  CreateTodoDto,
  TodosControllerCreateData,
  TodosControllerFindAllData,
  TodosControllerFindOneData,
  TodosControllerRemoveData,
  TodosControllerUpdateData,
  UpdateTodoDto,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Todos<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 1.1. Todos
   * @name TodosControllerCreate
   * @summary 할 일 생성
   * @request POST:/todos
   */
  todosControllerCreate = (data: CreateTodoDto, params: RequestParams = {}) =>
    this.request<TodosControllerCreateData, void>({
      path: `/todos`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 1.1. Todos
   * @name TodosControllerFindAll
   * @summary 모든 할 일 조회
   * @request GET:/todos
   */
  todosControllerFindAll = (params: RequestParams = {}) =>
    this.request<TodosControllerFindAllData, void>({
      path: `/todos`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 1.1. Todos
   * @name TodosControllerFindOne
   * @summary 할 일 조회
   * @request GET:/todos/{id}
   */
  todosControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<TodosControllerFindOneData, void>({
      path: `/todos/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 1.1. Todos
   * @name TodosControllerUpdate
   * @summary 할 일 수정
   * @request PATCH:/todos/{id}
   */
  todosControllerUpdate = (
    id: string,
    data: UpdateTodoDto,
    params: RequestParams = {},
  ) =>
    this.request<TodosControllerUpdateData, void>({
      path: `/todos/${id}`,
      method: 'PATCH',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 1.1. Todos
   * @name TodosControllerRemove
   * @summary 할 일 삭제
   * @request DELETE:/todos/{id}
   */
  todosControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<TodosControllerRemoveData, void>({
      path: `/todos/${id}`,
      method: 'DELETE',
      ...params,
    });
}
