import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import places from '../arlassets/places';
import LocationClosedCard from './LocationClosedCard';
import LocationOpenCard from './LocationOpenCard';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default function MapOfFrtsOrigins() {
    const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    // Центр карти — середнє значення координат
    const initialRegion = {
        latitude: places[0].coordinates.lat,
        longitude: places[0].coordinates.lng,
        latitudeDelta: 100,
        longitudeDelta: 100,
    };

    // Info блок (або картка)
    let infoBlock = (
        <View style={{
            width: width * 0.92,
            backgroundColor: 'rgba(42, 105, 0, 1)',
            borderRadius: width * 0.045,
            padding: width * 0.045,
            marginVertical: height * 0.02,
        }}>
            <Text style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: width * 0.052,
                marginBottom: width * 0.02,
            }}>Info:</Text>
            <Text style={{
                color: '#fff',
                fontSize: width * 0.042,
            }}>
                Click on the pins and discover more information.
            </Text>
        </View>
    );

    // Якщо вибрана локація і не відкрито повну картку
    if (selectedLocation && !showDetails) {
        infoBlock = (
            <LocationClosedCard
                location={selectedLocation}
                newStyle={{
                    marginVertical: height * 0.02,

                }}
                // Замість Save — кнопка Close
                onReadMore={() => setShowDetails(true)}
                customClose={
                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-start',
                            marginLeft: width * 0.03,
                        }}
                        onPress={() => setSelectedLocation(null)}
                    >
                        <Text style={{
                            color: '#fff',
                            textDecorationLine: 'underline',
                            fontSize: width * 0.045,
                        }}>Close</Text>
                    </TouchableOpacity>
                }
            />
        );
    }

    // Якщо відкрито повну картку
    if (selectedLocation && showDetails) {
        return (
            <View style={{ flex: 1, backgroundColor: '#184800' }}>
                <ScrollView contentContainerStyle={{
                    paddingBottom: height * 0.19,
                    alignSelf: 'center',
                    paddingTop: height * 0.04,
                }}>

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

    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: height * 0.0 }}>
            {infoBlock}
            <MapView
                style={{
                    width: width * 0.91,
                    height: selectedLocation ? height * 0.31 : height * 0.5,
                    borderRadius: width * 0.045,
                    overflow: 'hidden',
                }}
                initialRegion={initialRegion}
                customMapStyle={[
                    { elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] },
                    { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
                    // ...можна додати ще стилі для темної карти...
                ]}
            >
                {places.map((place, idx) => (
                    <Marker
                        key={idx}
                        coordinate={{
                            latitude: place.coordinates.lat,
                            longitude: place.coordinates.lng,
                        }}
                        pinColor="#DFD800"
                        onPress={() => setSelectedLocation(place)}
                    />
                ))}
            </MapView>
        </View>
    );
}
