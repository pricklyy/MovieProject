import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/theme'

const ActorCard = (props:any) => {
  return (
    <View style={[styles.container,props.shouldMarginatedAtEnd ? props.isFirst? {marginLeft:SPACING.space_24}: props.isLast?{marginRight:SPACING.space_24} :{}:{},{maxWidth:props.cardWidth}]}>
      <Image  source={{uri:props.imagePath}} style={[styles.cardImg,{width:props.cardWidth}]}/>
        <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{props.subtitle}</Text>
    </View>
  )
}

export default ActorCard

const styles = StyleSheet.create({
    container: {
        alignItems:'center'
    },
    cardImg : {
        aspectRatio : 1920/2880,
        borderRadius : BORDERRADIUS.radius_25 * 4,
    },
    title : {
        alignSelf : 'stretch',
        fontFamily : FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color:COLORS.White
    },
    subtitle : {
        alignSelf : 'stretch',
        fontFamily : FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color:COLORS.White
    }
})