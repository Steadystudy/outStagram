'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import StyledButton from './ui/StyledButton';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function Signin({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map(({ id, name }) => (
        <div key={name} className="mt-40">
          <StyledButton
            size="xl"
            onClick={() => signIn(id, { callbackUrl })}
            text={`Sign in with ${name}`}
          />
        </div>
      ))}
    </>
  );
}
