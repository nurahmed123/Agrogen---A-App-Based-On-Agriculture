import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Animated, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font'; // Import useFonts
import { HammersmithOne_400Regular } from '@expo-google-fonts/hammersmith-one'; // Import Hammersmith One
import { Livvic_400Regular } from '@expo-google-fonts/livvic'; // Import Livvic

const HomeScreen = () => {
    const navigation = useNavigation();
    const [fadeAnim] = useState(new Animated.Value(0)); // Welcome message fade-in
    const [buttonAnim] = useState(new Animated.Value(0)); // Button fade-in
    const [scaleAnim] = useState(new Animated.Value(0.8)); // For modern scaling animation

    // Load the fonts
    const [fontsLoaded] = useFonts({
        HammersmithOne_400Regular, // Load Hammersmith One font
        Livvic_400Regular, // Load Livvic font
    });

    useEffect(() => {
        if (fontsLoaded) {
            // Fade-in the welcome message with scale animation
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 3, // Adjust the bounciness
                    tension: 100, // Controls the tightness
                    useNativeDriver: true,
                }),
            ]).start();

            // After the welcome message fades in, fade-in the button
            setTimeout(() => {
                Animated.timing(buttonAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }).start();
            }, 2500);
        }
    }, [fadeAnim, scaleAnim, fontsLoaded]);

    const handleStartPress = () => {
        // Navigate to the next screen
        navigation.navigate('Login');
    };

    // Display a loading indicator if fonts are not yet loaded
    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#075F02" />;
    }

    return (
        <ImageBackground
            source={require('../assets/images/bg.jpeg')} // Your background image
            style={styles.background}
        >
            <View style={styles.centerContainer}>
                <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                    <Text style={styles.title}>WELCOME TO</Text>
                    <Text style={styles.subtitle}>AGROGEN</Text>
                </Animated.View>

                {/* Animated Start Button */}
                <Animated.View style={[styles.buttonContainer, { opacity: buttonAnim }]}>
                    <TouchableOpacity onPress={handleStartPress} style={styles.startButton}>
                        <Text style={styles.buttonText}>Start →</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Livvic_400Regular', // Apply Livvic for the welcome message
    },
    subtitle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'HammersmithOne_400Regular', // Apply Hammersmith One for AGROGEN
    },
    buttonContainer: {
        marginTop: 30,
    },
    startButton: {
        backgroundColor: '#075F02',
        paddingVertical: 14,
        paddingHorizontal: 60,
        borderRadius: 25,
        elevation: 5, // Adds shadow on Android
        shadowColor: '#000', // Adds shadow on iOS
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        width: 250, // Button width
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2, // Border thickness
        borderColor: '#fff', // White border for contrast
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'HammersmithOne_400Regular', // Apply Hammersmith One for the button text
    },
});

export default HomeScreen;
