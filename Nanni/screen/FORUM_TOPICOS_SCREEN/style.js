import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#163690',
    fontWeight: 'bold',
  },
  forumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#071934',
    textAlign: 'center',
  },
  topicItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#071934',
  },
  topicInfo: {
    fontSize: 12,
    color: '#163690',
  },
  createNewTopicButton: {
    backgroundColor: '#5d90d6',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  createNewTopicButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;