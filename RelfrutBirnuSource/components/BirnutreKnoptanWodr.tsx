const { width: Asdfghjklqwer } = require('react-native').Dimensions.get('window');
import React from 'react';
import { GradintNirburRuftis } from './GradintNirburRuftis';
import {
    Text as Xswedcvfrtgbn,
    GestureResponderEvent,
    TouchableOpacity as Vbnmlkjhgfdsa,
    Dimensions as Uioplkjhgfds,
} from 'react-native';
import { fitrefonts } from '../arlassets/fitrefonts';

interface EnusiUniqbuttnProps {
    proptext?: string;
    onPress: (e: GestureResponderEvent) => void;
    style?: object;
    stylesforbutn?: object;
    content?: React.ReactNode;
    disabled?: boolean;
}

const { width: Zxcvbnmlkjhgf, height: Poiuytrewqlkj } = Uioplkjhgfds.get('window');

const BirnutreKnoptanWodr: React.FC<EnusiUniqbuttnProps> = ({
    onPress,
    disabled = false, proptext, stylesforbutn = {},
}) => {

    return (
        <Vbnmlkjhgfdsa activeOpacity={0.8} onPress={onPress}
            style={[
                {
                    justifyContent: 'center',
                    borderRadius: Zxcvbnmlkjhgf * 0.035, alignItems: 'center', width: Zxcvbnmlkjhgf * 0.91, backgroundColor: '#DFD800',
                    overflow: 'hidden',
                    height: Poiuytrewqlkj * 0.079,
                    alignSelf: 'center',
                }, stylesforbutn,
            ]}
        >
            <Xswedcvfrtgbn style={[{
                textAlign: 'center', color: '#091427', fontSize: Asdfghjklqwer * 0.05,
                fontFamily: fitrefonts.fitSanSB,
            },]} >
                {proptext}
            </Xswedcvfrtgbn>
        </Vbnmlkjhgfdsa>
    );
};

export default BirnutreKnoptanWodr;