import type {
  BufferResolvable,
  ChannelResolvable,
  GuildResolvable,
  MessageEmbed,
  MessageResolvable,
} from "discord.js";
import {
  buildEmojiDictUsingClient,
  editMessageUsingClient,
  publishMessageUsingClient,
  sendMessageUsingClient,
  uploadEmojiListUsingClient,
} from "./raw-utils.js";
import { doSomethingUsingTempClient } from "./temp-client.js";

/**
 * logs into discord, sends a message to a specific channel, and logs out.
 * optionally crossposts/publishes it
 *
 * returns the message that was sent
 */
export async function sendSingleMessage(
  apiToken: string,
  channel: ChannelResolvable,
  content: string | MessageEmbed
) {
  return doSomethingUsingTempClient(apiToken, async (client) => {
    return sendMessageUsingClient(client, channel, content);
  });
}

/**
 * logs into discord, publishes an existing message found in a specific channel, and logs out
 *
 * returns the message that was published
 */
export async function publishSingleMessage(
  apiToken: string,
  channel: ChannelResolvable,
  message: MessageResolvable
) {
  return doSomethingUsingTempClient(apiToken, async (client) => {
    return publishMessageUsingClient(client, channel, message);
  });
}

/**
 * logs into discord, sends a message to a specific channel, and logs out
 *
 * returns the message that was edited
 */
export async function editSingleMessage(
  apiToken: string,
  channel: ChannelResolvable,
  messageId: string,
  content: string | MessageEmbed
) {
  return doSomethingUsingTempClient(apiToken, async (client) => {
    return editMessageUsingClient(client, channel, messageId, content);
  });
}

/**
 * logs into discord, and builds an emoji dict from a server or array of servers
 *
 * returns the emoji dict
 */
export async function staticBuildEmojiDict(
  apiToken: string,
  guilds: GuildResolvable | GuildResolvable[]
) {
  guilds = Array.isArray(guilds) ? guilds : [guilds];
  return doSomethingUsingTempClient(apiToken, (client) => {
    return buildEmojiDictUsingClient(client, guilds);
  });
}

/**
 * makes sure an array of emoji is all uploaded to a server. doesnt delete to make room though, so. unreliable.
 *
 * returns the emoji dict
 */
export async function uploadEmoteList(
  apiToken: string,
  guild: GuildResolvable,
  emoteList: { attachment: BufferResolvable; name: string }[]
) {
  return doSomethingUsingTempClient(apiToken, (client) => {
    return uploadEmojiListUsingClient(client, guild, emoteList);
  });
}

function undict<T>(dict: NodeJS.Dict<T>): Record<string, T> {
  return dict as any;
}
