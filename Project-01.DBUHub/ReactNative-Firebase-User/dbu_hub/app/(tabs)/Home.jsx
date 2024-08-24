import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PostModal from '../../components/PostModal';
import news from '../../assets/images/news.jpg'; 
import newsdetail from '../../assets/images/newsdetail.jpg'; 
import { FontAwesome } from '@expo/vector-icons'; 

// Home screen component
const Home = () => {
  // Navigation hook for screen navigation
  const navigation = useNavigation();

  // State hooks to manage posts, loading status, errors, and modal visibility
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect hook to fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts from the API
  const fetchPosts = () => {
    setLoading(true); // Set loading state to true while fetching
    axios.get('https://dbu-fastapi.onrender.com/post/all?limit=50')
      .then(response => {
        // Sort posts by timestamp in descending order
        const sortedPosts = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setPosts(sortedPosts);
        setLoading(false); // Set loading state to false after fetching
      })
      .catch(err => {
        setError(err.message); // Set error state if an error occurs
        setLoading(false);
      });
  };

  // Function to handle title press and open the modal with selected post details
  const handleTitlePress = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  // Function to handle refresh button press
  const handleRefresh = () => {
    fetchPosts();
  };

  // Display loading indicator while fetching data
  if (loading) {
    return <ActivityIndicator size="large" color="#03bafc" style={styles.loader} />;
  }

  // Display error message if there's an error
  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Header section with background image and overlay */}
      <ImageBackground
        source={news}
        style={styles.imageBackground}
        imageStyle={styles.imageBackgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>Welcome to DBUHub</Text>
            <Text style={styles.subText}>Discover the ultimate gateway to Debre Berhan University!</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Latest news section with a refresh button */}
      <View style={styles.latestNewsSection}>
        <View style={styles.latestNewsHeader}>
          <Text style={styles.latestNewsTitle}>Latest News</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <FontAwesome name="refresh" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable section for displaying posts */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.section}>
          {posts.length > 0 ? (
            posts.map(post => (
              <TouchableOpacity key={post.id} onPress={() => handleTitlePress(post)}>
                <ImageBackground
                  source={newsdetail}
                  style={styles.newsItemBackground}
                  imageStyle={styles.newsItemImageStyle}
                >
                  <View style={styles.newsContent}>
                    <View style={styles.newsTextContainer}>
                      <Text style={styles.newsTitle}>{post.title}</Text>
                    </View>
                    <View style={styles.newsDateTimeContainer}>
                      <Text style={styles.newsDate}>{new Date(post.timestamp).toLocaleDateString()}</Text>
                      <Text style={styles.newsTime}>{new Date(post.timestamp).toLocaleTimeString()}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noPostsText}>No posts available</Text>
          )}
        </View>
      </ScrollView>

      {/* Modal to display post details */}
      <PostModal
        visible={modalVisible}
        post={selectedPost}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

// Get screen dimensions for responsive design
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

// Styles for the Home component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003E39',
  },
  imageBackground: {
    height: screenHeight * 0.45, 
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  imageBackgroundImage: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  mainText: {
    fontSize: 36,
    fontFamily: 'outfit-bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    marginBottom: 10,
  },
  subText: {
    fontSize: 22,
    fontFamily: 'outfit',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  latestNewsSection: {
    width: '100%', 
    backgroundColor: '#04757D',
    paddingVertical: 10, 
    marginTop: -20, 
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  latestNewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  latestNewsTitle: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
    color: '#fff',
  },
  refreshButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#1E90FF',
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  section: {
    flex: 1,
  },
  newsItemBackground: {
    width: screenWidth * 0.95, 
    height: 100, 
    justifyContent: 'center',
    marginBottom: 10, 
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center', 
    elevation: 3,
  },
  newsContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    paddingVertical: 10, 
    paddingHorizontal: 15,
  },
  newsTextContainer: {
    marginBottom: 4,
  },
  newsTitle: {
    fontSize: 18, 
    fontFamily: 'outfit-bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8, 
  },
  newsDateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newsDate: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#ddd',
  },
  newsTime: {
    fontSize: 12,
    fontFamily: 'outfit',
    color: '#ccc', 
  },  
  noPostsText: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'outfit',
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1E8EC',
  },
});

export default Home;
