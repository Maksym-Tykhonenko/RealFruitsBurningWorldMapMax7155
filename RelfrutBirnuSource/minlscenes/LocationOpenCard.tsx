import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Share, ScrollView, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const YELLOW = '#DFD800';

export default function LocationOpenCard({
    location,
    onBack,
    fullScreen,
}: {
    location: any,
    onBack: () => void,
    fullScreen?: boolean,
}) {
    const borderRadius = width * 0.045;
    const cardWidth = width * 0.92;
    const imageHeight = height * 0.23;
    const padding = width * 0.045;
    const buttonHeight = height * 0.07;
    const buttonFont = width * 0.055;
    const buttonGap = width * 0.04;

    const coords =
        location.coordinates &&
        typeof location.coordinates.lat === 'number' &&
        typeof location.coordinates.lng === 'number'
            ? `${location.coordinates.lat.toFixed(4)}, ${location.coordinates.lng.toFixed(4)}`
            : 'N/A';

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const checkSaved = async () => {
            try {
                const key = 'savedLocations';
                const existing = await AsyncStorage.getItem(key);
                if (existing) {
                    const arr = JSON.parse(existing);
                    setSaved(arr.some((l: any) => l.name === location.name && l.region === location.region));
                } else {
                    setSaved(false);
                }
            } catch {
                setSaved(false);
            }
        };
        checkSaved();
    }, [location]);

    const handleToggleSave = async () => {
        const key = 'savedLocations';
        try {
            const existing = await AsyncStorage.getItem(key);
            let arr = [];
            if (existing) arr = JSON.parse(existing);

            const idx = arr.findIndex((l: any) => l.name === location.name && l.region === location.region);

            if (idx === -1) {
                arr.push(location);
                setSaved(true);
            } else {
                arr.splice(idx, 1);
                setSaved(false);
            }
            await AsyncStorage.setItem(key, JSON.stringify(arr));
        } catch {
            // ignore errors
        }
    };

    const CardContent = (
        <View style={{
            width: cardWidth,
            borderRadius,
            backgroundColor: '#2A6900',
            padding: padding,
            shadowColor: '#000',
            shadowOpacity: 0.10,
            shadowRadius: 8,
            elevation: 2,
        }}>
            <TouchableOpacity
                onPress={onBack}
                style={{
                    position: 'absolute',
                    right: padding * 0.3,
                    top: padding * 0.3,
                    zIndex: 2,
                    borderRadius: width * 0.06,
                    width: width * 0.09,
                    height: width * 0.09,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('../arlassets/brnimages/back.png')}
                    style={{
                        width: width * 0.05,
                        height: width * 0.05,
                        resizeMode: 'contain',
                    }}
                />
            </TouchableOpacity>
            <Text style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: width * 0.058,
                marginBottom: padding * 0.5,
                marginRight: width * 0.13,
            }}>{location.name}</Text>
            <Text style={{
                color: '#fff',
                fontSize: width * 0.042,
                marginBottom: padding * 0.5,
            }}>
                Coordinates: {coords}
            </Text>
            <Image
                source={location.image}
                style={{
                    width: '100%',
                    height: imageHeight,
                    borderRadius: borderRadius * 0.7,
                    resizeMode: 'cover',
                    marginBottom: padding * 0.7,
                }}
            />
            <Text style={{
                color: '#fff',
                fontSize: width * 0.038,
                opacity: 0.95,
                marginBottom: padding * 0.8,
            }}>
                {location.description}
            </Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: buttonGap,
            }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: YELLOW,
                        borderRadius: borderRadius,
                        flex: 1,
                        height: buttonHeight,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => {
                        if (
                            location.coordinates &&
                            typeof location.coordinates.lat === 'number' &&
                            typeof location.coordinates.lng === 'number'
                        ) {
                            const url = `https://maps.google.com/?q=${location.coordinates.lat},${location.coordinates.lng}`;
                            Linking.openURL(url);
                        }
                    }}
                >
                    <Text style={{
                        color: '#050C16',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: buttonFont,
                    }}>Open map</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: YELLOW,
                        borderRadius: borderRadius,
                        flex: 1,
                        height: buttonHeight,
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: saved ? 0.7 : 1,
                    }}
                    onPress={handleToggleSave}
                    activeOpacity={0.85}
                >
                    <Text style={{
                        color: '#222',
                        fontWeight: 'bold',
                        fontSize: buttonFont,
                    }}>{saved ? 'Saved' : 'Save'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: YELLOW,
                        borderRadius: borderRadius,
                        flex: 1,
                        height: buttonHeight,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => Share.share({ message: location.description })}
                >
                    <Text style={{
                        color: '#050C16',
                        fontWeight: 'bold',
                        fontSize: buttonFont,
                    }}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (fullScreen) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#184800',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {CardContent}
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{
            alignItems: 'center',
            paddingTop: height * 0.03,
            paddingBottom: height * 0.1,
            minHeight: height,
        }}>
            {CardContent}
        </ScrollView>
    );
}
