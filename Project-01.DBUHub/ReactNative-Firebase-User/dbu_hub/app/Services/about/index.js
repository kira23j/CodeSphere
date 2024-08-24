import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import GoBack from '../../../components/GoBack';

// Menu items data
const menuItems = [
  { id: '1', title: 'History' },
  { id: '2', title: 'Vision' },
  { id: '3', title: 'Mission' },
  { id: '4', title: 'Values' },
];

const AboutUs = () => {
  const [selectedSection, setSelectedSection] = useState('History');

  // Function to render content based on the selected section
  const renderContent = () => {
    switch (selectedSection) {
      case 'History':
        return (
          <Text style={styles.sectionContent}>
            The foundation of the university was laid down in May 2005, and the construction of the first phase started in May 2006. Instruction began in January 2007 with the enrolment of 725 students in the Faculty of Education, with two streams: Businesses Education and Natural Science Teaching.
            By the academic year 2007/08, three additional faculties (Business and Economics, Health Science, and Agriculture) were opened, and the enrolment reached 2483. The university continued to expand, reaching approximately 10,000 students by 2012, following three more construction phases.
          </Text>
        );
      case 'Vision':
        return (
          <Text style={styles.sectionContent}>
            Debre Berhan University aspires to be one of the nationally leading universities in practice-oriented teaching and research by 2030.
          </Text>
        );
      case 'Mission':
        return (
          <Text style={styles.sectionContent}>
            Our mission is to prepare knowledgeable, skilled, and attitudinally matured graduates for the job market and entrepreneurship by providing practice-oriented education.
            We aim to enhance and promote applied research focusing on innovation and technology transfer to create sustainable and knowledge-based industries and societies.
            Additionally, we seek to establish strategic partners to strengthen practice-oriented education, research, and community engagement.
          </Text>
        );
      case 'Values':
        return (
          <Text style={styles.sectionContent}>
            <Text style={styles.valueItem}>• Common Vision</Text>{"\n"}
            <Text style={styles.valueItem}>• Diversity</Text>{"\n"}
            <Text style={styles.valueItem}>• Democracy</Text>{"\n"}
            <Text style={styles.valueItem}>• Quality Service</Text>{"\n"}
            <Text style={styles.valueItem}>• Good Manners</Text>{"\n"}
            <Text style={styles.valueItem}>• Working Collaboratively</Text>
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/service.jpg')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <GoBack />
        <Text style={styles.header}>About Us</Text>

        <View style={styles.menuContainer}>
          <FlatList
            data={menuItems}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.menuItem, selectedSection === item.title && styles.activeMenuItem]}
                onPress={() => setSelectedSection(item.title)}
              >
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.menuListContainer}
          />
        </View>

        <View style={styles.contentContainer}>
          {renderContent()}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AboutUs;

// Stylesheet for the AboutUs component
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    fontSize: 40,
    fontFamily: 'outfit-bold',
    color: '#004d40',
    marginVertical: 20,
    textAlign: 'center',
  },
  menuContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#12FBFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuListContainer: {
    alignItems: 'center',
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 15,
    backgroundColor: '#063E34',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#004d40',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  activeMenuItem: {
    backgroundColor: '#00796b',
    borderColor: '#ffffff',
  },
  menuText: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  contentContainer: {
    paddingBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sectionContent: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    color: '#004d40',
    textAlign: 'justify',
  },
  valueItem: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    color: '#004d40',
  },
});
