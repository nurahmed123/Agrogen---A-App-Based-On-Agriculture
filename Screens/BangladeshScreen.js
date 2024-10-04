import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';

// Get the dimensions of the device for full-screen scaling
const { width, height } = Dimensions.get('window');

const BangladeshScreen = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState('Select Region');

    // Function to handle press event on Bangladesh (when the map is clicked)
    const handlePressBangladesh = () => {
        console.log('Select Region');
        setMessage('Select Region');
        navigation.navigate('Bangladesh');
    };

    return (
        <View style={styles.container}>
            {/* Full-size map image as background */}
            <ImageBackground
                source={require('../assets/images/bangladesh.png')}  // Make sure to use the correct path for your map image
                style={styles.mapContainer}
                resizeMode="cover"
            >
                {/* Text displayed over the image */}
                <Text style={styles.header}>{message}</Text>

                {/* Touchable region for the entire image */}
                <TouchableOpacity
                    style={styles.touchArea}
                    onPress={handlePressBangladesh}
                />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapContainer: {
        flex: 1,  // Take up the entire screen space
        width: width,  // Full device width
        height: height,  // Full device height
        justifyContent: 'center',  // Center the text vertically
        alignItems: 'center',  // Center the text horizontally
        position: 'relative',
    },
    header: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        position: 'absolute',
        top: 150,  // Adjust this value to position the text at the top of the screen
        textAlign: 'center',
        width: '100%',
    },
    touchArea: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default BangladeshScreen;
