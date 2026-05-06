import React, { useState } from 'react';
import {
    View, Text, Dimensions, Image, TouchableOpacity,
    Share
} from 'react-native';
import { fitrefonts } from '../arlassets/fitrefonts';
import BirnutreKnoptanWodr from '../components/BirnutreKnoptanWodr';

const { width, height } = Dimensions.get('window');

// Приклад масиву фруктів (замініть uri на свої локальні картинки)
const fruits = [
    { name: 'plum', img: require('../arlassets/brnimages/fruits/sliva.png') },
    { name: 'watermelon', img: require('../arlassets/brnimages/fruits/watermelon.png') },
    { name: 'cherry', img: require('../arlassets/brnimages/fruits/cherry.png') },
    { name: 'kiwi', img: require('../arlassets/brnimages/fruits/kiwi.png') },
    { name: 'lemon', img: require('../arlassets/brnimages/fruits/lemon.png') },
    { name: 'orange', img: require('../arlassets/brnimages/fruits/orange.png') },
];

// Реюзабл компонент картки фрукта з підтримкою disabled
function FruitCard({
    fruit,
    onPress,
    disabled = false,
}: {
    fruit: any,
    onPress?: () => void,
    disabled?: boolean
}) {
    return (
        <TouchableOpacity
            activeOpacity={disabled ? 1 : 0.8}
            onPress={disabled ? undefined : onPress}
            disabled={disabled}
            style={{
                backgroundColor: 'rgba(105, 189, 19, 1)',
                borderRadius: width * 0.1,
                marginBottom: height * 0.025,
                alignItems: 'center',
                justifyContent: 'center',
                width: width * 0.8,
                alignSelf: 'center',
                borderWidth: width * 0.004,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                height: width * 0.38,
            }}
        >
            <Image
                source={fruit.img}
                style={{
                    width: width * 0.45,
                    height: width * 0.25,
                    resizeMode: 'contain',
                }}
            />
        </TouchableOpacity>
    );
}

export default function FavoriteFruit() {
    const [pool, setPool] = useState([...fruits]);
    const [currentIdx, setCurrentIdx] = useState(1);
    const [favorite, setFavorite] = useState(null);

    // Почати заново
    const restart = () => {
        setPool([...fruits]);
        setCurrentIdx(1);
        setFavorite(null);
    };

    // Вибір фрукта
    const chooseFruit = (chosenIdx: number) => {
        let chosenFruit = pool[chosenIdx];
        let nextIdx = currentIdx + 1;
        // Якщо ще є фрукти для порівняння
        if (nextIdx < pool.length) {
            setPool([chosenFruit, ...pool.slice(nextIdx)]);
            setCurrentIdx(1);
        } else {
            setFavorite(chosenFruit);
        }
    };

    // Фінальний екран
    if (favorite) {
        return (
            <View style={{ flex: 1, alignItems: 'center', paddingTop: height * 0.019 }}>
                <View style={{
                    width: width * 0.92,
                    backgroundColor: 'rgba(42, 105, 0, 1)',
                    borderRadius: width * 0.045,
                    padding: width * 0.045,
                    marginBottom: height * 0.025,
                }}>
                    <Text style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontFamily: fitrefonts.manrfruSB,
                        fontSize: width * 0.045,
                        paddingHorizontal: width * 0.04,
                    }}>
                        Completed! your favorite fruit:
                    </Text>
                </View>
                <FruitCard fruit={favorite} disabled />
                {['Play again', 'Share'].map((btnText) => (
                    <BirnutreKnoptanWodr
                        key={btnText}
                        proptext={btnText}
                        onPress={btnText === 'Play again' ? restart : () => { 
                            Share.share({
                                message: `My favorite fruit is ${favorite.name}! Find out yours with this fun game!`,
                            });
                        }}
                        stylesforbutn={{
                            marginBottom: height * 0.019,
                        }}
                    />
                ))}
            </View>
        );
    }

    // Основний екран вибору
    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: height * 0.019 }}>
            <View style={{
                width: width * 0.92,
                backgroundColor: 'rgba(42, 105, 0, 1)',
                borderRadius: width * 0.045,
                padding: width * 0.045,
                marginBottom: height * 0.025,
            }}>
                <Text style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontFamily: fitrefonts.manrfruSB,
                    fontSize: width * 0.04,
                    paddingHorizontal: width * 0.04,
                }}>
                    Choose the fruit that is closest to you with each round and you will understand what your number 1 fruit is.
                </Text>
            </View>
            <Text style={{
                color: '#222',
                fontFamily: fitrefonts.manrfruSB,
                fontSize: width * 0.045,
                marginBottom: height * 0.01,
            }}>
                CHOOSE A FRUIT:
            </Text>
            <View style={{ width: width * 0.92 }}>
                {[0, 1].map((idx) => (
                    pool[idx] && (
                        <FruitCard
                            key={pool[idx].name}
                            fruit={pool[idx]}
                            onPress={() => chooseFruit(idx)}
                        />
                    )
                ))}
            </View>
        </View>
    );
}
