import { createContext, useState } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    _id: null,
    bio: null,
    createdVideos: [],
    email: null,
    followersCount: 0,
    followersList: [],
    followingCount: 0,
    followingList: [],
    likedVideos: [],
    likesCount: 0,
    name: null,
    profilePicture: null,
    savedVideos: [],
    username: null,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
