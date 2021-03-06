/* tslint:disable */
/* eslint-disable */
/**
 * forum
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists } from './runtime';
/**
 * 汎用エラーモデル
 * @export
 * @interface ModelError
 */
export interface ModelError {
    /**
     * エラーのハンドリングを示すパラメータ
     * @type {string}
     * @memberof ModelError
     */
    code: ModelErrorCodeEnum;
    /**
     * エラーに関する説明
     * @type {string}
     * @memberof ModelError
     */
    message: string;
}

/**
* @export
* @enum {string}
*/
export enum ModelErrorCodeEnum {
    Internal = 'INTERNAL',
    Conflict = 'CONFLICT',
    Maintenance = 'MAINTENANCE'
}

export function ModelErrorFromJSON(json: any): ModelError {
    return ModelErrorFromJSONTyped(json, false);
}

export function ModelErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelError {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code': json['code'],
        'message': json['message'],
    };
}

export function ModelErrorToJSON(value?: ModelError | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'code': value.code,
        'message': value.message,
    };
}


