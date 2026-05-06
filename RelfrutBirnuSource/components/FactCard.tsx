import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');
import { fitrefonts } from '../arlassets/fitrefonts';
export default function FactCard({
    title,
    fact,
    saved,
    onShare,
    onSave,
    onRemove,
}) {
    return (
        <View style={{
            backgroundColor: '#2A6900',
            borderRadius: width * 0.05,
            padding: width * 0.06,
            marginTop: height * 0.025,
            width: width * 0.92,
            alignSelf: 'center',
        }}>
            <Text style={{
                color: 'white',
                fontFamily: fitrefonts.manrfruSB,
                fontSize: width * 0.05,
                marginBottom: height * 0.01,
            }}>
                {title}
            </Text>
            <Text style={{
                color: 'white',
                fontFamily: fitrefonts.manrfruR,
                fontSize: width * 0.04,
                marginBottom: height * 0.03,
            }}>
                {fact}
            </Text>
            <View style={{
                flexDirection: 'row',
                gap: width * 0.021,
            }}>
                <TouchableOpacity
                    onPress={onShare}
                    style={{
                        backgroundColor: '#DFD800',
                        borderRadius: width * 0.04,
                        paddingVertical: height * 0.018,
                        width: width * 0.25,
                        height: height * 0.08,
                        marginRight: width * 0.01,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: width * 0.045,
                    }}>Share</Text>
                </TouchableOpacity>
                {saved ? (
                    onRemove ? (
                        <TouchableOpacity
                            onPress={onRemove}
                            style={{
                                backgroundColor: 'transparent',
                                borderWidth: 2,
                                borderColor: '#DFD800',
                                borderRadius: width * 0.04,
                                paddingVertical: height * 0.018,
                                width: width * 0.25,
                                height: height * 0.08,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
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
                    ) : (
                        <View style={{
                            backgroundColor: 'transparent',
                            borderWidth: 2,
                            borderColor: '#DFD800',
                            borderRadius: width * 0.04,
                            paddingVertical: height * 0.018,
                            width: width * 0.25,
                            height: height * 0.08,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Image
                                source={require('../arlassets/brnimages/doublesave.png')}
                                style={{
                                    width: width * 0.07,
                                    height: width * 0.07,
                                    tintColor: '#DFD800',
                                }}
                                resizeMode="contain"
                            />
                        </View>
                    )
                ) : (
                    <TouchableOpacity
                        onPress={onSave}
                        style={{
                            backgroundColor: '#DFD800',
                            borderRadius: width * 0.04,
                            paddingVertical: height * 0.018,
                            width: width * 0.25,
                            height: height * 0.08,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text style={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: width * 0.045,
                        }}>Save</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
