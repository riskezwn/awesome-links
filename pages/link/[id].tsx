import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import prisma from '../../lib/prisma';

const BookmarkLinkMutation = gql`
  mutation ($id: String!) {
    bookmarkLink(id: $id) {
      title
      url
      imageUrl
      category
      description
    }
  }
`;

function Link({ link }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [createBookmark] = useMutation(BookmarkLinkMutation);

  const bookmark = async () => {
    setIsLoading(true);
    toast.promise(createBookmark({ variables: { id: link.id } }), {
      loading: 'working on it',
      success: 'Saved successfully! 🎉',
      error: 'Something went wrong 😥 Please try again',
    });
    setIsLoading(false);
  };

  return (
    <div className="mx-auto my-10 max-w-5xl px-10">
      <div className="prose container mx-auto px-8">
        <Toaster />
        <button
          type="button"
          onClick={() => bookmark()}
          className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="w-6 h-6 animate-spin mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              Saving...
            </span>
          ) : (
            <span>Bookmark</span>
          )}
        </button>
        <h1 className="font-bold text-4xl pb-4">{link.title}</h1>
        <Image width={800} height={400} src={link.imageUrl} alt={link.title} className="shadow-lg rounded-lg w-full max-h-96 object-cover" />
        <p className="text-xl py-6">{link.description}</p>
        <a className="text-blue-500 text-xl hover:underline" href={`${link.url}`} target="_blank" rel="noreferrer">
          {link.url}
        </a>
      </div>
    </div>
  );
}

export default Link;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const link = await prisma.link.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      category: true,
      url: true,
      imageUrl: true,
      description: true,
    },
  });
  return {
    props: {
      link,
    },
  };
};
