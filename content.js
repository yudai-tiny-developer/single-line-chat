import(chrome.runtime.getURL('common.js')).then(common => {
    if (common.isLiveChat(location.href)) {
        main(common);
    }
});

function main(common) {
    function loadSettings() {
        chrome.storage.local.get(common.storage, data => {
            document.documentElement.style.setProperty('--single-line-chat-icon', common.value(data.hide_icon, common.default_hide_icon) ? 'none' : 'block');
            document.documentElement.style.setProperty('--single-line-chat-name', common.value(data.hide_name, common.default_hide_name) ? 'none' : 'block');
            document.documentElement.style.setProperty('--single-line-chat-badge', common.value(data.hide_badge, common.default_hide_badge) ? 'none' : 'block');
            document.documentElement.style.setProperty('--single-line-chat-color', common.value(data.chat_color, common.default_chat_color) ? 'var(--yt-spec-text-secondary)' : 'var(--yt-live-chat-primary-text-color,var(--yt-spec-text-primary))');
            document.documentElement.style.setProperty('--single-line-chat-color-sponsor', common.value(data.chat_color, common.default_chat_color) ? 'var(--yt-live-chat-sponsor-color)' : 'var(--yt-live-chat-primary-text-color,var(--yt-spec-text-primary))');
            document.documentElement.style.setProperty('--single-line-chat-color-moderator', common.value(data.chat_color, common.default_chat_color) ? 'var(--yt-live-chat-moderator-color)' : 'var(--yt-live-chat-primary-text-color,var(--yt-spec-text-primary))');
            document.documentElement.style.setProperty('--single-line-chat-bgcolor', common.value(data.chat_bgcolor, common.default_chat_bgcolor) ? 'var(--yt-spec-badge-chip-background)' : 'unset');
        });
    }

    chrome.storage.onChanged.addListener(() => {
        loadSettings();
    });

    loadSettings();
}