import { GameTypes,GameModes } from '@/supabase/types/enums';
import { z } from 'zod';

const GameTypeSchemaType = z.enum([GameTypes.COMPETITION, GameTypes.PRACTICE]);
const GameModeSchemaType = z.enum([GameModes['1_TO_20'], GameModes['27_DOWN'], GameModes.AROUND_THE_CLOCK, GameModes.X01]);

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
	participant_id: z.string().min(1),
	game_id: z.string().min(1),
});

/**
 * Schema for validating login data.
 *
 * The password requirement is set to a minimum of 6 characters
 * and should be revised to meet specific security requirements.
 */
export const LoginSchema = z.object({
	email: z.string().email(),
	// TODO: rethink the password requirements here!
	password: z.string().min(6),
});

/**
 * Schema for validating registration data.
 *
 * The password requirement is set to a minimum of 6 characters
 * and should be revised to meet specific security requirements.
 *
 * Also, the registration data should include a password confirmation field.
 *
 * **NOTE: registration currently grabs the `origin` from the header, which is _not_ part of the validation schema**.
 * So basically we can use the `LoginSchema` for registration as well,
 * but there might be a password confirmation field later
 * or other fields that are not part of the login schema, like the origin.
 */
export const RegisterSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

/**
 * Schema for validating the account update data.
 * Most fields are nullable because they are optional and `null` is a valid value.
 *
 * `updated_at` is required because it should be set to the current date and time.
 */
export const AccountUpdateSchema = z.object({
	id: z.string().min(1).optional(),
	full_name: z.string().min(1).nullable(),
	username: z.string().min(1).nullable(),
	avatar_url: z.string().url().nullable(),
	updated_at: z.date(),
});

/**
 * Schema for validating the leg data.
 * The `leg_number` should be at least 1.
 * The `game_id` is the ID of the game to which the leg belongs.
 */
export const LegSchema = z.object({
	game_id: z.string().min(1),
	leg_number: z.number().min(1),
});

/**
 * Schema for validating the round data.
 * The `round_number` should be at least 1.
 * The `leg_id` is the ID of the leg to which the round belongs.
 */
export const RoundSchema = z.object({
	game_id: z.string().min(1),
	user_id: z.string().min(1),
	leg_id: z.string().min(1),
	round_number: z.number().min(1),
});

/**
 * Schema for validating the throw data.
 *
 * - `value` is the result of the throw, which is the sector multiplied by the multiplier.
 * - `sector` is the number on the dartboard, ranging from 1 to 20 and 25 for the bullseye.
 * - `multiplier` is the multiplier of the sector, which can be 1, 2, or 3.
 * - `round` is the current round of the game.
 * - `user_id` is the ID of the user who threw the dart.
 * - `game_id` is the ID of the game in which the throw was made.
 */
export const ThrowSchema = z.object({
	value: z.number(),
	sector: z.number().min(1).max(25),
	multiplier: z.number().min(1).max(3),
	round: z.number().min(1),
	user_id: z.string().min(1),
	game_id: z.string().min(1),
	leg_id: z.string().min(1),
	round_id: z.string().min(1),
});