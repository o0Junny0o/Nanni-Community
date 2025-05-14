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

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 320,
        height: 120,
        marginBottom: 30,
        resizeMode: 'contain',
    },
    titulo: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 20,
        textAlign: 'center',
        color: colors.midnightBlue,
        fontFamily: fonts.monospaceExtrabold,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.softLilac,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        color: colors.black,
        fontFamily: fonts.roboto,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.softLilac,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5,
        width: '100%',
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 10,
        color: colors.black,
        fontFamily: fonts.roboto,
    },
    showPasswordText: { 
        color: colors.softLilac,
        fontWeight: 'bold',
        marginLeft: 10,
        fontFamily: fonts.robotoMonoBold,
    },
    botao: {
        width: '80%',
        backgroundColor: colors.midnightBlue,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,
    },
    botaoTexto: {
        color: colors.background,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: fonts.robotoMonoBold,
    },
    link: {
        color: colors.softLilac,
        marginTop: 15,
        textAlign: 'center',
        fontFamily: fonts.roboto,
    },
    forgotPasswordLink: {
        color: colors.softLilac,
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'right',
        width: '100%',
        fontFamily: fonts.roboto,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    helperText: {
        color: colors.helperText,
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'left',
        width: '100%',
        fontFamily: fonts.roboto,
    },
    errorText: {
        color: colors.helperText,
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'left',
        width: '100%',
        fontFamily: fonts.roboto,
    },
     touchable_opacity: {
        width: '100%',
        marginBottom: 5,
    },
});

export default styles;
