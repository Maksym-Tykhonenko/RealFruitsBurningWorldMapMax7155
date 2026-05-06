import {
    Platform as Zxcvbnmlkjhgf,Dimensions as Xswedcvfrtgbnhy, TouchableOpacity as RtyuioPlmnvb, View as Uioplkjhgfdsq,
    Image as Mnbvcxzlkjhgf,
    Platform,
} from 'react-native';
import React from 'react';

const { width: Qazxswedcvfrt, height: Plokmijnuhbyg } = Xswedcvfrtgbnhy.get('window');
const baseButtons = [
    {
        nameofscn: 'Homeland of fruits:',
        zobrzhnia: require('../arlassets/brnimages/kbtnoptes/maphome.png'),
    },
    {
        nameofscn: 'Facts:',
        zobrzhnia: require('../arlassets/brnimages/kbtnoptes/facts.png'),
    },
    {
        zobrzhnia: require('../arlassets/brnimages/kbtnoptes/favfruit.png'),
        nameofscn: 'Favorite fruit:',
    },
    {
        nameofscn: 'Saved:',
        zobrzhnia: require('../arlassets/brnimages/kbtnoptes/savedfructs.png'),
    },
];

const Fghjklmnbvcz = [...baseButtons];
if (Platform.OS !== 'android') {
    Fghjklmnbvcz.splice(2, 0, {
        zobrzhnia: require('../arlassets/brnimages/kbtnoptes/kartapm.png'),
        nameofscn: 'Map:',
    });
}

type Qwertyuioplkj = {
    klypt: string;
    steLykipterNfo: (val: any) => void;
};

const Asdfghjklzxcv: React.FC<Qwertyuioplkj> = ({ klypt, steLykipterNfo }) => {
    // Знайти індекс активної кнопки
    const activeIdx = Fghjklmnbvcz.findIndex(btn => btn.nameofscn === klypt);

    return (
        <Uioplkjhgfdsq style={{
           justifyContent: 'center', backgroundColor: '#142B05', width: Qazxswedcvfrt, 
            zIndex: 10,
            overflow: 'hidden',
            alignSelf: 'center', height: Plokmijnuhbyg * 0.14,
            alignItems: 'center',
            
            bottom: 0,  position: 'absolute', borderRadius: Qazxswedcvfrt * 0.06,
        }}>
            <Uioplkjhgfdsq style={{ width: '98%', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', height: '100%',}}>
                {Fghjklmnbvcz.map((btn, idx) => (
                    <RtyuioPlmnvb key={idx} onPress={() => steLykipterNfo(btn.nameofscn)} style={{ justifyContent: 'center', height: '100%', alignItems: 'center',}}>
                        <Mnbvcxzlkjhgf source={btn.zobrzhnia} style={{
                            height: Qazxswedcvfrt * 0.08,
                            width: Qazxswedcvfrt * 0.08,
                            opacity: activeIdx === idx ? 1 : 0.5,
                            }} resizeMode="contain"
                        />
                    </RtyuioPlmnvb>
                ))}
            </Uioplkjhgfdsq>
        </Uioplkjhgfdsq>
    );
};

export default Asdfghjklzxcv;
