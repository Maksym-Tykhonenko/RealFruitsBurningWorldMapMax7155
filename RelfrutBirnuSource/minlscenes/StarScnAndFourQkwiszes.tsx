import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, TextInput,
    Image, Dimensions, TouchableWithoutFeedback, Keyboard, Platform
} from 'react-native';
import places from '../arlassets/places';
import LocationClosedCard from './LocationClosedCard';
import LocationOpenCard from './LocationOpenCard';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default function ZorpGallery({ AsdfghZxcvbnm }: { AsdfghZxcvbnm: React.Dispatch<React.SetStateAction<string>> }) {
    const [search, setSearch] = useState('');
    const [openedLocation, setOpenedLocation] = useState<any | null>(null);

    // Пошук по назві локації
    const filteredLocations = search.trim().length > 0
        ? places.filter(l =>
            l.name.toLowerCase().includes(search.trim().toLowerCase())
        )
        : places;

    // Якщо відкрита детальна картка — показуємо тільки її
    if (openedLocation) {
        return (
            <LocationOpenCard
                location={openedLocation}
                onBack={() => setOpenedLocation(null)}
            />
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{
                flex: 1,
                alignItems: 'center',
                paddingTop: height * 0.019,
                backgroundColor: 'transparent',
            }}>
                {/* Список закритих карток */}
                <ScrollView
                    style={{ width: width * 0.92 }}
                    contentContainerStyle={{ paddingBottom: height * 0.15 }}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredLocations.map((loc, idx) => (
                        <View key={loc.name + idx} style={{ marginBottom: height * 0.018 }}>
                            <LocationClosedCard
                                location={loc}
                                onReadMore={() => setOpenedLocation(loc)}
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}
