import { StyleSheet } from 'react-native';

const colors = {
    background: '#FFFFFF',
    mediumSkyBlue: '#5d90d6',
    darkRoyalBlue: '#163690',
    midnightBlue: '#071934',
    vividBlue: '#1D5DB5',
    softLilac: '#B88CB4',
    helperText: '#ff0000',
    errorText: '#ff0000',
    white: '#FFFFFF',
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
        backgroundColor: colors.background,
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
        color: colors.softLilac,
        fontFamily: fonts.roboto,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.softLilac,
        paddingHorizontal: 10,
        marginBottom: 5,
        borderRadius: 5,
        width: '100%',
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 10,
        color: colors.softLilac,
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
        color: colors.white,
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
    touchable_opacity: {
        width: '100%',
    },
    fotoPerfilContainerCircular: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 1,
        borderColor: colors.softLilac,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        overflow: 'hidden',
    },
    fotoPerfilCircular: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    fotoPerfilPlaceholderCircular: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.softLilac,
    },
    textoFotoPerfilCircular: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 12,
        fontFamily: fonts.roboto,
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
        color: colors.errorText,
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'left',
        width: '100%',
        fontFamily: fonts.roboto,
    },
    calendarIcon: { 
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    botaoDesativado: {
        opacity: 0.5,
    },
});

export default styles;
