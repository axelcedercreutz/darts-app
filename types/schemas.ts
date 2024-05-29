import { z } from 'zod';

const GameTypeSchemaType = z.union([z.literal('competitive'), z.literal('practice')]);
export type GameType = z.infer<typeof GameModeSchemaType>;
const GameModeSchemaType = z.union([z.literal('501'), z.literal('around_the_clock')]);
export type GameModes = z.infer<typeof GameModeSchemaType>;

/**
 * Represents the schema for validating the
 * start game request properties.
 */
export const StartGameSchema = z.object({
	type: GameTypeSchemaType,
	game_mode: GameModeSchemaType,
});

/**
 * Represents the schema for a single participant in a game.
 * To validate a list of participants, use `z.array(ParticipantSchema)`.
 */
export const ParticipantSchema = z.object({
	profile_id: z.string().min(1),
	game_id: z.string().min(1),
});
