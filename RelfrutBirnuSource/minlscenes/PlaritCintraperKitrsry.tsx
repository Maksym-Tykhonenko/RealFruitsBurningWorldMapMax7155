

type QwertyuiopLkjhgf =
    | 'Fan Meter'
    | 'Space Stories'
    | 'Saved:'
    | 'Homeland of fruits:'
    | 'Map:'
    | 'Favorite fruit:'
    | 'Facts:';
import {
    Dimensions as MnbvcxzLkjhgfd, Platform as ZxcvbnmlKjhgfds,
    SafeAreaView as PlmoknijbVgytfc,
    Image as PoiuytrewqAsdfgh, View as XswedcvfrTgbyhn,
    Text,
} from 'react-native';
import LkjhgfdsaPoiuyt from './StarScnAndFourQkwiszes';

const { width: RtyuioPlmnBvcxz, height: FghjklMnbvcxz } = MnbvcxzLkjhgfd.get('window');
import Vbnmlkjhgfdswq from '../components/BarbontVnzNavigate';
import React, { useState as QazxswedcRfvbgt, } from 'react';
import FactsOfWord from './FactsOfWord';
import MapOfFrtsOrigins from './MapOfFrtsOrigins';
import SavedLocsAndFruits from './SavedLocsAndFruits';
import FavoriteFruit from './FavoriteFruit';



const AsdfghjklPoiuyt: React.FC = () => {
    const [QazwsxedcVfrbgt, Mnbvcxzlkjhgfd] = QazxswedcRfvbgt<QwertyuiopLkjhgf>('Homeland of fruits:');


    const QazwsxedcRender = (PlmoknijbVgyt: QwertyuiopLkjhgf) => {
        switch (PlmoknijbVgyt) {
            case 'Homeland of fruits:':
                return <LkjhgfdsaPoiuyt />;
            case 'Facts:':
                return <FactsOfWord />
            case 'Map:':
                return <MapOfFrtsOrigins />
            case 'Saved:': 
                return <SavedLocsAndFruits navigateTo={Mnbvcxzlkjhgfd} />
            case 'Favorite fruit:':
                return <FavoriteFruit />
            default:
                return null;
        }
    };

    return (
        <XswedcvfrTgbyhn style={{ flex: 1, height: FghjklMnbvcxz, width: RtyuioPlmnBvcxz, backgroundColor: '#02020E', }}>
            <XswedcvfrTgbyhn style={{
                justifyContent: 'center', backgroundColor: '#142B05', width: RtyuioPlmnBvcxz,
                zIndex: 10,
                overflow: 'hidden',
                alignSelf: 'center', 
                alignItems: 'center',
                // borderBottomLeftRadius: RtyuioPlmnBvcxz * 0.06,
                // borderBottomRightRadius: RtyuioPlmnBvcxz * 0.06,
            }}>
                <PlmoknijbVgytfc style={{
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: FghjklMnbvcxz * 0.12,
                }}>
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: RtyuioPlmnBvcxz * 0.05,
                        fontWeight: 'bold',
                    }}>
                        {QazwsxedcVfrbgt}
                    </Text>
                </PlmoknijbVgytfc>

            </XswedcvfrTgbyhn>
            <PlmoknijbVgytfc />
            <PoiuytrewqAsdfgh style={{
                position: 'absolute', alignSelf: 'center', height: FghjklMnbvcxz,
                bottom: 0, width: RtyuioPlmnBvcxz * 1.04,
            }} resizeMode='cover'
                source={require('../arlassets/brnimages/loader.png')}
            />
            <XswedcvfrTgbyhn style={{ marginTop: ZxcvbnmlKjhgfds.OS === 'android' ? FghjklMnbvcxz * 0.028 : 0 }} />


            <XswedcvfrTgbyhn style={{ flex: 1, zIndex: 1 }}>
                {QazwsxedcRender(QazwsxedcVfrbgt)}
            </XswedcvfrTgbyhn>

            {QazwsxedcVfrbgt !== 'About Us' && <Vbnmlkjhgfdswq klypt={QazwsxedcVfrbgt} steLykipterNfo={Mnbvcxzlkjhgfd} />}
        </XswedcvfrTgbyhn>
    );
};

export default AsdfghjklPoiuyt;