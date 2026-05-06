import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const YELLOW = '#DFD800';

export default function LocationClosedCard({
    location,
    onReadMore,
    customClose,
    newStyle,
}: {
    location: any,
    onReadMore?: () => void,
    customClose?: React.ReactNode,
    newStyle?: object,
}) {
    const borderRadius = width * 0.045;
    const cardHeight = height * 0.32;
    const cardWidth = width * 0.92;
    const imageHeight = cardHeight * 0.38;
    const padding = width * 0.045;
    const buttonHeight = height * 0.07;
    const buttonFont = width * 0.045;
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

    return (
        <View style={[{
            width: cardWidth,
            borderRadius,
            backgroundColor: '#2A6900',
            padding: padding,
            shadowColor: '#000',
            shadowOpacity: 0.10,
            shadowRadius: 8,
            elevation: 2,
        }, newStyle]}>
            <Text style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: width * 0.052,
                marginBottom: padding * 0.3,
            }}>
                {location.name}{location.region ? ` – ${location.region}` : ''}
            </Text>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: buttonGap, marginTop: padding * 0.2 }}>
                <TouchableOpacity
                    style={[styles.button, { borderRadius, height: buttonHeight, flex: 1, backgroundColor: YELLOW }]}
                    onPress={onReadMore}
                    activeOpacity={0.85}
                >
                    <Text style={[styles.buttonText, { fontSize: buttonFont }]}>Read more</Text>
                </TouchableOpacity>
                {customClose ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {customClose}
                    </View>
                ) : (
                    saved ? (
                        <View
                            style={{
                                backgroundColor: 'transparent',
                                borderWidth: 2,
                                borderColor: YELLOW,
                                borderRadius,
                                paddingVertical: height * 0.018,
                                width: width * 0.25,
                                height: buttonHeight,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                source={require('../arlassets/brnimages/doublesave.png')}
                                style={{
                                    width: width * 0.07,
                                    height: width * 0.07,
                                    tintColor: YELLOW,
                                }}
                                resizeMode="contain"
                            />
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    borderRadius,
                                    height: buttonHeight,
                                    flex: 1,
                                    backgroundColor: YELLOW,
                                }
                            ]}
                            onPress={handleToggleSave}
                            activeOpacity={0.85}
                        >
                            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>
                                Save
                            </Text>
                        </TouchableOpacity>
                    )
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 0,
    },
    buttonText: {
        color: '#222',
        fontWeight: 'bold',
    },
});
