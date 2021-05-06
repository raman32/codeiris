import React, { useEffect } from 'react';
import Spinner from '../../lib/components/atomic/spinner';
import { Intent } from '../../lib/common';
import Heading, { HeadingSize } from '../../lib/components/atomic/typography';
import { NextPageContext } from 'next';
import { Auth } from 'src/models/auth.model';
import {
  setAccessToken,
  setCustomExpiry,
  setRefreshToken,
} from '../../lib/accessToken';
import moment from 'moment';
import Router from 'next/router';
import Animation from 'lib/components/Shared/Animation';

import animationWand from './../static/animations/wand.json';

interface Props {
  data: {
    auth: Auth;
  };
}

function MagicLinkValidating({ data }: Props) {
  useEffect(() => {
    if (data) {
      setAccessToken(data.auth.accessToken);
      setRefreshToken(data.auth.refreshToken);
      setCustomExpiry(moment().add(30, 'minutes').toDate());
      setTimeout(() => {
        Router.push('/');
      }, 3000);
    }
  }, []);

  return (
    <>
      <div className="w-screen flex justify-center items-center h-screen bg-gray-100">
        <div
          className="bg-white shadow rounded-2xl flex justify-center items-center"
          style={{ width: '70vw', height: '70vh' }}
        >
          <div className="flex flex-col justify-center items-center">
            <Animation
              data={animationWand}
              height={250}
              width={300}
              loop={true}
            />

            <Heading size={HeadingSize.H600} className="mt-3">
              Validating your magic link...
            </Heading>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { invalid, ...rest } = context.query;
  if (invalid) {
    return {
      redirect: {
        destination: '/auth/validationError',
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: rest,
    },
  };
}

export default MagicLinkValidating;
