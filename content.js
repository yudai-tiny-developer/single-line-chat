import(chrome.runtime.getURL('common.js')).then(common => {
    if (common.isLiveChat(location.href)) {
        main(common);
    }
});

function main(common) {
    function loadSettings() {
        chrome.storage.local.get(common.storage, data => {
            document.documentElement.style.setProperty('--single-line-chat-text-overflow', common.value(data.single_line, common.default_single_line) ? 'ellipsis' : 'unset');
            document.documentElement.style.setProperty('--single-line-chat-overflow', common.value(data.single_line, common.default_single_line) ? 'hidden' : 'unset');
            document.documentElement.style.setProperty('--single-line-chat-white-space', common.value(data.single_line, common.default_single_line) ? 'nowrap' : 'unset');

            document.documentElement.style.setProperty('--single-line-chat-icon', common.value(data.hide_icon, common.default_hide_icon) ? 'none' : 'unset');
            document.documentElement.style.setProperty('--single-line-chat-name', common.value(data.hide_name, common.default_hide_name) ? 'none' : 'unset');
            document.documentElement.style.setProperty('--single-line-chat-badge', common.value(data.hide_badge, common.default_hide_badge) ? 'none' : 'unset');
            document.documentElement.style.setProperty('--single-line-chat-xp', common.value(data.hide_xp, common.default_hide_xp) ? 'none' : 'flex');

            if (common.value(data.chat_color, common.default_chat_color)) {
                document.documentElement.style.setProperty('--single-line-chat-color', 'var(--yt-live-chat-secondary-text-color)');
                document.documentElement.style.setProperty('--single-line-chat-color-sponsor', 'var(--yt-live-chat-sponsor-color)');
                document.documentElement.style.setProperty('--single-line-chat-color-moderator', 'var(--yt-live-chat-moderator-color)');
                document.documentElement.style.setProperty('--single-line-chat-color-owner', 'var(--yt-live-chat-owner-color)');
            } else {
                document.documentElement.style.setProperty('--single-line-chat-color', 'unset');
                document.documentElement.style.setProperty('--single-line-chat-color-sponsor', 'unset');
                document.documentElement.style.setProperty('--single-line-chat-color-moderator', 'unset');
                document.documentElement.style.setProperty('--single-line-chat-color-owner', 'unset');
            }

            if (common.value(data.chat_bgcolor, common.default_chat_bgcolor)) {
                document.documentElement.style.setProperty('--single-line-chat-bgcolor', 'unset');
                document.documentElement.style.setProperty('--single-line-chat-bgcolor-sponsor', 'rgba(0, 255, 0, 0.1)');
                document.documentElement.style.setProperty('--single-line-chat-bgcolor-moderator', 'rgba(0, 0, 255, 0.15)');
                document.documentElement.style.setProperty('--single-line-chat-bgcolor-owner', 'rgba(255, 255, 0, 0.1)');
            } else {
                document.documentElement.style.setProperty('--single-line-chat-bgcolor', 'unset');
                document.documentElement.style.setProperty('--single-line-chat-bgcolor-sponsor', 'unset');
                document.documentElement.style.setProperty('--single-line-chat-bgcolor-moderator', 'unset');
                document.documentElement.style.setProperty('--single-line-chat-bgcolor-owner', 'unset');
            }

            if (common.value(data.use_displayname, common.default_use_displayname)) {
                for (const n of items.querySelectorAll('span#author-name')) {
                    replaceIdToName(n);
                }

                observer = observer ?? new MutationObserver((mutations, observer) => {
                    for (const n of items.querySelectorAll('span#author-name')) {
                        replaceIdToName(n);
                    }
                })
                observer.observe(items, { childList: true });
            } else {
                observer?.disconnect();

                for (const n of items.querySelectorAll('span#author-name')) {
                    revertNameToId(n);
                }
            }
        });
    }

    function replaceIdToName(author) {
        const id = author.textContent;
        if (id.startsWith('@')) {
            const attr_id = author.getAttribute('author-id');
            if (attr_id) {
                const name = sessionStorage.getItem(attr_id);
                if (name) {
                    author.firstChild.textContent = name;
                }
            } else {
                author.setAttribute('author-id', id);

                const name = sessionStorage.getItem(id);
                if (name) {
                    author.firstChild.textContent = name;
                } else {
                    chrome.runtime.sendMessage({ id }).then(response => {
                        sessionStorage.setItem(id, response.name);
                        author.firstChild.textContent = response.name;
                    });
                }
            }
        }
    }

    function revertNameToId(author) {
        const id = author.getAttribute('author-id');
        if (id) {
            author.firstChild.textContent = id;
        }
    }

    const items = document.body.querySelector('div#items');

    let observer;

    chrome.storage.onChanged.addListener(loadSettings);
    loadSettings();
}