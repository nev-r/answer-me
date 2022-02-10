//
// delayed resolvers
//
import { Embed, } from "discord.js";
/** try to do whatever func wants to do, but delete msg if there's an error */
export async function bugOut(msg, func) {
    try {
        return await func();
    }
    catch (e) {
        await delMsg(msg);
        throw e;
    }
}
export async function delMsg(msg) {
    try {
        msg?.deletable && (await msg.delete());
    }
    catch (e) {
        console.log(e);
    }
    return;
}
/** deprecated i guess */
export async function sendMsg(channel, sendable) {
    let toSend;
    if (sendable instanceof Embed)
        toSend = { embeds: [sendable] };
    else if (typeof sendable === "string")
        toSend = { content: sendable };
    else
        toSend = sendable;
    return channel.send(toSend);
}
export function sendableToMessageOptions(sendable) {
    if (sendable instanceof Embed)
        return { embeds: [sendable] };
    else if (typeof sendable === "string")
        return { content: sendable };
    else
        return sendable;
}
export function sendableToInteractionReplyOptions(sendable) {
    if (sendable instanceof Embed)
        return { embeds: [sendable] };
    else if (typeof sendable === "string")
        return { content: sendable };
    else
        return sendable;
}
export function sendableToPayload(sendable) {
    if (sendable instanceof Embed)
        return { embeds: [sendable] };
    else if (typeof sendable === "string")
        return { content: sendable };
    else
        return sendable;
}
export function boolFilter(arr) {
    return arr.filter(Boolean);
}
