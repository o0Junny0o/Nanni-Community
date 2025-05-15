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
        paddingVertical: 20,
        backgroundColor: colors.background,
    },
    view: {
        flex: 1,
        alignItems: 'center',
    },
    safe: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        width: '90%',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        color: '#071934',
        fontFamily: fonts.robotoMonoBold,
        // underline:
        borderBottomWidth: 2,
        borderBottomColor: colors.midnightBlue,
        paddingBottom: 5,
    },
    jogoDisplayContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        padding: 10,
        marginBottom: 20,
        width: '90%',
        borderWidth: 1,
        borderColor: colors.softLilac,
        borderRadius: 8,
        backgroundColor: colors.white,
    },
    jogoDisplayTextTitle: {
        textAlign: 'right',
        width: "40%",
        fontSize: 16,
        color: colors.midnightBlue,
        fontFamily: fonts.roboto,
        fontWeight: 'bold',
        marginRight: 5,
    },
    jogoDisplayPicker: {

    },
    jogoDisplayText: {
        fontSize: 16,
        color: colors.vividBlue,
        fontFamily: fonts.roboto,
    },
    anoContainer: {
        width: '90%',
        marginBottom: 20,
        alignItems: 'center',
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: colors.softLilac,
        borderRadius: 8,
        backgroundColor: colors.white,
        width: '100%',
    },
    dropdownText: {
        fontSize: 16,
        color: colors.midnightBlue,
        fontFamily: fonts.roboto,
    },
    dropdownList: {
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
        width: '100%',
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: colors.softLilac,
    },
    dataInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginBottom: 20,
        paddingVertical: 10,
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.softLilac,
    },
    dataItem: {
        alignItems: 'center',
    },
    dataTitle: {
        fontSize: 16,
        color: colors.midnightBlue,
        fontFamily: fonts.roboto,
        marginBottom: 4,
    },
    dataValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.vividBlue,
        fontFamily: fonts.robotoMonoBold,
    },
    loadingText: {
        fontSize: 16,
        color: colors.midnightBlue,
        fontFamily: fonts.roboto,
        marginTop: 20,
        textAlign: 'center',
    },
    chartContainer: {
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
    },
    label: {
        width: 80,
        textAlign: 'center',
        fontSize: 10,
        color: colors.black,
        fontFamily: fonts.roboto,
    },
    textStyle: {
        color: colors.darkRoyalBlue,
        fontSize: 10,
        fontFamily: fonts.roboto,
    },
});