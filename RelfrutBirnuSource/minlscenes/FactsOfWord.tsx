import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Dimensions, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FactCard from '../components/FactCard';
import interestfactsandrand from '../arlassets/interestfactsandrand';
import { fitrefonts } from '../arlassets/fitrefonts';

const { width, height } = Dimensions.get('window');

const FACTS_KEY = 'SAVED_FACTS';

function getRandomFact(facts) {
    return facts[Math.floor(Math.random() * facts.length)];
}

export default function FactsOfWord() {
    const [mode, setMode] = useState<'random' | 'recommended'>('random');
    const [fact, setFact] = useState('');
    const [savedFacts, setSavedFacts] = useState<string[]>([]);
    const [isSaved, setIsSaved] = useState(false);

    // Показуємо перший факт при старті
    useEffect(() => {
        showRandomFact();
        loadSavedFacts();
    }, []);

    // Оновлюємо isSaved при зміні факту чи savedFacts
    useEffect(() => {
        setIsSaved(savedFacts.includes(fact));
    }, [fact, savedFacts]);

    async function loadSavedFacts() {
        try {
            const json = await AsyncStorage.getItem(FACTS_KEY);
            if (json) setSavedFacts(JSON.parse(json));
        } catch {}
    }

    async function saveFact() {
        if (!fact || savedFacts.includes(fact)) return;
        const newFacts = [...savedFacts, fact];
        setSavedFacts(newFacts);
        setIsSaved(true);
        await AsyncStorage.setItem(FACTS_KEY, JSON.stringify(newFacts));
    }

    function showRandomFact() {
        setMode('random');
        setFact(getRandomFact(interestfactsandrand));
    }

    function showRecommendedFact() {
        setMode('recommended');
        // Для прикладу: беремо перший факт як recommended
        setFact(interestfactsandrand[0]);
    }

    function handleShare() {
        Share.share({ message: fact });
    }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'transparent',
        }}>
            <FactCard
                title={mode === 'random' ? 'Random fact:' : 'Recomended fact:'}
                fact={fact}
                saved={isSaved}
                onShare={handleShare}
                onSave={saveFact}
            />
            <TouchableOpacity
                style={{
                    marginTop: height * 0.04,
                    backgroundColor: '#DFD800',
                    borderRadius: width * 0.04,
                    width: width * 0.9,
                    alignItems: 'center',
                    paddingVertical: height * 0.025,
                }}
                onPress={showRecommendedFact}
            >
                <Text style={{
                    color: 'black',
                    fontFamily: fitrefonts.manrfruSB,
                    fontSize: width * 0.055,
                }}>New fact</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    marginTop: height * 0.025,
                    borderColor: '#fff',
                    borderWidth: 2,
                    borderRadius: width * 0.04,
                    width: width * 0.9,
                    alignItems: 'center',
                    paddingVertical: height * 0.025,
                }}
                onPress={showRandomFact}
            >
                <Text style={{
                    color: 'white',
                    fontFamily: fitrefonts.manrfruSB,
                    fontSize: width * 0.055,
                }}>New random fact</Text>
            </TouchableOpacity>
        </View>
    );
}
