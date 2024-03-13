'use client';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import Link from 'next/link';
import React from 'react';

const ContactIcons = ({ color }: { color: string }) => {
    return (
        <div className="icons-container">
            <Link
                href="http://m.me/momrac"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FacebookRoundedIcon
                    fontSize="large"
                    sx={{ color: `var(--${color})` }}
                />
            </Link>
            <Link href="mailto:marc.lachartre@gmail.com">
                <EmailRoundedIcon
                    fontSize="large"
                    sx={{ color: `var(--${color})` }}
                />
            </Link>
        </div>
    );
};

export default ContactIcons;
