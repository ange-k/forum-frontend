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
 * 取り扱うゲームのモデル
 * @export
 * @interface Game
 */
export interface Game {
    /**
     * ゲームの識別子.URLに使用される
     * @type {string}
     * @memberof Game
     */
    idName: string;
    /**
     * ゲームの名前。HTML上に表示するもの
     * @type {string}
     * @memberof Game
     */
    viewName: string;
}

export function GameFromJSON(json: any): Game {
    return GameFromJSONTyped(json, false);
}

export function GameFromJSONTyped(json: any, ignoreDiscriminator: boolean): Game {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'idName': json['id_name'],
        'viewName': json['view_name'],
    };
}

export function GameToJSON(value?: Game | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id_name': value.idName,
        'view_name': value.viewName,
    };
}

