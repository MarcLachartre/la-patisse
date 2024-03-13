'use server';

import { getServerSession } from 'next-auth';

const getSession = async () => {
    const session = await getServerSession();
    console.log(session);
    return session;
};

export { getSession };
