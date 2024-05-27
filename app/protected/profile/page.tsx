import { redirect } from 'next/navigation';
import AccountForm from './AccountForm';
import { createClient } from '@/utils/supabase/server';

export default async function Account() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect('/login');
	}

	const { data: profile } = await supabase.from('profiles').select().eq('id', user.id).single();

	return <AccountForm profile={profile} email={user.email ?? ''} />;
}