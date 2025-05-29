export const storage = [
    'hide_icon',
    'hide_name',
    'hide_badge',
    'hide_xp',
    'chat_color',
    'chat_bgcolor',
];

export const default_hide_icon = false;
export const default_hide_name = true;
export const default_hide_badge = false;
export const default_hide_xp = false;
export const default_chat_color = true;
export const default_chat_bgcolor = false;

export function value(value, defaultValue) {
    return value === undefined ? defaultValue : value;
}

export function isLiveChat(url) {
    return url.startsWith('https://www.youtube.com/live_chat?')
        || url.startsWith('https://www.youtube.com/live_chat_replay?')
        ;
}
