import(chrome.runtime.getURL('common.js')).then(common => {
    if (common.isLiveChat(location.href)) {
        main(common);
    }
});

function main(common) {
    function loadSettings() {
        chrome.storage.local.get(common.storage, data => {
            document.documentElement.style.setProperty('--single-line-chat-icon', common.value(data.hide_icon, common.default_hide_icon) ? 'none' : 'unset');
            document.documentElement.style.setProperty('--single-line-chat-name', common.value(data.hide_name, common.default_hide_name) ? 'none' : 'unset');
            document.documentElement.style.setProperty('--single-line-chat-badge', common.value(data.hide_badge, common.default_hide_badge) ? 'none' : 'unset');
            document.documentElement.style.setProperty('--single-line-chat-color', common.value(data.chat_color, common.default_chat_color) ? 'var(--yt-live-chat-secondary-text-color)' : 'unset');
            document.documentElement.style.setProperty('--single-line-chat-color-sponsor', common.value(data.chat_color, common.default_chat_color) ? 'var(--yt-live-chat-sponsor-color)' : 'unset');
            document.documentElement.style.setProperty('--single-line-chat-color-moderator', common.value(data.chat_color, common.default_chat_color) ? 'var(--yt-live-chat-moderator-color)' : 'unset');
            document.documentElement.style.setProperty('--single-line-chat-color-owner', common.value(data.chat_color, common.default_chat_color) ? 'var(--yt-live-chat-author-chip-owner-text-color)' : 'unset');
            document.documentElement.style.setProperty('--single-line-chat-bgcolor', common.value(data.chat_bgcolor, common.default_chat_bgcolor) ? 'var(--yt-live-chat-secondary-background-color)' : 'unset');
            document.documentElement.style.setProperty('--single-line-chat-bgcolor-owner', common.value(data.chat_bgcolor, common.default_chat_bgcolor) ? 'var(--yt-live-chat-owner-color)' : 'unset');
        });
    }

    chrome.storage.onChanged.addListener(() => {
        loadSettings();
    });

    loadSettings();
}