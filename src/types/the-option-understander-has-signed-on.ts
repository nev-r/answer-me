import type { GuildChannel, GuildMember, Role, User } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";

export type StrictCommand = Command<StrictOption>;
export type VagueCommand = Command<VagueOption>;

type Command<O> = Readonly<{
	name: string;
	description: string;
	options?: readonly O[];
	defaultPermission?: boolean;
}>;

type Choice<T extends string | number> = Readonly<{
	name: string;
	value: T;
}>;

type StrictOption = Readonly<
	{
		name: string;
		description: string;
		required?: boolean;
	} & (
		| {
				type:
					| "SUB_COMMAND"
					| ApplicationCommandOptionTypes.SUB_COMMAND
					| "SUB_COMMAND_GROUP"
					| ApplicationCommandOptionTypes.SUB_COMMAND_GROUP;
				options?: readonly StrictOption[];
				choices?: undefined;
		  }
		| {
				type: "STRING" | ApplicationCommandOptionTypes.STRING;
				options?: undefined;
				choices?: readonly Choice<string>[];
		  }
		| {
				type: "INTEGER" | ApplicationCommandOptionTypes.INTEGER;
				options?: undefined;
				choices?: readonly Choice<number>[];
		  }
		| {
				type:
					| "BOOLEAN"
					| ApplicationCommandOptionTypes.BOOLEAN
					| "USER"
					| ApplicationCommandOptionTypes.USER
					| "ROLE"
					| ApplicationCommandOptionTypes.ROLE
					| "CHANNEL"
					| ApplicationCommandOptionTypes.CHANNEL
					| ApplicationCommandOptionTypes.MENTIONABLE;
				options?: undefined;
				choices?: undefined;
		  }
	)
>;

type VagueOption = Readonly<
	{
		name: string;
		description: string;
		required?: boolean;
	} & {
		type:
			| "SUB_COMMAND"
			| ApplicationCommandOptionTypes.SUB_COMMAND
			| "SUB_COMMAND_GROUP"
			| ApplicationCommandOptionTypes.SUB_COMMAND_GROUP
			| "STRING"
			| ApplicationCommandOptionTypes.STRING
			| "INTEGER"
			| ApplicationCommandOptionTypes.INTEGER
			| "BOOLEAN"
			| ApplicationCommandOptionTypes.BOOLEAN
			| "USER"
			| ApplicationCommandOptionTypes.USER
			| "ROLE"
			| ApplicationCommandOptionTypes.ROLE
			| "CHANNEL"
			| ApplicationCommandOptionTypes.CHANNEL
			| "MENTIONABLE"
			| ApplicationCommandOptionTypes.MENTIONABLE;
		choices?: readonly StrictOption[] | readonly Choice<string | number>[];
	}
>;

type TypeByIdentifier<Identifier, Option, Choices> = Identifier extends "SUB_COMMAND"
	? SubOptions<Option>
	: Identifier extends "SUB_COMMAND_GROUP"
	? SubOptions<Option>
	: Identifier extends "STRING"
	? Choices extends readonly { value: string }[]
		? Choices[number]["value"]
		: string
	: Identifier extends "INTEGER"
	? Choices extends readonly { value: number }[]
		? Choices[number]["value"]
		: number
	: Identifier extends "BOOLEAN"
	? boolean
	: Identifier extends "USER"
	? User | GuildMember
	: Identifier extends "CHANNEL"
	? GuildChannel
	: Identifier extends "ROLE"
	? Role
	: never;

type OptionAsDict<Option> = Option extends {
	name: infer Name;
	type: infer Identifier;
	required?: infer Required;
	options?: infer Option;
	choices?: infer Choices;
}
	? Name extends string
		? Required extends true
			? { [k in Name]: TypeByIdentifier<Identifier, Option, Choices> }
			: Identifier extends "SUB_COMMAND" | "SUB_COMMAND_GROUP" | "BOOLEAN"
			? { [k in Name]: TypeByIdentifier<Identifier, Option, Choices> }
			: { [k in Name]?: TypeByIdentifier<Identifier, Option, Choices> }
		: never
	: never;

type SubOptions<O> = O extends readonly any[]
	? ObjectIntersectionFromObjectUnion<OptionAsDict<O[number]>>
	: {};

export type CommandOptions<C extends StrictCommand> = C extends StrictCommand & {
	options: readonly StrictOption[];
}
	? ObjectFromObjectIntersection<
			ObjectIntersectionFromObjectUnion<OptionAsDict<C["options"][number]>>
	  >
	: unknown;

type ObjectIntersectionFromObjectUnion<U> = (U extends any ? (k: U) => void : never) extends (
	k: infer I
) => void
	? I
	: never;

type ObjectFromObjectIntersection<T> = T extends unknown
	? { [K in keyof T]: T[K] extends {} ? ObjectFromObjectIntersection<T[K]> : T[K] }
	: T;
// type ObjectFromObjectIntersection<T> = T extends unknown
// 	? { [K in keyof T]: ObjectFromObjectIntersection<T[K]> }
// 	: T;

// type Cat<A extends string,B extends string> = `${A} ${B}`;

//  type sc<Options> =Options extends {
// 	name: infer Name;
// 	type: infer Identifier;
// 	required?: infer Required;
// 	options?: infer Option;
// 	choices?: infer Choices;
// } []?:'';

const x = {
	name: "test",
	description: "pbbbbbbt",
	options: [
		{ name: "abc", description: "ewjrhbgwjhrg", type: "SUB_COMMAND" },
		{
			name: "def",
			description: "fkjerngwikrtjnh",
			type: "SUB_COMMAND_GROUP",
			options: [
				{ name: "subsub1", description: "34624563456", type: "SUB_COMMAND" },
				{ name: "subsub2", description: "ije4nhfw45gjh", type: "USER" },
			],
		},
	],
} as const;
type X = typeof x;
type Y = CommandOptions<X>;
