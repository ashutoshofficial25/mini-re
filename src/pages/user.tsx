import { useEffect } from 'react';
import { userApi } from 'src/api/user.api';
import { CONFIG } from 'src/config-global';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  useEffect(() => {
    const getUsers = async () => {
      const res = await userApi.getUsers();

      console.log(res);
    };

    getUsers();
  }, []);

  return (
    <>
      <title>{`Users - ${CONFIG.appName}`}</title>

      <UserView />
    </>
  );
}
