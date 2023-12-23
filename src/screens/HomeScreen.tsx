import { ActivityIndicator, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { upcomingMovies,nowPlayingMovies,popularMovies, searchMovies, baseImagePath } from '../api/ApiCall'
import { COLORS, SPACING } from '../themes/theme';
import InputHeader from '../components/InputHeader';
import CategoryHome from '../components/CategoryHome';
import MovieCard from '../components/MovieCard';
import TopMovieCard from '../components/TopMovieCard';


const {width,height} = Dimensions.get('window');

const getNowPlayingMovieList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.log("",error);
  }
}

const getUpComingMovieList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.log("",error);
  }
}

const getPopularMovieList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.log("",error);
  }
}
const HomeScreen = ({navigation}:any) => {

  const [nowPlayingMoviesList,setNowPlayingMovieList] = useState<any>(undefined);
  const [popularMoviesList,setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList,setUpComingMoviesList] = useState<any> (undefined);

  useEffect(()=> {
    (async() => {
      let tempNowPlaying = await getNowPlayingMovieList();
      setNowPlayingMovieList([{id:'dummy1'},...tempNowPlaying.results,{id:'dummy2'}]);

      let tempPopular = await getPopularMovieList();
      setPopularMoviesList(tempPopular.results);

      let tempUpComing = await getUpComingMovieList();
      setUpComingMoviesList(tempUpComing.results);

      
    })();
  },[])

  
 
  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  }

  

  if(nowPlayingMoviesList == undefined &&
     nowPlayingMoviesList == null && 
     popularMoviesList == undefined && 
     popularMoviesList == null &&
      upcomingMoviesList == undefined && 
      upcomingMoviesList == null ) {
    return (
      <ScrollView style={styles.container} bounces={false} contentContainerStyle={styles.ScrollViewContainer}>
        <StatusBar hidden />

        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction}/>
        </View>
        <View style={styles.loading}>
        <ActivityIndicator size={'large'}  color={COLORS.Red}/>
        </View>
        
      </ScrollView>
    )

  }
  return (
    <ScrollView style={styles.container} bounces={false} >
        <StatusBar hidden />

        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction}/>
        </View>
        
        <CategoryHome title={'Now Playing'} />
        <FlatList data={nowPlayingMoviesList} keyExtractor={(item:any) =>item.id} bounces={false} showsHorizontalScrollIndicator={false}
        horizontal contentContainerStyle={styles.containerGap36} snapToInterval={width*0.7 +SPACING.space_36} 
        decelerationRate={0} // vuot lan luot tung item
        renderItem={({item,index}) => {
          if(!item.original_title) {
            return(
              <View style={{width:(width-(width*0.7 + SPACING.space_36 *2)) /2 }}></View>
            )
          }
          return(
        <MovieCard  shouldMarginatedAtEnd={true} cardFunction={() =>{
          navigation.push('MovieDetail',{movieid:item.id})
        }} cardWidth= {width*0.7} isFirst={index == 0 ? true:false} 
          isLast={index == upcomingMoviesList?.length - 1? true: false}
        title={item.original_title} imagePath={baseImagePath('w780',item.poster_path)}
        genre={item.genre_ids.slice(1,4)} vote_average={item.vote_average}
        vote_count = {item.vote_count}
        />)
        
        }}/>


        <CategoryHome title={'Popular'} />
        <FlatList data={popularMoviesList} keyExtractor={(item:any) =>item.id} 
        horizontal contentContainerStyle={styles.containerGap36} bounces={false} showsHorizontalScrollIndicator={false}
        renderItem={({item,index}) => <TopMovieCard  shouldMarginatedAtEnd={true} cardFunction={() =>{
          navigation.push('MovieDetail',{movieid:item.id})
        }} cardWidth= {width / 3} isFirst={index == 0 ? true:false} 
          isLast={index == upcomingMoviesList?.length - 1? true: false}
        title={item.original_title} imagePath={baseImagePath('w342',item.poster_path)}
        
        />}/>


        <CategoryHome title={'Upcoming'} />
        <FlatList data={upcomingMoviesList} keyExtractor={(item:any) =>item.id} 
        horizontal contentContainerStyle={styles.containerGap36} bounces={false} showsHorizontalScrollIndicator={false}
        renderItem={({item,index}) => <TopMovieCard  shouldMarginatedAtEnd={true} cardFunction={() =>{
          navigation.push('MovieDetail',{movieid:item.id})
        }} cardWidth= {width / 3} isFirst={index == 0 ? true:false} 
          isLast={index == upcomingMoviesList?.length - 1? true: false}
        title={item.original_title} imagePath={baseImagePath('w342',item.poster_path)}/>}/>
      </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container  : {
    display:'flex',
    backgroundColor:COLORS.Black,
  } ,
  ScrollViewContainer : {
    flex : 1,
  },
  loading : {
    flex : 1,
    alignItems:'center',
    justifyContent:'center',
  },
  InputHeaderContainer : {
    marginHorizontal:SPACING.space_36,
    marginTop : SPACING.space_28,
  },
  containerGap36 : {
    gap : SPACING.space_36,
  }
})