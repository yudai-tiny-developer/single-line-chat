import(chrome.runtime.getURL('common.js')).then(common =>
    import(chrome.runtime.getURL('settings.js')).then(settings =>
        import(chrome.runtime.getURL('progress.js')).then(progress =>
            chrome.storage.local.get(common.storage, data =>
                main(common, settings, progress, data)
            )
        )
    )
);

function main(common, settings, progress, data) {
    const row_class = 'row';
    const cell_class = 'cell';
    const toggle_class = 'toggle';
    const label_class = 'switch';
    const input_class = 'rate';
    const progress_class = 'progress';
    const done_class = 'done';

    const container = document.querySelector('div#container');
    const reset_button = document.querySelector('input#reset');
    const progress_div = document.querySelector('div#reset_progress');

    {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, 'Hide author photo'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'hide_icon', data.hide_icon, common.default_hide_icon, common.value));
        container.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, 'Hide author name'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'hide_name', data.hide_name, common.default_hide_name, common.value));
        container.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, 'Hide chat badges'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'hide_badge', data.hide_badge, common.default_hide_badge, common.value));
        container.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, 'Change message color'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'chat_color', data.chat_color, common.default_chat_color, common.value));
        container.appendChild(row);
    } {
        const row = settings.createRow(row_class);
        row.appendChild(settings.createLabel(cell_class, 'Change message background color'));
        row.appendChild(settings.createToggle(cell_class, toggle_class, label_class, 'chat_bgcolor', data.chat_bgcolor, common.default_chat_bgcolor, common.value));
        container.appendChild(row);
    }

    settings.registerResetButton(reset_button, progress_div, progress_class, done_class, toggle_class, input_class, progress);
}