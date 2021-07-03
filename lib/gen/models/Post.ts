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

import { dateFormat } from '../../helper/genHelper';
import { exists } from './runtime';
import {
    UserData,
    UserDataFromJSON,
    UserDataFromJSONTyped,
    UserDataToJSON,
} from './UserData';

/**
 * ユーザ投稿モデル
 * @export
 * @interface Post
 */
export interface Post {
    /**
     * シーケンシャルID
     * @type {string}
     * @memberof Post
     */
    uuid?: string;
    /**
     * 
     * @type {Date}
     * @memberof Post
     */
    writeDay?: string; // Next.js がjson parseできないので.
    /**
     * 投稿先のゲームのID
     * @type {string}
     * @memberof Post
     */
    gameId: string;
    /**
     * 
     * @type {string}
     * @memberof Post
     */
    server?: string;
    /**
     * プレイヤーの名前
     * @type {string}
     * @memberof Post
     */
    playerName: string;
    /**
     * 
     * @type {string}
     * @memberof Post
     */
    purpose: PostPurposeEnum;
    /**
     * 
     * @type {boolean}
     * @memberof Post
     */
    vcUse: boolean;
    /**
     * 
     * @type {string}
     * @memberof Post
     */
    device: string;
    /**
     * 
     * @type {string}
     * @memberof Post
     */
    comment: string;
    /**
     * 
     * @type {Date}
     * @memberof Post
     */
    createdAt?: string; // Next.js がjson parseできないので.
    /**
     * 
     * @type {UserData}
     * @memberof Post
     */
    userData?: UserData;
    /**
     * 
     * @type {string}
     * @memberof Post
     */
    deleteKey?: string;
}

/**
* @export
* @enum {string}
*/
export enum PostPurposeEnum {
    Play = 'PLAY',
    TeamLanch = 'TEAM_LANCH',
    TeamScout = 'TEAM_SCOUT',
    TeamJoin = 'TEAM_JOIN',
    Event = 'EVENT',
    Other = 'OTHER'
}

export function PostFromJSON(json: any): Post {
    return PostFromJSONTyped(json, false);
}

export function PostFromJSONTyped(json: any, ignoreDiscriminator: boolean): Post {
    if ((json === undefined) || (json === null)) {
        return json;
    }

    return {
        
        'uuid': !exists(json, 'uuid') ? undefined : json['uuid'],
        'writeDay': !exists(json, 'writeDay') ? undefined : (new Date(json['writeDay']).toISOString()),
        'gameId': json['gameId'],
        'server': !exists(json, 'server') ? undefined : json['server'],
        'playerName': json['playerName'],
        'purpose': json['purpose'],
        'vcUse': json['vcUse'],
        'device': json['device'],
        'comment': json['comment'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (dateFormat(new Date(json['createdAt']))),
        'userData': !exists(json, 'userData') ? undefined : UserDataFromJSON(json['userData']),
        'deleteKey': !exists(json, 'deleteKey') ? undefined : json['deleteKey'],
    };
}

export function PostToJSON(value?: Post | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'uuid': value.uuid,
        'writeDay': value.writeDay === undefined ? undefined : (value.writeDay.substr(0,10)),
        'gameId': value.gameId,
        'server': value.server,
        'playerName': value.playerName,
        'purpose': value.purpose,
        'vcUse': value.vcUse,
        'device': value.device,
        'comment': value.comment,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt),
        'userData': UserDataToJSON(value.userData),
        'deleteKey': value.deleteKey,
    };
}


