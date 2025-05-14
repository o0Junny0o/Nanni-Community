import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  header: {
    backgroundColor: '#163690',
    padding: 16,
    alignItems: 'center',
  },
  forumTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    flex: 1,
  },
  postContainer: {
    backgroundColor: '#5D90D6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  postTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    color: '#D8C4E0',
    fontSize: 14,
  },
  tagContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  tagButton: {
    backgroundColor: '#B88CB4',
    borderRadius: 50,
  },
  tagButtonContainer: {
    marginRight: 8,
  },
  postText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginVertical: 8,
  },
  date: {
    color: '#D8C4E0',
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  divider: {
    backgroundColor: '#D8C4E0',
    height: 1,
    marginVertical: 16,
  },
  commentaryHeader: {
    color: '#163690',
    fontSize: 18,
    marginBottom: 8,
  },
  commentContainer: {
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  commentAuthor: {
    color: '#B88CB4',
    fontWeight: 'bold',
  },
  commentText: {
    color: '#000',
    marginVertical: 4,
  },
  commentDate: {
    color: '#B88CB4',
    fontSize: 12,
    alignSelf: 'flex-end',
  },
});

export default styles;