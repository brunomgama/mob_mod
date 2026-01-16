import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    scrollContent: {
        flexGrow: 1,
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 48,
    },
    card: {
        width: '100%',
        maxWidth: 440,
        padding: 12,
    },
    heroContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    diamondOuter: {
        width: 256,
        height: 256,
        borderRadius: 60,
        overflow: 'hidden',
        backgroundColor: '#5EEAD4',
        transform: [{ rotate: '45deg' }],
    },
    diamondInner: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '-45deg' }],
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    codeInput: {
        textAlign: 'center',
        fontSize: 24,
        letterSpacing: 8,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    welcomeText: {
        fontSize: 24,
        color: '#1F2937',
        marginBottom: 4,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    subtitleText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },
    inputWrapper: {
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#111827',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        color: '#111827',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 14,
        marginBottom: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#111827',
        borderRadius: 16,
        paddingVertical: 16,
        marginBottom: 24,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 18,
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    linkText: {
        color: '#6B7280',
        fontSize: 16,
    },
    linkButton: {
        color: '#14B8A6',
        fontWeight: '600',
        fontSize: 16,
    },
  });