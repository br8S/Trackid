FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginImagePreview,
    FilePondPluginImageResize
);

FilePond.setOptions({
    stylePanelAspectRatio: 240/240,
    imageResizeTargetWidth: 240,
    imageResizeTargetHeight: 240,
})

FilePond.parse(document.body);

