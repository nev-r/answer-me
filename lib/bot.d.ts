import Discord, { MessageAdditions, MessageOptions } from "discord.js";
export declare const startupTimestamp: Date;
export declare const client: Discord.Client;
/** undefined when the client isn't started, resolves when the client has connected */
export declare let clientReadyPromise: Promise<Discord.Client> | undefined;
/** check if the client has done its first connection */
export declare let clientReady: boolean;
/**
 * set the command prefix (i.e. `!` or `?` or whatever)
 *
 * @param prefix a string will be used literally. a regex can be used instead,
 * like `!|?` but it shouldn't capture the command word or the line beginning
 */
export declare function setPrefix(prefix: string | RegExp): void;
declare let activities: Discord.ActivityOptions[];
/**
 * add 1 or more discord presence statuses to cycle through
 */
export declare function addActivity(...activities_: (string | Discord.ActivityOptions)[]): void;
/**
 * completely replaces existing `activities` statuses. you may want `addActivity` instead
 */
export declare function setActivities(activities_: typeof activities): void;
declare let onConnects: ((client_: Discord.Client) => void)[];
/**
 * add function(s) to run upon first logging into discord
 *
 * the discord client will be passed as an arg
 */
export declare function addOnConnect(...onConnect_: typeof onConnects): void;
/** completely replaces existing `onConnect` functions. prefer `addOnConnect` */
export declare function setOnConnects(onConnects_: typeof onConnects): void;
declare let onReconnects: ((client_: Discord.Client) => void)[];
/**
 * add function(s) to run upon any reconnection to discord
 *
 * the discord client will be passed as an arg
 */
export declare function addOnReconnect(...onReconnect_: typeof onReconnects): void;
/** completely replaces existing `onReconnect` functions. prefer `addOnReconnect` */
export declare function setOnReconnect(onReconnect_: typeof onReconnects): void;
/** starts the client up. resolves (to the client) when the client has connected/is ready */
export declare function init(token: string): Promise<Discord.Client>;
/**
 * a ValidMessage is anything that can be fed into discord.js's send function:
 *
 * strings, MessageOptions, embeds, attachments, arrays of the aforementioned, etc.
 */
export declare type ValidMessage = (MessageOptions & {
    split?: false | undefined;
}) | MessageAdditions | string;
/**
 * describes the message that triggered a CommandResponse
 */
export interface CommandParams {
    /** the message that triggered this command */
    msg: Discord.Message;
    /** the text content of the message that triggered this command */
    content: string;
    /** the matched command name */
    command: string;
    /** any string content after the matched command name */
    args?: string;
}
/**
 * describes the message that triggered a TriggerResponse
 */
export interface TriggerParams {
    /** the message that triggered this command */
    msg: Discord.Message;
    /** the text content of the message that triggered this command */
    content: string;
}
/**
 * either a ValidMessage, or a function that generates a ValidMessage.
 * if it's a function, it's passed the CommandParams object
 */
export declare type CommandResponse = ((params: CommandParams) => ValidMessage | undefined | Promise<ValidMessage | undefined>) | ValidMessage;
/**
 * either a ValidMessage, or a function that generates a ValidMessage.
 * if it's a function, it's passed the TriggerParams object
 */
export declare type TriggerResponse = ((params: TriggerParams) => ValidMessage | undefined | Promise<ValidMessage | undefined>) | ValidMessage;
declare const commands: {
    command: string | string[];
    response: CommandResponse;
}[];
/**
 * either a ValidMessage, or a function that generates a ValidMessage.
 * if it's a function, it's passed the TriggerParams object
 */
export declare function addCommand(...commands_: typeof commands): void;
declare const triggers: {
    trigger: RegExp;
    response: TriggerResponse;
}[];
/**
 * either a ValidMessage, or a function that generates a ValidMessage.
 * if it's a function, it's passed the TriggerParams object
 */
export declare function addTrigger(...triggers_: typeof triggers): void;
export {};
