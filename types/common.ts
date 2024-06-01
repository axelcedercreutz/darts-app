import { Tables } from './supabase';

console.log('testing')

export type Profile = Tables<'profiles'>;

export type Throw = Tables<'throws'>;

export type GameParticipantWithProfile = Tables<'game_partdddicipants'> & { profiles: Profile };
