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
  CreateSchemaDto,
  SchemasControllerCreateData,
  SchemasControllerFindOneData,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Schemas<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 설문마다 스키마가 다르므로 폼을 제출하기 전에 스키마를 등록해야 합니다.
   *
   * @tags 2.1. Schemas
   * @name SchemasControllerCreate
   * @summary 스키마 등록
   * @request POST:/schemas
   */
  schemasControllerCreate = (
    data: CreateSchemaDto,
    params: RequestParams = {},
  ) =>
    this.request<SchemasControllerCreateData, void>({
      path: `/schemas`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 2.1. Schemas
   * @name SchemasControllerFindOne
   * @summary 스키마 조회
   * @request GET:/schemas/{slug}
   */
  schemasControllerFindOne = (slug: string, params: RequestParams = {}) =>
    this.request<SchemasControllerFindOneData, void>({
      path: `/schemas/${slug}`,
      method: 'GET',
      ...params,
    });
}
