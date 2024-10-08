'use client';
import { useState } from 'react';
import { createClient } from '@/supabase/client/client';
import { Profile } from '@/types/common';
import Avatar from './Avatar';
import { AccountUpdateSchema } from '@/types/schemas';
import { SubmitButton } from '@/components/SubmitButton';

export default function AccountForm({
	profile,
	email,
}: {
	profile: Profile | null;
	email: string;
}) {
	const supabase = createClient();
	const [loading, setLoading] = useState(false);
	const [fullname, setFullname] = useState<string | null>(profile?.full_name || null);
	const [username, setUsername] = useState<string | null>(profile?.username || null);
	const [avatar_url, setAvatarUrl] = useState<string | null>(profile?.avatar_url || null);

	async function updateProfile({
		username,
		avatar_url,
	}: {
		username: string | null;
		fullname: string | null;
		avatar_url: string | null;
	}) {
		try {
			if (!profile) throw new Error('Profile not found');
			setLoading(true);

			const upsertData = {
				id: profile?.id,
				full_name: fullname,
				username,
				avatar_url,
				updated_at: new Date(),
			};
			const updateSchema = AccountUpdateSchema.safeParse(upsertData);
			if (!updateSchema.success) {
				throw new Error('Invalid update data');
			}

			await supabase.from('profiles').upsert({
				...upsertData,
				updated_at: upsertData.updated_at.toISOString(),
			});
		} catch (error) {
			alert('Error updating the data!');
		} finally {
			setLoading(false);
		}
	}

	return (
		<form>
			<Avatar
				uid={profile?.id ?? null}
				url={avatar_url}
				size={150}
				onUpload={(url) => {
					setAvatarUrl(url);
					updateProfile({ fullname, username, avatar_url: url });
				}}
			/>
			<div>
				<label htmlFor="email">Email</label>
				<input id="email" type="text" value={email} disabled />
			</div>
			<div>
				<label htmlFor="fullName">Full Name</label>
				<input
					id="fullName"
					type="text"
					value={fullname || ''}
					onChange={(e) => setFullname(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="username">Username</label>
				<input
					id="username"
					type="text"
					value={username || ''}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
				<SubmitButton formAction={() => updateProfile({ fullname, username, avatar_url })}
					className="bg-green-700 rounded-md px-4 py-2 text-foreground my-2"
					pendingText="Signing In...">
						Update Profile
				</SubmitButton>
		</form>
	);
}
