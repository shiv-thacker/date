import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import {AuthContext} from '../AuthContext';
import {useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HingeX = () => {
  const planss = [
    {
      id: '0',
      plan: '1 week',
      price: '1199.00/wk',
      name: 'New',
    },
    {
      id: '1',
      plan: '1 month',
      price: '2499.00/wk',
      name: 'Save 51%',
    },
    {
      id: '2',
      plan: '3 months',
      price: '1666.33/wk',
      name: 'Save 70%',
    },
    {
      id: '3',
      plan: '6 months',
      price: '1933.33/wk',
      name: 'Save 77%',
    },
  ];
  const [plan, setPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {userId} = useContext(AuthContext);
  const navigation = useNavigation();

  const pay = async () => {
    try {
      setIsLoading(true);
      const options = {
        description: 'Adding To Wallet',
        currency: 'INR',
        name: 'Hinge',
        key: 'rzp_test_E3GWYimxN7YMk8',
        amount: plan?.price.split('/')[0] * 100,
        prefill: {
          email: 'void@razorpay.com',
          contact: '9191919191',
          name: 'RazorPay Software',
        },
        theme: {color: '#900C3F'},
      };

      const data = await RazorpayCheckout.open(options);

      const type = 'Hinge X';
      const token = await AsyncStorage.getItem('token');

      const response = await axios.post(
        `${BASE_URL}/subscribe`,
        {
          userId,
          plan,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status == 200) {
        Alert.alert('Success', 'You have been subscribed to Hinge X', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      } else {
        console.log('Error creating order', response.data);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };
  return (
    <>
      <ScrollView>
        <View style={{flex: 1, backgroundColor: '#181818', padding: 12}}>
          <View>
            <ImageBackground
              style={{width: '100%', height: 200, borderRadius: 10}}
              imageStyle={{borderRadius: 10, marginTop: 10, opacity: 0.9}}
              source={{
                uri: 'https://images.pexels.com/photos/6265422/pexels-photo-6265422.jpeg?auto=compress&cs=tinysrgb&w=800',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    color: 'white',
                    fontWeight: 'bold',
                    width: 280,
                    textAlign: 'center',
                  }}>
                  Get noticed sooner and go on 3X as many dates
                </Text>
              </View>
            </ImageBackground>

            <View style={{marginTop: 25}}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {planss?.map((item, index) => (
                  <Pressable
                    onPress={() => setPlan(item)}
                    style={{marginRight: 10}}>
                    <View
                      style={{
                        backgroundColor:
                          plan?.name == item?.name ? 'white' : '#484848',
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: plan?.name == item?.name ? 'black' : 'white',
                          fontWeight: '500',
                        }}>
                        {item?.name}
                      </Text>
                    </View>

                    <View
                      style={{
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#101010',
                        borderColor:
                          plan?.name == item?.name ? 'white' : '#484848',
                        borderWidth: 2,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}>
                      <Text style={{color: '#D8D8D8', fontSize: 15}}>
                        {item?.plan}
                      </Text>

                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: '600',
                          marginTop: 8,
                          letterSpacing: 0.6,
                          color: 'white',
                        }}>
                        {item?.price}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <View style={{marginTop: 20}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <View>
                  <Image
                    style={{width: 70, height: 70, borderRadius: 35}}
                    source={{
                      uri: 'https://www.instagram.com/p/C-ApDZLyrBh/media/?size=l',
                    }}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '600',
                      marginTop: 8,
                      letterSpacing: 0.6,
                      color: 'white',
                    }}>
                    Skip the line
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '400',
                      marginTop: 8,
                      letterSpacing: 0.6,
                      color: 'gray',
                      width: '90%',
                    }}>
                    Get recommended to matches sooner
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderColor: '#808080',
                  borderWidth: 0.3,
                  marginVertical: 20,
                }}
              />

              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <View>
                  <Image
                    style={{width: 70, height: 70, borderRadius: 35}}
                    source={{
                      uri: 'https://www.instagram.com/p/CGm4TXAFPBw/media/?size=l',
                    }}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '600',
                      marginTop: 8,
                      letterSpacing: 0.6,
                      color: 'white',
                    }}>
                    Enhanced recommendations
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '400',
                      marginTop: 8,
                      letterSpacing: 0.6,
                      color: 'gray',
                      width: '90%',
                    }}>
                    Access to your type
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderColor: '#808080',
                  borderWidth: 0.3,
                  marginVertical: 20,
                }}
              />

              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <View>
                  <Image
                    style={{width: 70, height: 70, borderRadius: 35}}
                    source={{
                      uri: 'https://www.instagram.com/p/CgyWempo_iI/media/?size=l',
                    }}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '600',
                      marginTop: 8,
                      letterSpacing: 0.6,
                      color: 'white',
                    }}>
                    Priority Likes
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '400',
                      marginTop: 8,
                      letterSpacing: 0.6,
                      color: 'gray',
                      width: '90%',
                    }}>
                    Your likes stay at top of their list
                  </Text>
                </View>
              </View>
            </View>

            <Text
              style={{
                marginTop: 20,
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Includes all Hinge+ benefits
            </Text>

            <View style={{marginTop: 30}}>
              <View style={{flexDirection: 'row', gap: 14}}>
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#484848',
                  }}>
                  <Ionicons name="infinite-outline" size={22} color="white" />
                </View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '600',
                    marginTop: 8,
                    color: 'white',
                    letterSpacing: 0.6,
                  }}>
                  Send unlimited likes*
                </Text>
              </View>

              <View style={{flexDirection: 'row', gap: 14, marginVertical: 15}}>
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#484848',
                  }}>
                  <Ionicons name="person-outline" size={22} color="white" />
                </View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '600',
                    marginTop: 8,
                    letterSpacing: 0.6,
                    color: 'white',
                  }}>
                  See everyone who likes you
                </Text>
              </View>

              <View style={{flexDirection: 'row', gap: 14}}>
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#484848',
                  }}>
                  <Ionicons name="filter-outline" size={22} color="white" />
                </View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '600',
                    marginTop: 8,
                    letterSpacing: 0.6,
                    color: 'white',
                  }}>
                  Set more dating preferences
                </Text>
              </View>

              <View style={{flexDirection: 'row', gap: 14, marginVertical: 15}}>
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#484848',
                  }}>
                  <Ionicons name="funnel-outline" size={22} color="white" />
                </View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '600',
                    marginTop: 8,
                    letterSpacing: 0.6,
                    color: 'white',
                  }}>
                  Sort all incoming likes
                </Text>
              </View>

              <View style={{flexDirection: 'row', gap: 14}}>
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#484848',
                  }}>
                  <Ionicons name="search-outline" size={22} color="white" />
                </View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '600',
                    marginTop: 8,
                    letterSpacing: 0.6,
                    color: 'white',
                  }}>
                  Browse by who's new or nearby
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {plan && (
        <Pressable style={{backgroundColor: '#181818', padding: 15}}>
          <Pressable
            onPress={pay}
            style={{
              backgroundColor: 'white',
              marginTop: 'auto',
              marginBottom: 5,
              padding: 12,
              marginHorizontal: 10,
              borderRadius: 20,
            }}>
            <Text
              style={{textAlign: 'center', fontSize: 15, fontWeight: '500'}}>
              Get {plan?.plan} for {plan?.price}
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HingeX;

const styles = StyleSheet.create({});
