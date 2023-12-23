import { Dimensions, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SPACING } from '../themes/theme'
import { baseImagePath, searchMovies } from '../api/ApiCall';
import InputHeader from '../components/InputHeader';
import TopMovieCard from '../components/TopMovieCard';


const {width,height} = Dimensions.get('screen');
const SearchScreen = ({navigation} :any) => {
  const [searchList,setSearchList] = useState([]);
  const searchMovieFunction = async (name:string) => {
    try {
      let response = await fetch(searchMovies(name));
      let json =  await response.json();
      setSearchList(json.results);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
      <FlatList data={searchList} keyExtractor={(item:any) =>item.id} 
          bounces={false} numColumns={2}
          showsVerticalScrollIndicator={false} 
         ListHeaderComponent={
          <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMovieFunction}/>
        </View>
         }
         contentContainerStyle={styles.centerContainer}
        renderItem={({item,index}) => <TopMovieCard  shouldMarginatedAtEnd={false} shouldMarginatedAround={true} cardFunction={() =>{
          navigation.push('MovieDetail',{movieid:item.id})
        }} cardWidth= {width / 2 - SPACING.space_12*2} 
        title={item.original_title} imagePath={baseImagePath('w342',item.poster_path)}
        
        />}/>
      </View>
      
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container : {
    display: 'flex',
    flex : 1,
    width,
    alignItems: 'center',
    backgroundColor:COLORS.Black,
  },
  InputHeaderContainer : {
    display: 'flex',
    marginHorizontal:SPACING.space_36,
    marginTop : SPACING.space_28,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  centerContainer : {
    alignItems:'center',
    
  },
  
})