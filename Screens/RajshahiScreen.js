import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Animated } from 'react-native';
import { useFonts, Jomhuria_400Regular } from '@expo-google-fonts/jomhuria';
import { HindSiliguri_400Regular } from '@expo-google-fonts/hind-siliguri';
import AppLoading from 'expo-app-loading';

const RajshahiScreen = () => {
    // Animation value
    const [fadeAnim] = useState(new Animated.Value(0));

    // Load the fonts
    let [fontsLoaded] = useFonts({
        Jomhuria_400Regular,
        HindSiliguri_400Regular,
    });

    // Animation effect
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <ImageBackground
            source={require('../assets/images/rajbg.png')} // Replace with the path to your image
            style={styles.background}
        >
            <View style={styles.container}>
                <Animated.View style={{ ...styles.textContainer, opacity: fadeAnim }}>
                    <Text style={styles.introText}>INTRO</Text>
                    <Text style={styles.introTextEmphasized}>DUCTION</Text>
                </Animated.View>

                <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
                    RAJSHAHI
                </Animated.Text>

                <Animated.Text style={[styles.description, { opacity: fadeAnim }]}>
                    Rajshahi is one of the divisional head quarters of Bangladesh, situated in the northern part of the country. Recent agricultural modernizations with the much-lauded Barendra project has increased crop diversification, allowed farmers to access better analysis of their farmland's chemical composition, and generally allowed farmers to grow as many as three crops every year instead of the usual one crop.
                </Animated.Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',  // Align items at the start
        padding: 20,
    },
    textContainer: {
        flexDirection: 'row',
        alignSelf: 'center', // Center the text container
        marginTop: 100, // Adjust this for spacing from the top
        marginBottom: 50, // Space below the introduction
    },
    introText: {
        fontSize: 24,
        color: 'green',
        fontFamily: 'Jomhuria_400Regular',
    },
    introTextEmphasized: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'Jomhuria_400Regular',
    },
    title: {
        fontSize: 48,
        color: 'white',
        fontFamily: 'Jomhuria_400Regular',
        textAlign: 'center',
        marginTop: 250, // Space above the title
        marginBottom: 20, // Space below the title
    },
    description: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'HindSiliguri_400Regular',
        textAlign: 'justify',
        marginTop: 20, // Space above the description
        marginBottom: 50, // Space below the description
    },
});

export default RajshahiScreen;
