'use client';

import React from 'react';

interface Data {
	color: string;
}

const ContactIcons = (props: Data) => {
	return (
		<div className="icons-container">
			<a
				href="http://m.me/momrac"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					className="icons"
					src={`/icons/facebook-${props.color}.png`}
					alt="facebook"
				/>
			</a>
			<a href="mailto:marc.lachartre@gmail.com">
				<img
					className="icons"
					src={`/icons/mail-${props.color}.png`}
					alt="facebook"
				/>
			</a>
		</div>
	);
};

export default ContactIcons;
