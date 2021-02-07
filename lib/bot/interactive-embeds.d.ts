import type { Message, TextChannel, DMChannel, NewsChannel, User, EmbedFieldData } from "discord.js";
import { MessageEmbed } from "discord.js";
/**
 * accepts a channel to post to, and a collection of pages to
 * let users switch between
 *
 * in this implementation, each page is a MessageEmbed
 */
export declare function sendPaginatedEmbed<T>(_: {
    channel: TextChannel | DMChannel | NewsChannel;
    pages: MessageEmbed[];
    renderer?: undefined;
}): Promise<Message>;
/**
 * accepts a channel to post to, and a collection of pages to
 * let users switch between
 *
 * in this implementation each page is source data for a
 * renderer function, which turns a page into a MessageEmbed
 *
 * this can be used to defer heavy or async page rendering,
 * until that page is navigated to
 */
export declare function sendPaginatedEmbed<T>(_: {
    channel: TextChannel | DMChannel | NewsChannel;
    pages: T[];
    renderer: (sourceData: T) => MessageEmbed | Promise<MessageEmbed>;
}): Promise<Message>;
/**
 * accepts a channel to post to, and a collection of "pages" to let users randomly switch between
 *
 * in this implementation, each page is a MessageEmbed
 */
export declare function sendRerollableEmbed<T>(_: {
    channel: TextChannel | DMChannel | NewsChannel;
    pages: MessageEmbed[];
    renderer?: undefined;
}): Promise<Message>;
/**
 * accepts a channel to post to, and a collection of "pages" to let users randomly switch between
 *
 * in this implementation each page is source data for a renderer function, which turns a page into a MessageEmbed
 *
 * this can be used to defer heavy or async page rendering, until that page is navigated to
 */
export declare function sendRerollableEmbed<T>(_: {
    channel: TextChannel | DMChannel | NewsChannel;
    pages: T[];
    renderer: (sourceData: T) => MessageEmbed | Promise<MessageEmbed>;
}): Promise<Message>;
/**
 * accepts a channel to post to, and a collection of "pages" to let users randomly switch between. each page can only be viewed once
 *
 * in this implementation, each page is a MessageEmbed
 */
export declare function sendRerollableStackEmbed<T>(_: {
    channel: TextChannel | DMChannel | NewsChannel;
    pages: MessageEmbed[];
    renderer?: undefined;
}): Promise<Message>;
/**
 * accepts a channel to post to, and a collection of "pages" to let users randomly switch between. each page can only be viewed once
 *
 * in this implementation each page is source data for a renderer function, which turns a page into a MessageEmbed
 *
 * this can be used to defer heavy or async page rendering, until that page is navigated to
 */
export declare function sendRerollableStackEmbed<T>(_: {
    channel: TextChannel | DMChannel | NewsChannel;
    pages: T[];
    renderer: (sourceData: T) => MessageEmbed | Promise<MessageEmbed>;
}): Promise<Message>;
/**
 * accepts a channel to post to, a list of `T`s, and a function that turns a `T` into a valid element of a `MessageEmbed` field
 */
export declare function sendPaginatedSelector<T>({ user, channel, contentList, optionRenderer, resultRenderer, prompt, itemsPerPage, }: {
    user: User;
    channel: TextChannel | DMChannel | NewsChannel;
    contentList: T[];
    optionRenderer: (listItem: T, index: number) => EmbedFieldData;
    resultRenderer: (listItem: T) => MessageEmbed;
    prompt?: string;
    itemsPerPage?: number;
}): Promise<void>;
