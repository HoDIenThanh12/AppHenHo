import React from 'react'
import { Dimensions, Text, Platform, PixelRatio, StatusBar } from 'react-native'
const MYWIDTH = Dimensions.get('window').width
const MYHEIGHT = Dimensions.get('window').height
export const width = num => PixelRatio.roundToNearestPixel(MYWIDTH * (num / 100))
export const height = num => PixelRatio.roundToNearestPixel(MYHEIGHT * (num / 100))