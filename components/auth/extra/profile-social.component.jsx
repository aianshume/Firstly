var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
export const ProfileSocial = (props) => {
    const { style, hint, value } = props, viewProps = __rest(props, ["style", "hint", "value"]);
    return (React.createElement(View, Object.assign({}, viewProps, { style: [styles.container, style] }),
        React.createElement(Text, { category: 's2' }, value),
        React.createElement(Text, { appearance: 'hint', category: 'c2' }, props.hint)));
};
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});