import AuthButton from './AuthButton';
import StartGameButton from './StartGameButton';

const Navbar = () => {
	return (
		<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
			<div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
				<StartGameButton />
				<AuthButton />
			</div>
		</nav>
	);
};

export default Navbar;
