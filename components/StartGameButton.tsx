"use client"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useRouter } from 'next/navigation';

const StartGameButton = () => {
  const rounter = useRouter()
  const handleStartGame = (type: 'competitive' | 'practice') => {
    rounter.push(`/game?type=${type}`)
  };

  return (
    <div className="relative inline-block text-left">
      <Menu>
        <MenuButton className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Start Game
        </MenuButton>
        <MenuItems className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => handleStartGame('competitive')}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } group flex items-center px-4 py-2 text-sm w-full`}
                >
                  Competitive
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => handleStartGame('practice')}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } group flex items-center px-4 py-2 text-sm w-full`}
                >
                  Practice
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default StartGameButton;
