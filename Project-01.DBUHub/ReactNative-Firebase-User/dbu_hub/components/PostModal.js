import React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, Modal, ScrollView } from 'react-native';

// PostModal Component to display a modal with post details
const PostModal = ({ visible, post, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{post?.title}</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
          </View>

          {/* Modal Content */}
          <View style={styles.modalContent}>
            <Text style={styles.modalDate}>{new Date(post?.timestamp).toLocaleDateString()}</Text>
            <Text style={styles.modalTime}>{new Date(post?.timestamp).toLocaleTimeString()}</Text>
            <ScrollView contentContainerStyle={styles.modalScroll}>
              <Text style={styles.modalDescription}>{post?.content}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Dimensions for responsive modal size
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Styles for the modal component
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay color
  },
  modalContainer: {
    width: screenWidth * 0.85,
    maxHeight: screenHeight * 0.8,
    backgroundColor: '#e0f7fa', // Light background color
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#b2ebf2', // Light border color
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#ff4d4d', // Close button background color
    borderRadius: 50,
    padding: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 22,
    color: '#fff', // Close button text color
  },
  modalHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#b2ebf2', // Header bottom border color
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'outfit-bold', // Bold font for title
    color: '#00796b', // Dark aqua color for title
    textAlign: 'center',
  },
  modalContent: {
    padding: 16,
  },
  modalDate: {
    fontSize: 16,
    color: '#00796b', // Dark aqua color for date
  },
  modalTime: {
    fontSize: 14,
    color: '#4dd0e1', // Light aqua color for time
  },
  modalScroll: {
    paddingBottom: 20,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333', // Dark text for readability
    lineHeight: 22,
    textAlign: 'justify',
  },
});

export default PostModal;
