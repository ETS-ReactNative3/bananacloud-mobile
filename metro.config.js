module.exports = (() => {
    return {
        transformer: {
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: false,
                },
            }),
        },
        resolver: {
            sourceExts: ['cjs', 'js', 'ts', 'jsx', 'tsx', 'json'],
        },
    }
})()
