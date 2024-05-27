"use client";

import { Profile } from "@/types/common";
import { useState } from "react";

type SelectMultipleProps = {
    profiles: Profile[]
}

const SelectMultiple = (props: SelectMultipleProps) => {
    const { profiles } = props
    const [selectedProfiles, setSelectedProfiles] = useState<Profile[]>([])

    const handleToggleUser = (user: Profile) => {
        if (selectedProfiles.includes(user)) {
            setSelectedProfiles(selectedProfiles.filter((u) => u !== user))
        } else {
            setSelectedProfiles([...selectedProfiles, user])
        }
    }
    return (
        <div className="mt-2">
                    <ul className="space-y-2">
                      {profiles?.map((user) => (
                        <li key={user.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedProfiles.includes(user)}
                            onChange={() => handleToggleUser(user)}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                          <span className="ml-3 block text-sm font-medium text-gray-700">{user.username ?? user.id}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
    )
}

export default SelectMultiple;