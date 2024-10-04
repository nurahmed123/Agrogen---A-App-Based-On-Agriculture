import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Animated,
    Dimensions,
    Keyboard, // Import Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { HammersmithOne_400Regular } from '@expo-google-fonts/hammersmith-one';
import * as SplashScreen from 'expo-splash-screen'; // Import SplashScreen

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const [buttonAnim] = useState(new Animated.Value(1));
    const [keyboardVisible, setKeyboardVisible] = useState(false); // State for keyboard visibility

    // Load fonts
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        HammersmithOne_400Regular,
    });

    const handleSkipPress = () => {
        // Navigate to the next screen
        navigation.navigate('Map');
    };

    // Ensure Splash Screen stays visible while fonts are loading
    useEffect(() => {
        const prepareApp = async () => {
            try {
                await SplashScreen.preventAutoHideAsync();
            } catch (e) {
                console.warn(e);
            }
        };
        prepareApp();
    }, []);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync(); // Only hide splash screen once fonts are loaded
        }
    }, [fontsLoaded]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true); // Set keyboard visibility to true
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false); // Set keyboard visibility to false
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleLogin = () => {
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    // Animate when component mounts
    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleButtonPressIn = () => {
        Animated.spring(buttonAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handleButtonPressOut = () => {
        Animated.spring(buttonAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const headerScale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
    });

    const headerOpacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    if (!fontsLoaded) {
        return null; // This ensures that the component only renders when fonts are loaded
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <Animated.View
                style={[styles.header, { transform: [{ scale: headerScale }], opacity: headerOpacity }]}
            >
                <Image
                    source={require('../assets/images/loginbg.jpeg')} // Replace with your image
                    style={styles.headerImage}
                />
                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerTitle, { fontFamily: 'HammersmithOne_400Regular' }]}>
                        AGROGEN
                    </Text>
                </View>
            </Animated.View>

            <View style={styles.loginContainer}>
                {/* Welcome Text */}
                <Text style={[styles.title, { fontFamily: 'Poppins_700Bold', color: keyboardVisible ? '#FFFFFF' : '#333333' }]}>
                    Welcome back
                </Text>
                <Text style={[styles.subtitle, { fontFamily: 'Poppins_400Regular' }]}>
                    Login to your account
                </Text>

                {/* Input Fields */}
                <TextInput
                    style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
                    placeholder="Enter email or phone"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                        <Image
                            source={require('../assets/images/eye.jpeg')}
                            style={styles.eyeImage}
                        />
                    </TouchableOpacity>
                </View>

                {/* Remember Me */}
                <View style={styles.rememberContainer}>
                    <Text style={[styles.rememberMeText, { fontFamily: 'Poppins_400Regular' }]}>
                        Remember me
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Buttons */}
                <View style={styles.buttonRow}>
                    <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
                        <TouchableOpacity
                            onPress={handleLogin}
                            style={styles.loginButton}
                            onPressIn={handleButtonPressIn}
                            onPressOut={handleButtonPressOut}
                        >
                            <Text style={[styles.buttonText, { fontFamily: 'Poppins_700Bold' }]}>
                                Log In
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <TouchableOpacity onPress={handleSkipPress} style={styles.skipButton}>
                        <Text style={[styles.buttonText1, { fontFamily: 'Poppins_700Bold' }]}>Skip</Text>
                    </TouchableOpacity>
                </View>

                {/* Social Login */}
                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.separatorLine} />
                </View>

                {/* Create Account */}
                <View style={styles.createAccountContainer}>
                    <Text style={[styles.createAccountText, { fontFamily: 'Poppins_400Regular' }]}>
                        Don't have an Account?
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.createAccountLink}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flex: 1,
        width: '100%',
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    headerTitleContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    loginContainer: {
        flex: 2,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#777',
        marginTop: 15
    },
    input: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    passwordContainer: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 20,
    },
    eyeImage: {
        width: 20,
        height: 20,
    },
    rememberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberMeText: {
        fontSize: 14,
        color: '#888',
    },
    forgotPassword: {
        fontSize: 14,
        color: '#F29329',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#388E3C',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 20,
        background: 'linear-gradient(91.47deg, #007805 0.58%, #044800 95.65%)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
},
    skipButton: {
    backgroundColor: '#01B008',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 20,
},
    buttonText: {
    color: '#fff',
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
},
    buttonText1: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
},
    separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
},
    separatorLine: {
    height: 1,
    backgroundColor: '#ddd',
    flex: 1,
},
    orText: {
    marginHorizontal: 10,
    color: '#888',
    fontFamily: 'Poppins_400Regular',
},
    socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
},
    createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
},
    createAccountText: {
    fontSize: 14,
    color: '#888',
},
    createAccountLink: {
    fontSize: 14,
    color: '#388E3C',
    marginLeft: 5,
},
});

export default LoginScreen;
