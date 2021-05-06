import DefaultLayout from '../layouts/defaultLayout';
import Heading from '../../lib/components/atomic/typography/Heading';
import { HeadingSize } from '../../lib/components/atomic/typography';
import TextField from '../../lib/components/atomic/textField';
import Button from '../../lib/components/atomic/button';
import { useMutation } from '@apollo/client';
import {
  MutationSendMagicLinkArgs,
  SendMagicLinkDocument,
  SendMagicLinkMutation,
} from '../../gql';
import { useEffect, useState } from 'react';
import MagicLinkSendingSuccess from '../../lib/components/MagicLink/MagicLinkSendingSuccess';
import io from 'socket.io-client';
import Container from 'lib/components/atomic/containers/Container';
import Animation from 'lib/components/Shared/Animation';

import animationWizard from './../static/animations/wizard.json';

function Login() {
  const [email, setEmail] = useState('');
  const [listener, setListener] = useState<string | null>(null);
  const [SendMagicLink, { loading }] = useMutation<
    SendMagicLinkMutation,
    MutationSendMagicLinkArgs
  >(SendMagicLinkDocument);

  return (
    <Container className="mt-20 relative w-full">
      <div className="text-center text-2xl font-semibold mb-5">
        Account Login / Signup
      </div>

      {listener ? (
        <MagicLinkSendingSuccess listener={listener} />
      ) : (
        <>
          <div className="bg-white p-5 lg:w-1/2 m-auto rounded-lg shadow-lg pb-16 text-center">
            <div className="text-md text-gray-600">
              Enter your email address below and Blacky the wizard will send the
              magic link for direct login/signup to your inbox!
            </div>

            <TextField
              label="Email"
              placeholder="you@somewhere.domain"
              className="2xl:w-80 text-left md:w-2/3 m-auto mt-5 mb-8"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Button
              loading={loading}
              disabled={loading}
              onClick={async () => {
                SendMagicLink({ variables: { email: email } }).then((value) => {
                  setListener(value.data.sendMagicLink.listener);
                });
              }}
              className="m-auto bg-success"
              colorClass="text-black"
            >
              Send Magic Link
            </Button>
          </div>

          <div
            className="absolute left-0 bottom-0 text-center w-full flex justify-center"
            style={{ marginBottom: '-2em' }}
          >
            <div className="bg-white rounded-full w-20 h-20 flex items-center shadow-lg">
              <Animation
                data={animationWizard}
                height={80}
                width={80}
                loop={true}
              />
            </div>
          </div>
        </>
      )}

      {/* <div
        className="bg-white shadow-lg rounded-2xl"
        style={{ width: '70vw', height: '70vh' }}
      >
        <div className="grid grid-cols-2 h-full">
          <div className="flex justify-center items-center w-full">
            <div>
              {listener && <MagicLinkSendingSuccess listener={listener} />}
              {!listener && (
                <div>
                  <div className="flex justify-center mb-5">
                    <Heading
                      size={HeadingSize.H600}
                      style={{ fontSize: 60 }}
                      className="text-heading-light"
                    >
                      Sign In
                    </Heading>
                  </div>
                  <div>
                    <TextField
                      label="Email"
                      className="2xl:w-80"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <div>
                    <Button
                      loading={loading}
                      disabled={loading}
                      onClick={async () => {
                        SendMagicLink({ variables: { email: email } }).then(
                          (value) => {
                            setListener(value.data.sendMagicLink.listener);
                          },
                        );
                      }}
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-primary"></div>
        </div>
      </div> */}
    </Container>
  );
}

Login.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Login;
