import React, { useRef, useState } from 'react';
import colors from '../constants/theme';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';

const slides = [
    {
      id: '1',
      image: require('../../assets/images/podcast.png'),
      title: 'Welcome to SportsRadioInfo',
      description: 'Your ultimate destination for live sports updates, news, and commentary. ',
    },
    {
      id: '2',
      image: require('../../assets/images/radio.png'),
      title: 'Live Sports Coverage',
      description: 'Stay connected to your favorite sports, anytime, anywhere.',
    },
    {
        id: '3',
        image: require('../../assets/images/news.png'),
        title: 'Daily News Reports',
        description: 'Stay informed with our daily news reports covering top sports stories and event highlight.',
      },
      
    
  ];
  

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      flatListRef.current.scrollToIndex({ index: newIndex });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
          setCurrentIndex(index);
        }}
        ref={flatListRef}
      />
      
      {/* Dots for the slides */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index ? styles.activeDot : styles.inactiveDot]}
          />
        ))}
      </View>
      
      {/* Static View with Text and Get Started Button */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Ready to get started?</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:20,
    backgroundColor:colors.colors.white
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  image: {
    width: '100%',
    height: 250, // Set your preferred height
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize:18,

  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color:colors.colors.black,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor:colors.colors.primary,
    width: 15, // Active dot is wider
  },
  inactiveDot: {
    backgroundColor: '#e0e0e0',
  },
  footer: {
    alignItems: 'center',
    height: height / 5,
    width:width,
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    justifyContent: 'center',
    marginTop: 10,
    paddingBottom: 60,
    backgroundColor: '#fff', // Set a background color
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
      },
      android: {
        elevation: 5, // Control the shadow elevation on Android
      },
    }),
  },
  footerText: {
    marginBottom: 15,
    textAlign: 'center',
    
  },
  button: {
    backgroundColor: colors.colors.primary,
    paddingHorizontal:30,
    padding: 15,
    borderRadius: 50,
    width:200,
   alignItems:'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
