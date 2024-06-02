import { createClient } from '@/supabase/client/server';

const Leaderboard = async () => {
	const supabase = createClient();
	const { data: leaderboard } = await supabase.from('games').select();
	return (
		<>
			<h2>Current leaderboard</h2>
			<pre>{JSON.stringify(leaderboard, null, 2)}</pre>
		</>
	);
};

export default Leaderboard;
