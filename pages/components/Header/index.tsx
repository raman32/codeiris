import Heading, { HeadingSize } from '../atomic/typography';
import Router from 'next/router';
import { useQuery } from '@apollo/client';
import { GetMeDocument, GetMeQuery, GetMeQueryVariables } from '../../../gql';
import { getAccessToken, logout, skipper } from '../../../lib/accessToken';
import Spinner from '../atomic/spinner';
import { SpinnerSize } from '../../../lib/common/props/SpinnerProps';
import Avatar from '../atomic/avatar/Avatar';
import Dropdown from '../atomic/dropdown/Dropdown';

function Header() {
  const { data, loading } = useQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    { skip: skipper() },
  );

  const onTriggerLogout = () => {
    localStorage.clear();
    logout();
    Router.push('/');
  };

  return (
    <div>
      <div className="relative bg-white shadow-lg">
        <div className="px-10 px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="javascript:;" onClick={() => Router.push('/')}>
                <Heading
                  size={HeadingSize.H600}
                  className="text-primary font-bold"
                  style={{ fontSize: 25 }}
                >
                  Codeiris
                </Heading>
              </a>
            </div>
            <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
              {loading && (
                <Spinner color="text-primary" size={SpinnerSize.small} />
              )}
              {!data && !loading && (
                <a
                  href="javascript:;"
                  onClick={() => Router.push('/login')}
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </a>
              )}
              {data && (
                <Dropdown
                  menu={[
                    <a
                      href="javascript:;"
                      onClick={() => Router.push('/user/account')}
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-0"
                    >
                      Account settings
                    </a>,
                    <a
                      href="javascript:;"
                      onClick={() => Router.push('/user/profile')}
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-0"
                    >
                      Profile
                    </a>,
                    <a
                      href="javascript:;"
                      onClick={onTriggerLogout}
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-0"
                    >
                      Logout
                    </a>,
                  ]}
                >
                  <Avatar label={data.me.firstName} />
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;