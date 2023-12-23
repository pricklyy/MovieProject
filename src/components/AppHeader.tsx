import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomIcon from './CustomIcon'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/theme'

const AppHeader = (props:any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBg} onPress={() => props.action()}>
        <CustomIcon name={props.name} style={styles.IconStyle}/>
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.header}</Text>
      <View style={styles.emptyContainer}></View>
    </View>
  )
}

export default AppHeader

const styles = StyleSheet.create({
    container:  {
     
        flexDirection: 'row',
        alignItems:'center',
        justifyContent  :'center',
    },
    IconStyle : {
        color : COLORS.White,
        fontSize:FONTSIZE.size_24,
    },
    headerText: {
        flex : 1,
        fontFamily : FONTFAMILY.poppins_medium,
        fontSize :FONTSIZE.size_20,
        textAlign : 'center',
        color:COLORS.White,
    },
    emptyContainer :{
        height: SPACING.space_20 *2,
        width :SPACING.space_20 *2,
    },
    iconBg : {
        height : SPACING.space_20*2,
        width : SPACING.space_20*2,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius  : BORDERRADIUS.radius_20,
        backgroundColor:COLORS.WhiteRGBA32,
    }
})