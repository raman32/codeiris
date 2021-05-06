import DefaultLayout from '../layouts/defaultLayout';
import React, { useState } from 'react';
import ProfileSettings from '../../lib/components/Account/ProfileSettings';
import Container from 'lib/components/atomic/containers/Container';

function Account() {
  return (
    <Container className="mt-10 mb-10">
      <div className="text-3xl mb-5 text-blueGray-800">Settings</div>

      <ProfileSettings />
    </Container>
  );
}

Account.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Account;
