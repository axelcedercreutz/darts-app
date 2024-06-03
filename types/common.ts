import { Tables, Enums } from '@/supabase/types/db';


export type Profile = Tables<'profiles'>;

export type Throw = Tables<'throws'>;

export type GameParticipantWithProfile = Tables<'game_participants'> & { profiles: Profile };

export type GameType = Enums<'game_types'>;

export type GameMode = Enums<'game_modes'>;