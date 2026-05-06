import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
type GradintNirburRuftisProps = {
  style?: StyleProp<ViewStyle>;
};

export const GradintNirburRuftis: React.FC<GradintNirburRuftisProps> = ({ style }) => (
  <LinearGradient 
  colors={['#78ff42', '#43f602']}
  end={{x: 0.5, y: 1}}
  start={{x: 0.5, y: 0}}
    style={[ {
      top: 0,
      position: 'absolute',
      right: 0,
       bottom: 0, 
        left: 0,
    }, style]}
  />
);
