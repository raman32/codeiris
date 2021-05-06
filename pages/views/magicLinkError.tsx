import React from 'react';
import Heading, { HeadingSize } from '../../lib/components/atomic/typography';
import Button from '../../lib/components/atomic/button';
import Router from 'next/router';
import Animation from 'lib/components/Shared/Animation';

import animationFailed from './../static/animations/failed.json';

function MagicLinkError() {
  return (
    <>
      <div className="w-screen flex justify-center items-center h-screen bg-gray-100">
        <div
          className="bg-white shadow-lg rounded-2xl flex justify-center items-center"
          style={{ width: '70vw', height: '70vh' }}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl mb-3">Invalid Magic Link!</div>

            <Animation
              data={animationFailed}
              height={150}
              width={300}
              loop={true}
            />

            <Button
              className="bg-primary mt-3"
              onClick={() => Router.push('/')}
            >
              Go Back to Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MagicLinkError;
