import { createClient } from '@/supabase/client/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect('/login');
	}

	return (
		<div className="flex-1 w-full flex flex-col gap-20 items-center">
			<div className="w-full">
				<div className="py-6 font-bold bg-purple-950 text-center">
					This is a protected page that you can only see as an authenticated user
				</div>
				<Link href="/protected/profile">
					<p className="block text-center py-4 bg-purple-950 text-white font-bold">
						View your profile
					</p>
				</Link>
			</div>
		</div>
	);
}
