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
import { ClientsControllerCreateData, CreateClientDto } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Clients<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 과제 진행자 간 데이터 분리를 위해 사전에 클라이언트를 등록해야 합니다.
   *
   * @tags 0.2. Clients
   * @name ClientsControllerCreate
   * @summary 클라이언트 등록
   * @request POST:/clients
   */
  clientsControllerCreate = (
    data: CreateClientDto,
    params: RequestParams = {},
  ) =>
    this.request<ClientsControllerCreateData, void>({
      path: `/clients`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
