import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { baseImagePath, movieCastDetails, movieDetails } from '../api/ApiCall'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../themes/theme';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import CategoryHome from '../components/CategoryHome';
import ActorCard from '../components/ActorCard';


const getMovieDetail = async (movieid: number) => {

  try {
    let response = await fetch(movieDetails(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

const getMovieCastDetail = async (movieid: number) => {
  try {
    let response = await fetch(movieCastDetails(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}
const MovieDetail = ({ navigation, route }: any) => {
  const [movieData, setMovieData] = useState<any>(undefined);
  const [movieCastData, setMovieCastData] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const tempMovieData = await getMovieDetail(route.params.movieid);
      setMovieData(tempMovieData);
    })();

    (async () => {
      const tempMovieCastData = await getMovieCastDetail(route.params.movieid);
      setMovieCastData(tempMovieCastData.cast);
    })();
  }, [])

  if (movieData == undefined && movieData == null && movieCastData == undefined && movieCastData == null) {
    return (

      <ScrollView style={styles.container} bounces={false} contentContainerStyle={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
      >

        <View style={styles.appHeaderContainer}>
          <AppHeader name="close" header={''} action={() => navigation.goBack()} />
        </View>
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} color={COLORS.Red} />
        </View>
      </ScrollView>

    )
  }
  return (
    <ScrollView style={styles.container} bounces={false} 
    showsVerticalScrollIndicator={false}
    >

      <StatusBar  hidden/>
      <View>
        <ImageBackground source={{uri:baseImagePath('w780',movieData?.backdrop_path)}} style={styles.imageBg}>
          <LinearGradient colors={[COLORS.BlackRGB10,COLORS.Black]} style={styles.linearGradient}>
          <View style={styles.appHeaderContainer}>
          <AppHeader name="close" header={''} action={() => navigation.goBack()} />
        </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imageBg}></View>
          <Image source={{uri:baseImagePath('w342',movieData?.poster_path)}} style={styles.cardImage} />
        </View>
        <View style={styles.timeContainer}>
          <CustomIcon name='clock' style={styles.clockIcon} />
          <Text style={styles.runTimeText}>{Math.floor(movieData?.runtime / 60)}h{''}{Math.floor(movieData?.runtime % 60)}'</Text>
      </View>

      <View>
        <Text style={styles.title}>{movieData?.original_title}</Text>
        <View style={styles.genreContainer}>{movieData?.genres.map((item:any) => {
          return (
            <View style={styles.genreBox} key={item.id}>
            <Text style={styles.genreText}>{item.name}</Text>
          </View>
          )
          
        })}
        </View>
        <Text style={styles.tagline}>{movieData?.tagline}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <CustomIcon name='star' style={styles.starIcon} />
          <Text style={styles.runTimeText}>
            {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
          </Text>
          <Text style={styles.runTimeText}>{movieData?.release_date.substring(8,10)}{' '}{new Date(movieData?.release_date).toLocaleString('default',{
            month:'long',
          })}{' '}{movieData?.release_date.substring(0,4)}</Text>
        </View>
        <Text style={styles.overviewText}>{movieData?.overview}</Text>
      </View>

        
      <View>
        <CategoryHome title="Actors" />
        <FlatList  data={movieCastData} keyExtractor={(item:any)=>item.id} horizontal contentContainerStyle={styles.containerGap}
        renderItem={({item,index}) =>(
          <ActorCard shouldMarginatedAtEnd={true} cardWidth={80} isFirst={index == 0 ? true : false} 
          isLast={index == movieCastData?.length - 1 ? true : false} imagePath={baseImagePath('w185',item.profile_path)}
          title={item.original_name} subtitle={item.character}
           />
        )}
        />

        <View>
          <TouchableOpacity style={styles.buttonSelect} onPress={() => {
            navigation.push('SeatBooking',{bgImage:baseImagePath('w780',movieData.backdrop_path),
            PosterImage:baseImagePath('original',movieData.poster_path)})
          }}>
            <Text style={styles.buttonText}>Select Seats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default MovieDetail

const styles = StyleSheet.create({
  container : {
    display : 'flex',
    flex : 1,
    backgroundColor:COLORS.Black,
  },
  loading : {
    flex : 1,
    alignItems:'center',
    justifyContent:'center',
  },
  scrollViewContainer :{
    flex: 1,
  },
  appHeaderContainer : {
    marginHorizontal : SPACING.space_36,
    marginTop : SPACING.space_20 * 2,
  },
  imageBg : {
    width : '100%',
    aspectRatio: 3072/1727,
  },
  linearGradient : {
    height : '100%',
  },
  cardImage : {
    width: '60%',
    aspectRatio:200/300,
    position : 'absolute',
    bottom:0,
    alignSelf : 'center',
    borderRadius:BORDERRADIUS.radius_25
  },
  clockIcon : {
    fontSize : FONTSIZE.size_20,
    color : COLORS.WhiteRGBA50,
    marginRight : SPACING.space_8,
  },
  timeContainer : {
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems:'center',
    paddingTop  : SPACING.space_15,
  },
  runTimeText : {
    fontFamily  :FONTFAMILY.poppins_medium,
    fontSize : FONTSIZE.size_14,
    color  :COLORS.White,
  },
  title : {
    fontSize :FONTSIZE.size_24,
    fontFamily  :FONTFAMILY.poppins_semibold,
    color:COLORS.White,
    marginHorizontal : SPACING.space_36,
    marginVertical : SPACING.space_15,
    textAlign:'center',
  },
  genreContainer  : {
    flex: 1,
    flexDirection: 'row',
    gap:SPACING.space_20,
    flexWrap : 'wrap',
    justifyContent : 'center',
  },
  genreBox : {
    borderColor : COLORS.WhiteRGBA50,
    borderWidth : 1,
    paddingHorizontal : SPACING.space_10,
    paddingVertical : SPACING.space_4,
    borderRadius : BORDERRADIUS.radius_25,
  },
  genreText : {
    fontFamily : FONTFAMILY.poppins_regular,
    fontSize : FONTSIZE.size_10,
    color : COLORS.WhiteRGBA75,
  },
  tagline : {
    fontFamily:FONTFAMILY.poppins_thin,
    fontSize : FONTSIZE.size_14,
    fontStyle : 'italic',
    color:COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical : SPACING.space_15,
    textAlign  : 'center',
  },
  infoContainer : {
    marginHorizontal:SPACING.space_24
  },
  rateContainer : {
    flexDirection : 'row',
    gap : SPACING.space_10,
    alignItems:'center'
  },
  starIcon : {
    fontSize : FONTSIZE.size_20,
    color:COLORS.Yellow,
  },
  overviewText : {
      fontFamily :FONTFAMILY.poppins_light,
      fontSize:FONTSIZE.size_14,
      color:COLORS.White,
  },
  containerGap: {
    gap:SPACING.space_24,
  },
  buttonSelect : {
    alignItems : 'center',
    marginVertical: SPACING.space_24,
  },
  buttonText:  {
    borderRadius :BORDERRADIUS.radius_25*2,
    paddingHorizontal :SPACING.space_24,
    paddingVertical :SPACING.space_10,
    backgroundColor:COLORS.Red,
    fontFamily : FONTFAMILY.poppins_medium,
    fontSize  :FONTSIZE.size_14,
    color:COLORS.White,
  }
})