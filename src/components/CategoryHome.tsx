import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/theme'

const CategoryHome = (props:any) => {
  return (
    <Text style={styles.text}>{props.title}</Text>
  )
}

export default CategoryHome

const styles = StyleSheet.create({
    text : {
        fontFamily : FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color : COLORS.White,
        paddingHorizontal : SPACING.space_36,
        paddingVertical : SPACING.space_28,
    }
})