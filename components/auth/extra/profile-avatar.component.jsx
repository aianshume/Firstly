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
import { Avatar } from '@ui-kitten/components';
export const ProfileAvatar = (props) => {
  const renderEditButtonElement = () => {
    const buttonElement = props.editButton();
    return React.cloneElement(buttonElement, {
      style: [buttonElement.props.style, styles.editButton],
    });
  };
  const { style, editButton } = props, restProps = __rest(props, ["style", "editButton"]);
  return (React.createElement(View, { style: style },
    React.createElement(Avatar, Object.assign({ style: [style, styles.avatar] }, restProps)),
    editButton && renderEditButtonElement()));
};
const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
  },
  editButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
  },
});