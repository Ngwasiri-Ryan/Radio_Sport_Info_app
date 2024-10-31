import { StyleSheet, Text, View,Image, Dimensions, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import icons from '../constants/icons';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';

const RadioScreen = () => {
    
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    
    const playRadio = async () => {
        try {
            if (sound) {
                await sound.unloadAsync();
            }
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: 'https://uk7freenew.listen2myradio.com/live.mp3?typeportmount=s1_9828_stream_341098915' },
                { shouldPlay: true }
            );
            setSound(newSound);
            setIsPlaying(true);
            console.log("Radio is playing:", isPlaying); // Log play status
            newSound.setOnPlaybackStatusUpdate((status) => {
                if (!status.isPlaying) {
                    setIsPlaying(false);
                    console.log("Radio stopped playing."); // Log stop status
                }
            });
        } catch (error) {
            if (error.message.includes('503')) {
                setShowErrorModal(true);
            } else {
                console.error('Failed to play radio:', error);
            }
        }
    };
    
    const stopRadio = async () => {
        try {
            if (sound) {
                await sound.stopAsync();
                setIsPlaying(false);
                console.log("Radio is stopped:", isPlaying); // Log stop status
            }
        } catch (error) {
            console.error('Failed to stop radio:', error);
        }
    };
    



      const shareMessage = async () => {
        try {
          const message = 'https://bit.ly/3wTZX1R';
          const result = await Share.share({
            message: message + (audioLocation ? `\nRecorded Audio: ${audioLocation}` : ''),
          });
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              console.log('Shared successfully');
            } else {
              console.log('Shared');
            }
          } else if (result.action === Share.dismissedAction) {
            console.log('Dismissed');
          }
        } catch (error) {
          console.error('Error sharing:', error.message);
        }
      };
    
    

  return (
    <View style={styles.container}>
         <Image 
        source={icons.back} 
        style={styles.topLeftImage} 
      />
     
   <View style={styles.box}>
       <Image
        source={icons.logo}
        style={styles.logo}
      />
      <Text style={styles.title}>RadioSportInfo</Text>
      <Text>FM 92.3</Text>
   </View>
    <View style={styles.imagesContainer}>
        <TouchableOpacity>
        <Image source={icons.stop} style={styles.image} />
        </TouchableOpacity>
     
     <TouchableOpacity  onPress={isPlaying ? stopRadio : playRadio}>
     <Image source={ isPlaying ? icons.play : icons.pause} style={styles.image} />
     </TouchableOpacity>
      
      <TouchableOpacity onPress={shareMessage}>
      <Image source={icons.share} style={styles.image}  />
      </TouchableOpacity>
     
    </View>
  </View>
  )
}

export default RadioScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      justifyContent: 'center',
      alignItems: 'center',
      gap:40,
    },
    topLeftImage: {
        position: 'absolute',
        top: 60,
        left: 20,
        width: 30,
        height: 30,
        tintColor: '#ff0000', // Sets the color to red
        resizeMode: 'contain',
      },

    box: {
        width: '80%', // Adjusted width to make the shadow more visible
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 20, // Adds spacing around the images
        backgroundColor: '#fff', // Required for shadow on iOS
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8, // Adds shadow for Android
    }, 
    imagesContainer: {
        width: '80%', // Adjusted width to make the shadow more visible
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 20, // Adds spacing around the images
        backgroundColor: '#fff', // Required for shadow on iOS
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8, // Adds shadow for Android
    }, 
    image: {
      width: 20, 
      height: 20,
    },
    logo:{
        borderRadius:20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
      },
  });
  