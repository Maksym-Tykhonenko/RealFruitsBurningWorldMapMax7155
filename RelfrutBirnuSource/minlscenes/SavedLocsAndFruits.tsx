import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView,
    Image,
    Share
 } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationClosedCard from './LocationClosedCard';
import FactCard from '../components/FactCard';
import { fitrefonts } from '../arlassets/fitrefonts';
import LocationOpenCard from './LocationOpenCard';
import BirnutreKnoptanWodr from '../components/BirnutreKnoptanWodr';

const { width, height } = Dimensions.get('window');

const SAVED_LOCATIONS_KEY = 'savedLocations';
const SAVED_FACTS_KEY = 'SAVED_FACTS';

export default function SavedLocsAndFruits({ navigateTo }) {
    const [savedLocations, setSavedLocations] = useState<any[]>([]);
    const [savedFacts, setSavedFacts] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        loadSaved();
    }, []);

    async function loadSaved() {
        try {
            const locs = await AsyncStorage.getItem(SAVED_LOCATIONS_KEY);
            setSavedLocations(locs ? JSON.parse(locs) : []);
            const facts = await AsyncStorage.getItem(SAVED_FACTS_KEY);
            setSavedFacts(facts ? JSON.parse(facts) : []);
        } catch {
            setSavedLocations([]);
            setSavedFacts([]);
        }
    }

    // Видалення локації
    async function removeLocation(locToRemove: any) {
        const filtered = savedLocations.filter(
            (l) => !(l.name === locToRemove.name && l.region === locToRemove.region)
        );
        setSavedLocations(filtered);
        await AsyncStorage.setItem(SAVED_LOCATIONS_KEY, JSON.stringify(filtered));
    }

    // Видалення факту
    async function removeFact(factToRemove: string) {
        const filtered = savedFacts.filter((f) => f !== factToRemove);
        setSavedFacts(filtered);
        await AsyncStorage.setItem(SAVED_FACTS_KEY, JSON.stringify(filtered));
    }

    // Якщо відкрито повну картку локації
    if (selectedLocation && showDetails) {
        return (
            <View style={{ flex: 1, backgroundColor: '#184800' }}>
                <ScrollView contentContainerStyle={{
                    paddingBottom: height * 0.19,
                    alignSelf: 'center',
                    paddingTop: height * 0.04,
                }}>
                    {/* Використовуємо LocationOpenCard */}
                    <LocationOpenCard
                        location={selectedLocation}
                        onBack={() => setShowDetails(false)}
                        // Додаємо режим для повноекранного перегляду
                        fullScreen
                    />
                </ScrollView>
            </View>
        );
    }

    // Якщо нічого не збережено
    if (savedLocations.length === 0 && savedFacts.length === 0) {
        return (
            <View style={{
                flex: 1,
            }}>
                <View style={{ alignItems: 'center', paddingTop: height * 0.0 }}>
                    <View style={{
                        width: width * 0.92,
                        backgroundColor: 'rgba(42, 105, 0, 1)',
                        borderRadius: width * 0.045,
                        padding: width * 0.045,
                        marginVertical: height * 0.02,
                    }}>
                        <Text style={{
                            color: '#fff',
                            textAlign: 'center',
                            fontFamily: fitrefonts.manrfruSB,
                            fontSize: width * 0.04,
                            paddingHorizontal: width * 0.04,
                        }}>
                            Oops, nothing saved. But you can quickly go through the buttons and save something!
                        </Text>
                    </View>
                </View>

                {['Open places', 'Read facts'].map((btnText, idx) => (
                    <BirnutreKnoptanWodr
                        proptext={btnText}
                        onPress={() => {
                            navigateTo(btnText === 'Open places' ? 'Map:' : 'Facts:');
                        }}
                        stylesforbutn={{
                            marginBottom: height * 0.012
                        }}
                    />
                ))}
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1, }} contentContainerStyle={{ alignItems: 'center', paddingTop: height * 0.03, paddingBottom: height * 0.19 }}>
            {/* Вивід збережених локацій */}
            {savedLocations.length > 0 && (
                <View style={{ width: width * 0.92, marginBottom: height * 0.03 }}>
                    <Text style={{
                        color: '#fff',
                        fontFamily: fitrefonts.manrfruSB,
                        fontSize: width * 0.05,
                        marginBottom: height * 0.01,
                    }}>Saved locations:</Text>
                    {savedLocations.map((loc, idx) => (
                        <View key={idx} style={{ marginBottom: height * 0.018 }}>
                            <LocationClosedCard
                                location={loc}
                                newStyle={{}}
                                onReadMore={() => {
                                    setSelectedLocation(loc);
                                    setShowDetails(true);
                                }}
                                customClose={
                                    <TouchableOpacity
                                        style={{
                                            alignSelf: 'flex-start',
                                            backgroundColor: 'transparent',
                                            borderWidth: 2,
                                            borderColor: '#DFD800',
                                            borderRadius: width * 0.04,
                                            paddingVertical: height * 0.018,
                                            width: width * 0.25,
                                            height: height * 0.07,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => removeLocation(loc)}
                                    >
                                        <Image
                                            source={require('../arlassets/brnimages/doublesave.png')}
                                            style={{
                                                width: width * 0.07,
                                                height: width * 0.07,
                                                tintColor: '#DFD800',
                                            }}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                }
                            />
                        </View>
                    ))}
                </View>
            )}
            {/* Вивід збережених фактів */}
            {savedFacts.length > 0 && (
                <View style={{ width: width * 0.92 }}>
                    <Text style={{
                        color: '#fff',
                        fontFamily: fitrefonts.manrfruSB,
                        fontSize: width * 0.05,
                        marginBottom: height * 0.01,
                    }}>Saved facts:</Text>
                    {savedFacts.map((fact, idx) => (
                        <View key={idx} style={{ marginBottom: height * 0.018 }}>
                            <FactCard
                                title="Saved fact:"
                                fact={fact}
                                key={idx}
                                saved={true}
                                onShare={() => {
                                    Share.share({
                                        message: fact,
                                    });
                                }}
                                onSave={() => { }}
                                onRemove={() => removeFact(fact)}
                            />
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}
