chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    fetch(`https://www.youtube.com/${message.id}`).then(async res => {
        const html = await res.text();
        const match = html.match(/<title>(.*?) - YouTube<\/title>/);
        const name = match ? match[1] : message.id;
        sendResponse({ name });
    });
    return true;
});