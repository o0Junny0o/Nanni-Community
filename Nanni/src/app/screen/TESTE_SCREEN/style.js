import { StyleSheet } from 'react-native';

const colors = {
    background: '#FFFFFF',
    mediumSkyBlue: '#5d90d6',
    darkRoyalBlue: '#163690',
    midnightBlue: '#071934',
    vividBlue: '#1D5DB5',
    softLilac: '#B88CB4',
    helperText: '#ff0000',
    white: '#FFFFFF',
    black: '#000000'
};

const fonts = {
    monospaceExtrabold: 'monospace',
    robotoMonoBold: 'RobotoMono-Bold',
    roboto: 'Roboto-Regular',
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: colors.background,
    },
    view: {
        flex: 1,
    },
    safe: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.midnightBlue,
        textAlign: 'center',
        fontFamily: fonts.robotoMonoBold,
    },
    jogoSelectContainer: {
        width: '90%',
        marginBottom: 20,
    },
    jogoSelectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: colors.softLilac,
        borderRadius: 8,
        backgroundColor: colors.white,
    },
    jogoSelectText: {
        fontSize: 16,
        color: colors.midnightBlue,
        fontFamily: fonts.roboto,
    },
    jogoSelectList: {
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.softLilac,
        marginTop: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    jogoSelectItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: colors.softLilac,
    },
    anoContainer: {
        width: '90%',
        marginBottom: 20,
    },
     dataInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginBottom: 20,
    },
    dataItem: {
        alignItems: 'center',
    },
    dataTitle: {
        fontSize: 16,
        color: colors.midnightBlue,
        fontFamily: fonts.roboto,
    },
    dataValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.vividBlue,
        fontFamily: fonts.robotoMonoBold,
    },
    loadingText: {
        fontSize: 18,
        color: colors.midnightBlue,
        fontFamily: fonts.roboto,
    },
    chartContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    label: {
        width: 80,
        textAlign: 'center',
        fontSize: 12,
        color: colors.black,
        fontFamily: fonts.roboto,
    },
    textStyle: {
        color: colors.darkRoyalBlue,
        fontSize: 12,
        fontFamily: fonts.roboto,
    },
});
