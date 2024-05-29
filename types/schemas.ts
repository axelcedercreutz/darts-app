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
