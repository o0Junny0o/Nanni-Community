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
    view: {
        flex: 1,
        backgroundColor: colors.background,
    },
    safe: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30,
        color: colors.midnightBlue,
        textAlign: 'center',
        fontFamily: fonts.robotoMonoBold,
    },
    dropdownContainer: {
        width: '90%',
        alignItems: 'center',
        marginBottom: 20,
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
        maxHeight: 200,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: colors.softLilac,
    },
});