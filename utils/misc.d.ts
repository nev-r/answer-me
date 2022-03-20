import { EmbedBuilder, InteractionReplyOptions, InteractionUpdateOptions, Message, MessageOptions, MessagePayload } from "discord.js";
import { APIEmbed } from "discord.js/node_modules/discord-api-types/v9";
import { Sendable } from "../types/types-discord.js";
/** try to do whatever func wants to do, but delete msg if there's an error */
export declare function bugOut<T extends any>(msg: Message | undefined, func: (() => T) | (() => Promise<T>)): Promise<T>;
export declare function delMsg(msg?: Message): Promise<void>;
/** deprecated i guess */
export declare function sendMsg(channel: Message["channel"], sendable: Sendable): Promise<Message<boolean>>;
export declare function sendableToMessageOptions(sendable: Sendable): Partial<Pick<MessageOptions, "components" | "content" | "files"> & {
    embeds?: APIEmbed[];
}>;
export declare function sendableToInteractionReplyOptions(sendable: MessageOptions | InteractionReplyOptions | EmbedBuilder | string): InteractionReplyOptions | MessageOptions;
export declare function sendableToInteractionUpdateOptions(sendable: MessageOptions | InteractionReplyOptions | EmbedBuilder | string): InteractionUpdateOptions;
export declare function sendableToPayload(sendable: MessagePayload | EmbedBuilder | string | Sendable): MessagePayload | (MessageOptions & {
    ephemeral?: boolean | undefined;
});
export declare function boolFilter<T>(arr: T[]): NonNullable<T>[];
