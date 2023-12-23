import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/theme'

const TopMovieCard = (props:any) => {
  return (
      <TouchableOpacity onPress={() => props.cardFunction()}>
        <View style={[styles.container,
            props.shouldMarginatedAtEnd? props.isFirst? {marginLeft:SPACING.space_36} 
            : props.isLast ? {marginRight:SPACING.space_36}:{} : {},props.shoudMarginatedAround ? {margin:SPACING.space_12} : {},{maxWidth:props.cardWidth},]}>
            <Image 
            style={[styles.cardIMG,{width:props.cardWidth}]}
            source={{uri:props.imagePath}}/>
            <Text numberOfLines={1} style={styles.textTitle}>{props.title}</Text>
        </View>
      </TouchableOpacity>
  )
}

export default TopMovieCard;

const styles = StyleSheet.create({
    container  : {
        display : 'flex',
        flex : 1,
        backgroundColor:COLORS.Black,
    },
    cardIMG : {
        aspectRatio: 2/3,
        borderRadius : BORDERRADIUS.radius_20,
       
        
    },
    textTitle : {
        fontFamily :FONTFAMILY.poppins_regular,
        fontSize : FONTSIZE.size_14,
        color : COLORS.White,
        textAlign:'center',
        paddingVertical : SPACING.space_10,
    }
})