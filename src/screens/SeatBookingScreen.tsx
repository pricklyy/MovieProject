import { FlatList, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import CustomIcon from '../components/CustomIcon';
import { FadeFromBottomAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import EncryptedStorage from 'react-native-encrypted-storage';


const timeArray : string[] = [
  "10:30","12:30","14:30","15:00","18:00","19:30","21:00","23:45","1:30"
];

const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let weekdays = [];
  for(let i = 0 ; i< 7;i++) {
    let tempDate = {
      date:new Date(date.getTime() +  i  *24*60*60*1000).getDate(),
      day:weekday[new Date(date.getTime() +  i  *24*60*60*1000).getDay()],
    }
    weekdays.push(tempDate);
  }
  return weekdays;
}

  const generateSeats = () => {
    let numRow = 10;
    let numColumn = 3;
    let rowArray = [];
    let start  = 1;
    let reachnine = false;

    for(let  i =0; i<numRow;i++) {
      let columnArray =[];
      for(let j = 0;j<numColumn;j++) {
        let seatObject = {
          number :start,
          taken : Boolean(Math.round(Math.random())),
          selected : false,
        }
        columnArray.push(seatObject);
        start++;
      }
      if(i==3) {
        numColumn +=4;
      }
      if(numColumn < 11 && !reachnine) {
        numColumn +=4;
      } else {
        reachnine=true;
        numColumn -=2;
      }
      rowArray.push(columnArray);
    }
    return rowArray;
  }
const SeatBookingScreen = ({navigation,route} :any) => {
  const [dateArray,setDateArray]  = useState<any[]>(generateDate());
  const [selectedDateIndex,setSelectedDateIndex] = useState<any>();
  const [price,setPrice] = useState<number>(0);
  const [twoSeatArray,setTwoSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray,setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex,setSelectedTimeIndex] = useState<any>();

  const selectSeat = (index:number,subindex:number,num:number) => {
    if(!twoSeatArray[index][subindex].taken) {
      let array :any = [...selectedSeatArray];
      let temp = [...twoSeatArray];
      temp[index][subindex].selected = !temp[index][subindex].selected;
      if(!array.includes(num)) {
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempIndex = array.indexOf(num);
        if(tempIndex > -1) {
          array.splice(tempIndex,1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 10.0);
      setTwoSeatArray(temp);
    }
  }

  const bookSeat = async () => {
    if(setSelectedSeatArray.length !==0 && timeArray[selectedTimeIndex] !== undefined && dateArray[selectedDateIndex] !== undefined) {
      try {
        await EncryptedStorage.setItem('ticket',JSON.stringify({
          seatArray : selectedSeatArray,
          time : timeArray[selectedTimeIndex],
          date : dateArray[selectedDateIndex],
          ticketImage : route.params.PosterImage,
        }))
      } catch (error) {
        console.log(error);
      }
      navigation.navigate('Ticket',{
        seatArray : selectedSeatArray,
            time : timeArray[selectedTimeIndex],
            date : dateArray[selectedDateIndex],
            ticketImage : route.params.PosterImage,
      }) 
    } else {
      ToastAndroid.showWithGravity("Please Select Seats ,Date, Time of the Show",ToastAndroid.SHORT,ToastAndroid.BOTTOM);
    }
    
  }
  return (
    <ScrollView style={styles.container}
    bounces={false} showsVerticalScrollIndicator={false}
    >
      <StatusBar hidden />
      <View>
        <ImageBackground source={{uri:route.params?.bgImage}} style={styles.ImageBg}>
          <LinearGradient colors={[COLORS.BlackRGB10,COLORS.Black]} style={styles.linearGradient} >
          <View style={styles.appHeaderContainer}>
          <AppHeader name="close" header={''} action={() => navigation.goBack()} />
        </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.screenText}>Screen this side</Text>
      </View>
      <View style={styles.seatContainer}>
        <View style={styles.containerGap}>
          {
            twoSeatArray?.map((item,index)=> {
              return <View key={index} style={styles.seatRow}>
                  {item?.map((subitem,subindex) => {
                    return <TouchableOpacity key={subitem.number} onPress={(() => {
                      selectSeat(index,subindex,subitem.number);
                    })}>
                      <CustomIcon name='seat' style={[styles.seatIcon,subitem.taken ? {color:COLORS.Grey} : {},
                      subitem.selected ? {color:COLORS.Red} : {}
                      ]} />
                    </TouchableOpacity>
                  })}
                </View>
              
            })
          }
        </View>

        <View style={styles.seatCheckedContainer}>
          <View style={styles.seatChecked}>
            <CustomIcon name='radio' style={styles.radioIcon}/>
            <Text style={styles.radioText}>Avaiable</Text>
          </View>

          <View style={styles.seatChecked}>
            <CustomIcon name='radio' style={[styles.radioIcon,{color:COLORS.Grey}]}/>
            <Text style={styles.radioText}>Taken</Text>
          </View>

          <View style={styles.seatChecked}>
            <CustomIcon name='radio' style={[styles.radioIcon,{color:COLORS.Red}]}/>
            <Text style={styles.radioText}>Selected</Text>
          </View>
        </View>
        </View> 


        <View>
          <FlatList data={dateArray} keyExtractor={item => item.date} horizontal
          contentContainerStyle={styles.containerGap24} bounces={false}
          renderItem={({item,index}) => {
            return <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
              <View style={[styles.dateContainer,index == 0 ? {marginLeft:SPACING.space_24}: index == dateArray.length - 1? {marginRight:SPACING.space_24}: {},index == selectedDateIndex ?  {backgroundColor:COLORS.Red} :{},]}>

                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.dayText}>{item.day}</Text>
              </View>
            </TouchableOpacity>
          }}
          />
        </View>

        
        <View style={styles.OuterContainer}>
          <FlatList data={timeArray} keyExtractor={item => item} horizontal
          contentContainerStyle={styles.containerGap24} bounces={false}
          renderItem={({item,index}) => {
            return <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
              <View style={[styles.timeContainer,index == 0 ? {marginLeft:SPACING.space_24}: index == dateArray.length - 1? {marginRight:SPACING.space_24}: {},index == selectedTimeIndex ?  {backgroundColor:COLORS.Red} :{},]}>

                <Text style={styles.timeText}>{item}</Text>
                
              </View>
            </TouchableOpacity>
          }}
          />
        </View>

        <View style={styles.buttonPriceContainer}>
          <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text  style={styles.price}>$ {price}.00</Text>
          </View>
          <TouchableOpacity onPress={bookSeat}>
            <Text style={styles.buttonText}>Buy Tickets</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

export default SeatBookingScreen

const styles = StyleSheet.create({
  container : {
    display : 'flex',
    flex : 1,
    backgroundColor : COLORS.Black,
  },
  ImageBg : {
    width: '100%',
    aspectRatio: 3072/1727,
  },
  linearGradient : {
    height : '100%',
  },
  appHeaderContainer : {
    marginHorizontal : SPACING.space_36,
    marginTop : SPACING.space_20 * 2,
  },
  screenText: {
    textAlign : 'center',
    fontFamily : FONTFAMILY.poppins_regular,
    fontSize : FONTSIZE.size_10,
    color:COLORS.WhiteRGBA15,
  },
  seatContainer :{
    marginVertical : SPACING.space_20,
  },
  containerGap : {
    gap: SPACING.space_20,
  },
  seatRow : {
    flexDirection: 'row',
    gap:SPACING.space_20,
    justifyContent : 'center',
  },
  seatIcon : {
    fontSize : FONTSIZE.size_24,
    color: COLORS.White,
  },
  seatCheckedContainer :{
    marginVertical : SPACING.space_20,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent  : 'space-evenly',
  },
  seatChecked : {
    flexDirection : 'row',
    gap : SPACING.space_10,
    alignItems:'center',    
  },
  radioIcon : {
    fontSize : FONTSIZE.size_20,
    color:COLORS.White,
  },
  radioText : {
    fontFamily : FONTFAMILY.poppins_medium,
    fontSize : FONTSIZE.size_12,
    color :COLORS.White,
  },
  containerGap24 : {
    gap:SPACING.space_24,
  },
  dateContainer : {
      width: SPACING.space_10*7,
      height : SPACING.space_10 * 10,
      borderRadius :SPACING.space_10 * 10,
      backgroundColor : COLORS.WhiteRGBA15,
      alignItems : 'center',
      justifyContent : 'center',
  },
  dateText : {
    fontFamily : FONTFAMILY.poppins_medium,
    fontSize : FONTSIZE.size_24,
    color: COLORS.White,
  },
  dayText : {
    fontFamily : FONTFAMILY.poppins_regular,
    fontSize : FONTSIZE.size_12,
    color: COLORS.White,
  },
  timeContainer : {
    paddingVertical:SPACING.space_10,
    borderWidth : 1,
    borderColor : COLORS.WhiteRGBA50,
    paddingHorizontal : SPACING.space_20,
    borderRadius:BORDERRADIUS.radius_25,
    backgroundColor : COLORS.WhiteRGBA15,
    alignItems:'center',
    justifyContent:'center',
  },
  timeText : {
    fontFamily:FONTFAMILY.poppins_regular,
    fontSize:FONTSIZE.size_14,
    color:COLORS.White,
  },
  OuterContainer : {
    marginVertical  :SPACING.space_24,
  },
  buttonPriceContainer : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    paddingHorizontal : SPACING.space_24,
    paddingBottom : SPACING.space_24,

  },
  priceContainer : {
    alignItems: 'center',
  },
  totalPriceText : {
    fontFamily : FONTFAMILY.poppins_regular,
    fontSize:FONTSIZE.size_14,
    color:COLORS.WhiteRGBA32,
  },
  price : {
    fontFamily : FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_24,
    color:COLORS.White,
  },
  buttonText : {
    borderRadius : BORDERRADIUS.radius_25,
    paddingHorizontal: SPACING.space_24,
    paddingVertical : SPACING.space_10,
    fontFamily : FONTFAMILY.poppins_semibold,
    fontSize : FONTSIZE.size_16,
    color:COLORS.White,
    backgroundColor:COLORS.Red,
  }
})