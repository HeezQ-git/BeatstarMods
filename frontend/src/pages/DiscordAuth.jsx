import React, { useEffect, useState } from 'react';

export const DiscordAuth = () => {
    const [loadedUser, setLoadedUser] = useState();

    useEffect(() => {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

        if (!accessToken) {
            return (document.getElementById('login').style.display = 'block');
        }

        fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${tokenType} ${accessToken}`,
            },
        })
            .then((result) => result.json())
            .then((response) => {
                const { username, discriminator } = response;
                setLoadedUser({ username, discriminator });
                console.log(response);
            })
            .catch(console.error);
    }, []);
    return !loadedUser ? (
        <div>Authorising, please wait...</div>
    ) : (
        <div>
            Welcome, {loadedUser.username}#{loadedUser.discriminator}
        </div>
    );
};
