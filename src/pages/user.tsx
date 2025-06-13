import { useEffect } from 'react';
import { userApi } from 'src/api/user.api';
import { CONFIG } from 'src/config-global';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Users - ${CONFIG.appName}`}</title>

      <UserView />
    </>
  );
}
