import { Intent, Position } from 'lib/common';
import Toaster from 'lib/components/atomic/toast/Toaster';
import DefaultLayout from 'pages/layouts/defaultLayout';
import React, { useState } from 'react';
import {
  AddPostDocument,
  AddPostMutation,
  AddPostMutationVariables,
  PostType,
} from 'gql';
import { useMutation } from '@apollo/client';
import FormSaveLinkPost from '../../lib/components/SavePost/FormSaveLinkPost';
import FormSaveJobPost from '../../lib/components/SavePost/FormSaveJobPost';
import FormSaveAskPost from '../../lib/components/SavePost/FormSaveAskPost';
import clsx from 'clsx';
import Animation from 'lib/components/Shared/Animation';
import animationLink from './../static/animations/link.json';
import animationJob from './../static/animations/job.json';
import animationAsk from './../static/animations/ask.json';
import Container from 'lib/components/atomic/containers/Container';

const AppToaster = Toaster.create({ position: Position.BOTTOM });

const initialFields = {
  imageURL: '',
  title: '',
  url: '',
  body: '',
};

const getAnimation = (postType: string) => {
  switch (postType) {
    case 'link':
      return animationLink;
    case 'job':
      return animationJob;
    case 'ask':
      return animationAsk;
  }
};

function PostTabBox({ children, onClick, active = false }) {
  return (
    <div
      className={clsx(
        'py-2 px-4 rounded-md cursor-pointer transition-all capitalize mr-3 text-sm shadow-md font-semibold',
        active
          ? 'bg-primary-light text-white'
          : 'bg-white hover:bg-secondary-dark',
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function SavePost() {
  const [activeTab, setActiveTab] = useState(PostType.Link);

  const [AddPost, { ...addPostData }] = useMutation<
    AddPostMutation,
    AddPostMutationVariables
  >(AddPostDocument);

  const handleOnSave = (data, onSuccess = () => {}) => {
    // + inserting row
    AddPost({
      variables: {
        ...initialFields,
        ...data,
      },
    })
      .then(() => {
        AppToaster.show({
          message: 'Post Published Successfully!',
          intent: Intent.SUCCESS,
        });

        onSuccess();
      })
      .catch((error) => handleOnError(error.message));
  };

  const handleOnError = (message) => {
    AppToaster.show({
      message,
      intent: Intent.WARNING,
    });
  };

  return (
    <Container className="mt-10 mb-10">
      <div className="flex w-full">
        {Object.values(PostType)
          .reverse()
          .map((pt, index) => (
            <PostTabBox
              key={index}
              active={pt === activeTab}
              onClick={() => setActiveTab(pt)}
            >
              {pt}
            </PostTabBox>
          ))}
      </div>

      <div className="mt-8 mb-3">
        Your new <span className="capitalize">{activeTab}</span> post will be
        published instantly!
      </div>

      <div className="lg:flex items-start">
        <div className="sm:hidden lg:block">
          <Animation loop={true} data={getAnimation(activeTab)} />
        </div>

        <div
          className="flex-grow p-5 bg-white rounded-md shadow-lg"
          style={{ minHeight: '400px' }}
        >
          {getForm(activeTab, addPostData.loading, handleOnError, handleOnSave)}
        </div>
      </div>
    </Container>
  );
}

function getForm(type, loading, handleOnError, handleOnSave) {
  switch (type) {
    case PostType.Link:
      return (
        <FormSaveLinkPost
          initialFields={initialFields}
          loading={loading}
          processError={handleOnError}
          processSave={handleOnSave}
        />
      );
    case PostType.Job:
      return (
        <FormSaveJobPost
          initialFields={initialFields}
          loading={loading}
          processError={handleOnError}
          processSave={handleOnSave}
        />
      );
    case PostType.Ask:
      return (
        <FormSaveAskPost
          initialFields={initialFields}
          loading={loading}
          processError={handleOnError}
          processSave={handleOnSave}
        />
      );
  }
}

SavePost.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default SavePost;
