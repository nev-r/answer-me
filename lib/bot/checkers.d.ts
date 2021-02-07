import type { Message } from "discord.js";
import type { Constraints } from "../types/types-bot.js";
export declare function meetsConstraints(msg: Message, { allowChannel, allowGuild, allowUser, blockChannel, blockGuild, blockUser, requireChannel, requireGuild, requireUser, }: Constraints): boolean;
export declare function escapeRegExp(string: string): string;
export declare function enforceWellStructuredCommand(command: any): void;
export declare function enforceWellStructuredResponse(response: any): void;
export declare function enforceWellStructuredTrigger(trigger: any): void;
export declare function mixedIncludes(haystack: string | string[], needle: string): boolean;
